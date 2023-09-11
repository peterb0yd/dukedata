import { Form, useSubmit } from "@remix-run/react";
import styles from './SqlActions.module.css';
import { RequestMethods } from "~/enums/requestMethods";

interface ISqlActionsProps {
  sqlQuery: string;
  onRetryBotResponse: () => void;
}

export const SqlActions = ({ sqlQuery, onRetryBotResponse }: ISqlActionsProps) => {
  const submit = useSubmit();

  const handleExecuteCommand = async () => {
    const res = await submit({
      command: sqlQuery
    }, {
      method: RequestMethods.POST,
      action: '/api/sqlCommands/'
    });
    console.log({res});
  }

  const handleRetryBotResponse = async () => {
    onRetryBotResponse();
  }

  return (
    <div className={styles.SqlActions}>
      <button onClick={handleExecuteCommand}>
        Execute
      </button>
      <button
        onClick={handleRetryBotResponse}
      >
        Retry
      </button>
    </div>
  );
}