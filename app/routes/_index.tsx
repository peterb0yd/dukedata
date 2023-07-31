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
import { MessageKind } from "@prisma/client";
import { processChatResponse } from "~/modules/chat/helpers";

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
  const [responseData, setResponseData] = useState('');

  const toggleSidePanel = () => {
    setIsSidePanelOpen(!isSidePanelOpen);
  }

  const handleChunkData = (data: any) => {
    console.log({data});
  }

  const onNewMessage = async (message: string) => {
    const response = await fetch("/api/botResponses", {
      method: "POST",
      body: JSON.stringify(message),
    })
    // read from stream
    const reader = response.body?.getReader();
    const decoder = new TextDecoder();
    let chunk = await reader?.read();
    let result = '';
    while (!chunk?.done) {
      const chunkData = decoder.decode(chunk?.value, { stream: true });
      result += chunkData;
      setResponseData(result);
      console.log({chunkData})
      chunk = await reader?.read();
    }

    // const res = await processChatResponse({
    //   response,
    //   onChunk: handleChunkData,
    // });

  
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
        <ChatMessages messages={messages} />
        <AddNewMessage onNewMessage={onNewMessage} />
      </ChatContainer>
      <p>{responseData}</p>
    </MainLayout>
  );
}