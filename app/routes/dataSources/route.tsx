import { DataSourceKind } from "@prisma/client";
import { ActionFunction, ActionArgs, redirect } from "@remix-run/node";
import { StatusCodes } from "http-status-codes";
import { createDataSource } from "~/api/api-modules/dataSource/dataSource.service";
import { RequestMethods } from "~/enums/requestMethods";

export const action: ActionFunction = async ({ request }: ActionArgs) => {
  if (request.method === RequestMethods.POST) {
    const form = await request.formData();
    const name = form.get("name") as string;
    const url = form.get("url") as string;
    await createDataSource({ name, url, kind: DataSourceKind.DATABASE });
    return redirect('/');
  }

  return new Response(null, { status: StatusCodes.METHOD_NOT_ALLOWED })
}

export default function DataSources() {};