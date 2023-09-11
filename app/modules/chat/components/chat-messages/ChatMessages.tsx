import React, { Suspense } from "react";
import styles from "./ChatMessages.module.css";
import { ChatMessage } from "../chat-message/ChatMessage";
import { Message } from "@prisma/client";
import { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { IncomingBotResponse } from "../incoming-bot-response/IncomingBotResponse";

type ChatMessagesProps = {
  messages: Message[];
  botResponse?: string;
  onRetryBotResponse: () => void;
}

export const ChatMessages = ({ messages, botResponse, onRetryBotResponse }: ChatMessagesProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasFirstScroll, setHasFirstScroll] = useState(false);
  const isVisible = Boolean(messages?.length) && hasFirstScroll;

  useEffect(() => {
    if (messages.length) {
      const scrollBehavior = hasFirstScroll ? "smooth" : "auto";
      containerRef.current?.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: scrollBehavior,
      });
    }
    if (!hasFirstScroll) {
      setHasFirstScroll(true);
    }
  }, [messages, botResponse]);

  const renderMessages = () => {
    if (!messages.length) {
      return <p>No messages yet</p>
    }

    return messages.map((message, index) => (
      <ChatMessage message={message} key={index} />
    ));
  }

  return (
    <div
      className={classNames(styles.ChatMessages, {
        [styles.isVisible]: isVisible,
      })}
      ref={containerRef}
    >
      {renderMessages()}
      {botResponse && (
        <Suspense fallback={<p>Loading...</p>}>
          <IncomingBotResponse message={botResponse} onRetryBotResponse={onRetryBotResponse} />
        </Suspense>
      )}
    </div>
  );
}