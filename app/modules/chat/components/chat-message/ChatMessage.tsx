import styles from "./ChatMessage.module.css";
import { formatDate } from "../../helpers";
import classNames from "classnames";
import { Message, MessageKind } from "@prisma/client";

type ChatMessageProps = {
  message: Message;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  
  const msgClass = message.kind === MessageKind.USER ? styles.person : styles.bot;

  return (
    <div className={classNames(styles.ChatMessage, msgClass)}>
      <p className={styles.date}>{formatDate(message.createdAt)}</p>
      <p className={styles.body}>{message.body}</p>
    </div>
  );
}