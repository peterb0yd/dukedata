import { useMemo } from 'react';
import { DataTable } from '../data-table/DataTable';
import styles from './IncomingBotResponse.module.css';
import { splitStringIntoHeadersAndData } from '../../helpers';
import { SqlCommand } from './sql-command/SqlCommand';

type IncomingBotResponseProps = {
  message: string;
};

const queryStrSplitter = '\`\`\`';

export const IncomingBotResponse = ({ message }: IncomingBotResponseProps) => {

  const sqlQuery = useMemo(() => {
    if (!message) return '';
    const groups = message.split(queryStrSplitter);
    if (!groups || groups.length === 0) {
      return 'No reply';
    }
    return groups[1].replace('sql', '');
  }, [message]);

  const paragraph = useMemo(() => {
    if (!message) return '';
    const regex = new RegExp(queryStrSplitter, 'g');
    return message.replace(sqlQuery, '').replace(regex, '');
  }, [message]);

  console.log(message);
  
  return (
    <div className={styles.IncomingBotResponse}>
      <p>
      {paragraph}
      </p>
      <SqlCommand sqlQuery={sqlQuery} />
    </div>
  );
}
