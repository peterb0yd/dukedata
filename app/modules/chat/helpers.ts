import moment from "moment"

export const formatDate = (date: Date): string => {
  if (!date) return "";
  return moment(date).format("D/M/YY h:mm A")
};


export const processChatResponse = async ({ response, onChunk }: any) => {
  const reader = response.body.pipeThrough(new TextDecoderStream()).getReader();
  let string = "";
  while (true) {
    const stream = await reader.read();
    if (stream.done) break;

    const chunks = stream?.value;

    for (let chunk of chunks) {
      console.log({chunk})
      // const content = chunk.choices[0].delta.content;
      // if (!content) continue;
      // string += chunk.choices[0].delta.content;
      // onChunk(string);
    }
  }
  return string;
};