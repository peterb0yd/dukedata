import { DataSourceClient } from "@prisma/client";
import { ActionFunction, ActionArgs, redirect } from "@remix-run/node";
import { StatusCodes } from "http-status-codes";
import { createDataSource, deleteDataSource } from "~/api/api-modules/dataSource/dataSource.service";
import { badRequest } from "~/api/utils/errors.server";
import { RequestMethods } from "~/enums/requestMethods";

export const action: ActionFunction = async ({ request }: ActionArgs) => {

  if (request.method === RequestMethods.POST) {
    try {
      const form = await request.formData();
      const name = form.get("name") as string;
      const url = form.get("url") as string;
      console.log(url);
      const client = form.get("client") as DataSourceClient;
      await createDataSource({ name, url, client });
      return redirect('/');
    } catch (error) {
      console.error(error);
      return redirect('/', {
        status: 400
      });
    }
  }

  if (request.method === RequestMethods.DELETE) {
    try {
      const form = await request.formData();
      const id = Number(form.get("id") ?? -1);
      await deleteDataSource(id);
      return redirect('/');
    } catch (error) {
      console.error(error);
      return redirect('/', {
        status: 404
      });
    }
  }

  return new Response(null, { status: StatusCodes.METHOD_NOT_ALLOWED })
}

export default function DataSourcesAPIRoute() {};