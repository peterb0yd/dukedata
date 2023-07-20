import { Message, MessageKind } from "@prisma/client";
import { ActionArgs, json, redirect, type LinksFunction, type V2_MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { createMessage, getMessages } from "~/api/modules/message/message.service";
import { badRequest } from "~/api/utils/errors.server";
import { ChatContainer } from "~/modules/chat/components/chat-container/ChatContainer";
import { ChatInput } from "~/modules/chat/components/chat-input/ChatInput";
import { ChatMessages } from "~/modules/chat/components/chat-messages/ChatMessages";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Your DataGPT" },
    { name: "This is a chat interface for your data", content: "Enjoy!" },
  ];
};

export const loader = async () => {
  return json({
    messages: await getMessages(),
  })
}

export const action = async ({ request }: ActionArgs) => {
  const form = await request.formData();
  const body = form.get("body") as string;
  await createMessage({ body, kind: MessageKind.USER });
  return redirect('/');
}

export default function Index() {
  const { messages } = useLoaderData();

  return (
    <ChatContainer>
      <ChatMessages messages={messages} />
      <ChatInput />
    </ChatContainer>
  );
}