import moment from "moment"

export const formatDate = (date: Date): string => {
  if (!date) return "";
  return moment(date).format("D/M/YY h:mm A")
};


export const processBotResponse = async ({ response, onChunk }: any) => {
    const reader = response.body?.getReader();
    const decoder = new TextDecoder();
    let chunk = await reader?.read();
    let result = '';
    while (!chunk?.done) {
      const chunkData = decoder.decode(chunk?.value, { stream: true });
      result += chunkData;
      onChunk(result);
      chunk = await reader?.read();
    }  
};