import type { LinksFunction, V2_MetaFunction } from "@remix-run/node";
import { MessageKind } from "~/api/message/enums/chat/MessageKind";
import { IChatMessage } from "~/api/message/interfaces/IMessage";
import { ChatContainer } from "~/modules/chat/components/chat-container/ChatContainer";
import { ChatInput } from "~/modules/chat/components/chat-input/ChatInput";
import { ChatMessages } from "~/modules/chat/components/chat-messages/ChatMessages";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Your DataGPT" },
    { name: "This is a chat interface for your data", content: "Enjoy!" },
  ];
};

const messages = [
  {
    body: "Hello, I'm DataGPT. I'm here to help you with your data.",
    kind: MessageKind.BOT,
    sentAt: new Date(),
  },
  {
    body: "I can help you with your data.",
    kind: MessageKind.BOT,
    sentAt: new Date(),
  },
  {
    body: "Hey Chat bot, how are you?",
    kind: MessageKind.USER,
    sentAt: new Date(),
  },
  {
    body: "I'm good, thanks for asking!",
    kind: MessageKind.BOT,
    sentAt: new Date(),
  },
] as IChatMessage[];

export default function Index() {
  return (
    <ChatContainer>

      <ChatMessages messages={messages} />
      <ChatInput />
    </ChatContainer>
  );
}