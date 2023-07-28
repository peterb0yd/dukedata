import { DataSource } from "@prisma/client";
import styles from "./DataSourceItem.module.css";

type DataSourceItemProps = {
  dataSource: DataSource;
}

export const DataSourceItem = ({ dataSource }: DataSourceItemProps) => {

  return (
    <div className={styles.DataSourceItem}>
      <div className={styles.dot}/> 
      <p>{dataSource.name}</p>
    </div>
  );
}