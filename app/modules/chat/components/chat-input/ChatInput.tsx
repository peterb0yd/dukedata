import type { ActionArgs } from "@remix-run/node";
import { Button } from "~/modules/shared/button/Button"
import { Input } from "~/modules/shared/input/Input";
import styles from "./ChatInput.module.css";
import { createMessage } from "~/api/modules/message/message.service";
import { MessageKind } from "@prisma/client";
import { badRequest } from "~/api/utils/errors.server";

export const action = async ({ request }: ActionArgs) => {
  const form = await request.formData();
  const body = form.get("body") as string;
  if (
    typeof body !== "string"
  ) {
    return badRequest({
      fieldErrors: null,
      fields: null,
      formError: "Form not submitted correctly.",
    });
  }
  await createMessage({ body, kind: MessageKind.USER });
}

export const ChatInput = () => {
  return (
    <div className={styles.ChatInput}>
      <form method="post">
        <Input type="text" name="body" />
        <Button>Send</Button>
      </form>
    </div>
  );
}