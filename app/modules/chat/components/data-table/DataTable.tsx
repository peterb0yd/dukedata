import styles from './DataTable.module.css';

type DataTableProps = {
  headers: string[];
  dataRows: Record<string, any>[];
};

export const DataTable = ({ headers, dataRows }: DataTableProps) => {

  return (
    <div className={styles.DataTable}>
      <div className={styles.headerRow}>
        {headers.map((header, index) => (
          <div className={styles.headerColumn} key={index}>{header}</div>
        ))}
      </div>
      <div className={styles.dataBody}>
        {dataRows.map((row, index) => (
          <div className={styles.dataRow} key={index}>
            {Object.values(row).map((value, index) => (
              <div className={styles.dataColumn} key={index}>{value}</div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}