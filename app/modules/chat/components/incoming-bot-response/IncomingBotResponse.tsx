import { useMemo } from 'react';
import { DataTable } from '../data-table/DataTable';
import styles from './IncomingBotResponse.module.css';
import { splitStringIntoHeadersAndData } from '../../helpers';
import { SqlCommand } from './sql-command/SqlCommand';

type IncomingBotResponseProps = {
  message: string;
};

const startQueryStr = '\`\`\`sql';

export const IncomingBotResponse = ({ message }: IncomingBotResponseProps) => {

  // const data = useMemo(() => {
  //   return splitStringIntoHeadersAndData(message);
  // }, [message]);

  const sqlQuery = useMemo(() => {
    if (!message) return '';
    const startIndex = message.indexOf(startQueryStr) + startQueryStr.length;
    const endIndex = message.indexOf('\`\`\`end');
    return message.substring(startIndex, endIndex);
  }, [message]);

  const paragraph = useMemo(() => {
    if (!message) return '';
    return message.replace(startQueryStr + sqlQuery, '');
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
