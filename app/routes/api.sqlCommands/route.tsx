import { DataSourceClient } from "@prisma/client";
import { ActionFunction, ActionArgs, redirect } from "@remix-run/node";
import { StatusCodes } from "http-status-codes";
import { createDataSource, deleteDataSource, executeSqlCommand, updateDataSource } from "~/api/api-modules/dataSource/dataSource.service";
import { badRequest } from "~/api/utils/errors.server";
import { RequestMethods } from "~/enums/requestMethods";

export const action: ActionFunction = async ({ request }: ActionArgs) => {

  if (request.method === RequestMethods.POST) {
    try {
      const form = await request.formData();
      const command = form.get("command") as string;
      await executeSqlCommand(command);
      return redirect('/');
    } catch (error) {
      console.error(error);
      return redirect('/', {
        status: 400
      });
    }
  }

  return new Response(null, { status: StatusCodes.METHOD_NOT_ALLOWED })
}

export default function SqlCommandsAPIRoute() { };