import { IChatMessage } from "~/api/message/interfaces/IMessage";
import styles from "./ChatMessage.module.css";
import { formatDate } from "../../helpers";
import { MessageKind } from "~/api/message/enums/chat/MessageKind";
import classNames from "classnames";

type ChatMessageProps = {
  message: IChatMessage;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  
  const msgClass = message.kind === MessageKind.USER ? styles.person : styles.bot;

  return (
    <div className={classNames(styles.ChatMessage, msgClass)}>
      <p className={styles.date}>{formatDate(message.sentAt)}</p>
      <p className={styles.body}>{message.body}</p>
    </div>
  );
}