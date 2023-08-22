import { Response, json } from "@remix-run/node";
import { ActionFunction } from "@remix-run/node";
import { StatusCodes } from "http-status-codes";
import { getBotResponse } from "~/api/api-modules/openAI/openAI.service";
import { RequestMethods } from "~/enums/requestMethods";

export const action: ActionFunction = async ({ request }) => {
  if (request.method === RequestMethods.POST) {
    const message = await request.json();
    const response = await getBotResponse(message);

    if (typeof response === 'string') {
      return json(response, { status: StatusCodes.OK });
    }

    // ReadableStream from stream
    const readableStream = new ReadableStream({
      async start(controller) {
        for await (const chunk of response) {
          const bytes = new TextEncoder().encode(chunk.choices[0].delta.content ?? '');
          controller.enqueue(bytes);
        }
        controller.close();
      }
    });
    
    // @ts-ignore
    return new Response(readableStream, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  return json({data: 'test'}, { status: StatusCodes.METHOD_NOT_ALLOWED })
}

// export default function BotResponsesAPIRoute() { };