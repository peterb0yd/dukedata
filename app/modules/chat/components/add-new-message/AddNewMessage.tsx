import { Button } from "~/modules/shared/components/button/Button"
import { Input } from "~/modules/shared/components/input/Input";
import styles from "./AddNewMessage.module.css";
import { Form } from "@remix-run/react";
import { useEffect, useRef } from "react";
import { useTransitionState } from "~/modules/shared/hooks/useTransitionState";

export const AddNewMessage = () => {
  const { isSubmitting } = useTransitionState();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!isSubmitting) {
      formRef.current?.reset();
    }
  }, [isSubmitting]);

  return (
    <Form className={styles.AddNewMessage} action="/messages" method="post" ref={formRef}>
      <Input type="text" name="body" />
      <Button>Send</Button>
    </Form>
  );
}