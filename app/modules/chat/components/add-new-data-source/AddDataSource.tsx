import { Form } from "@remix-run/react";
import styles from "./AddDataSource.module.css";
import { useTransitionState } from "~/modules/shared/hooks/useTransitionState";
import { Input } from "~/modules/shared/components/input/Input";
import { Button } from "~/modules/shared/components/button/Button";

export const AddDataSource = () => {
  const { isSubmitting, isLoading } = useTransitionState();

  return (
    <Form className={styles.AddDataSource} action="/dataSources" method="post">
      <h3>Add New Data Source</h3>
      <Input
        label="Data Source Name"
        name="name"
        disabled={isSubmitting || isLoading}
        light
      />
      <Input
        label="Data Source URL"
        name="url"
        disabled={isSubmitting || isLoading}
        light
      />
      <Button 
        text="Add Data Source"
        light
      />
    </Form>
  );
};