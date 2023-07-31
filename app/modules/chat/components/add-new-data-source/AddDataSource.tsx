import { Form, useRouteError } from "@remix-run/react";
import styles from "./AddDataSource.module.css";
import { useTransitionState } from "~/modules/shared/hooks/useTransitionState";
import { Input } from "~/modules/shared/components/input/Input";
import { Button } from "~/modules/shared/components/button/Button";
import { Select } from "~/modules/shared/components/select/Select";
import { DataSourceClient } from "@prisma/client";
import { startCase } from "lodash";

export const AddDataSource = () => {
  const { isSubmitting, isLoading } = useTransitionState();

  return (
    <Form className={styles.AddDataSource} action="/api/dataSources" method="post">
      <h3>Add New Data Source</h3>
      <div className={styles.inputs}>
        <Select
          label="Data Source Type"
          name="client"
          disabled={isSubmitting || isLoading}
          options={[
            DataSourceClient.POSTGRES,
            DataSourceClient.MYSQL,
            DataSourceClient.SQLITE
          ]}
          light
        />
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
      </div>
      <Button
        text="Add Data Source"
        light
      />
    </Form>
  );
};
