import { IChatMessage } from "~/interfaces/chat/IChatMessage";
import styles from "./ChatMessages.module.css";
import { ChatMessage } from "../chat-message/ChatMessage";

type ChatMessagesProps = {
  messages: IChatMessage[];
}

export const ChatMessages = ({ messages }: ChatMessagesProps) => {

  const renderMessages = () => {
    if (!messages.length) {
      return <p>No messages yet</p>
    }

    return messages.map((message, index) => (
      <ChatMessage message={message} key={index} />
    ));
  }

  return (
    <div className={styles.ChatMessages}>
      {renderMessages()}
    </div>
  );
}