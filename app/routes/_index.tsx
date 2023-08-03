import { json, type V2_MetaFunction, LoaderFunction } from "@remix-run/node";
import { useCatch, useLoaderData } from "@remix-run/react";
import { getMessages } from "~/api/api-modules/message/message.service";
import { ChatContainer } from "~/modules/chat/components/chat-container/ChatContainer";
import { AddNewMessage } from "~/modules/chat/components/add-new-message/AddNewMessage";
import { ChatMessages } from "~/modules/chat/components/chat-messages/ChatMessages";
import { MainLayout } from "~/modules/shared/layouts/main-layout/MainLayout";
import { getDataSources } from "~/api/api-modules/dataSource/dataSource.service";
import { useState } from "react";
import { SettingsPanel } from "~/modules/chat/components/settings-panel/SettingsPanel";
import { processBotResponse } from "~/modules/chat/helpers";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "DukeData" },
    { name: "This is a chat interface for your data", content: "Enjoy!" },
  ];
};

export const loader: LoaderFunction = async () => {
  const [messages, dataSources] = await Promise.all([
    getMessages(),
    getDataSources()
  ])
  return json({
    messages,
    dataSources,
  })
}

export default function Index() {
  const { messages, dataSources } = useLoaderData();
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const [botResponse, setBotResponse] = useState('');

  const toggleSidePanel = () => {
    setIsSidePanelOpen(!isSidePanelOpen);
  }

  const onNewMessage = async (message: string) => {
    const response = await fetch("/api/botResponses", {
      method: "POST",
      body: JSON.stringify(message),
    })
    processBotResponse({
      response,
      onChunk: setBotResponse,
    })
  }

  return (
    <MainLayout
      isSidePanelOpen={isSidePanelOpen}
      sidePanel={
        <SettingsPanel
          isOpen={isSidePanelOpen}
          toggleOpen={toggleSidePanel}
          dataSources={dataSources}
        />
      }
    >
      <ChatContainer>
        <ChatMessages
          messages={messages}
          botResponse={botResponse}
        />
        <AddNewMessage
          onNewMessage={onNewMessage}
        />
      </ChatContainer>
    </MainLayout>
  );
}