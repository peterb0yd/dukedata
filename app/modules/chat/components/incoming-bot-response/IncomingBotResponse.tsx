import { useMemo } from 'react';
import { DataTable } from '../data-table/DataTable';
import styles from './IncomingBotResponse.module.css';

type IncomingBotResponseProps = {
  message: string;
};

const splitStringIntoHeadersAndData = (inputString: string) => {
  const rows = inputString.trim().split('\n');
  const headersRow = rows[0].split('|').map(item => item.trim()).filter(Boolean);
  const separatorRegex = /^\s*(?:\|[-]+\s*)+\|$/;

  if (separatorRegex.test(rows[1])) {
    const dataRows = rows.slice(2, rows.length); // Skip the first two rows (headers and separator)

    const data = dataRows.map(row => {
      const rowData = row.split('|').map(item => item.trim()).filter(Boolean);
      const rowDataObject: Record<string, any> = {};
      for (let i = 0; i < headersRow.length; i++) {
        rowDataObject[headersRow[i]] = rowData[i];
      }
      return rowDataObject;
    });

    return {
      headers: headersRow,
      dataRows: data
    };
  } else {
    // Data rows are not available yet, return an empty string
    return {
      headers: [],
      dataRows: []
    };
  }
}

export const IncomingBotResponse = ({ message }: IncomingBotResponseProps) => {
  console.log(message);
  const data = useMemo(() => {
    return splitStringIntoHeadersAndData(message);
  }, [message]);
  
  return (
    <div className={styles.IncomingBotResponse}>
      <DataTable 
        headers={data?.headers}
        dataRows={data?.dataRows}
      />
    </div>
  );
}
