import { DataSource } from "@prisma/client";
import styles from "./DataSourceList.module.css";
import { DataSourceItem } from "./data-source-item/DataSourceItem";

type DataSourceListProps = {
  dataSources: DataSource[];
};

export const DataSourceList = ({ dataSources }: DataSourceListProps) => {

  return (
    <div className={styles.DataSourceList}>
      <h3>Data Sources</h3>
      <div className={styles.table}>
        {dataSources.map((dataSource, index) => (
          <DataSourceItem key={index} dataSource={dataSource} />
        ))}
      </div>
    </div>
  );
};