import { Message, MessageKind } from "@prisma/client";
import { json, type LinksFunction, type V2_MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getMessages } from "~/api/modules/message/message.service";
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

export default function Index() {
  const { messages } = useLoaderData();

  return (
    <ChatContainer>
      <ChatMessages messages={messages} />
      <ChatInput />
    </ChatContainer>
  );
}