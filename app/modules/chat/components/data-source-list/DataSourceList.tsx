import { DataSource } from "@prisma/client";
import styles from "./DataSourceList.module.css";
import { DataSourceItem } from "./data-source-item/DataSourceItem";

type DataSourceListProps = {
  dataSources: DataSource[];
};

export const DataSourceList = ({ dataSources }: DataSourceListProps) => {

  const sortedDataSources = dataSources.sort((a, b) => a.name > b.name ? 1 : -1);

  return (
    <div className={styles.DataSourceList}>
      <h3>Data Sources</h3>
      <div className={styles.table}>
        {sortedDataSources.map((dataSource) => (
          <DataSourceItem key={dataSource.id} dataSource={dataSource} />
        ))}
      </div>
    </div>
  );
};