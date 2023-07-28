import { DataSource } from "@prisma/client";
import styles from "./DataSourceList.module.css";
import { DataSourceItem } from "./data-source-item/DataSourceItem";

type DataSourceListProps = {
  dataSources: DataSource[];
};

export const DataSourceList = ({ dataSources }: DataSourceListProps) => {
  
    return (
      <div className={styles.DataSourceList}>
        {dataSources.map((dataSource, index) => (
          <DataSourceItem key={index} dataSource={dataSource} />
        ))}
      </div>
    );
};