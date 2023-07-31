import { MessageKind } from "@prisma/client";
import { ActionFunction, ActionArgs, Response, json, redirect } from "@remix-run/node";
import { createMessage } from "~/api/api-modules/message/message.service";
import StatusCodes from 'http-status-codes';
import { RequestMethods } from "~/enums/requestMethods";

export const action: ActionFunction = async ({ request }: ActionArgs) => {
  if (request.method === RequestMethods.POST) {
    const form = await request.formData();
    const body = form.get("body") as string;
    await createMessage({ body, kind: MessageKind.USER });
    return redirect('/');
  }

  return new Response(null, { status: StatusCodes.METHOD_NOT_ALLOWED })
}

export default function MessagesAPIRoute() {};