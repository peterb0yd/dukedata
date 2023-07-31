import { DataSource } from "@prisma/client";
import styles from "./DataSourceItem.module.css";
import { DeleteIcon } from "~/modules/shared/components/icons/DeleteIcon";
import { IconButton } from "~/modules/shared/components/icon-button/IconButton";
import { Form } from "@remix-run/react";

type DataSourceItemProps = {
  dataSource: DataSource;
}

export const DataSourceItem = ({ dataSource }: DataSourceItemProps) => {

  return (
    <div className={styles.DataSourceItem}>
      <div className={styles.allContent}>
        <img className={styles.icon} src={'/data-source-icons/postgres-logo.png'} alt={dataSource.name} />
        <div className={styles.textContent}>
          <p className={styles.name}>{dataSource.name}</p>
          <p className={styles.url}>{dataSource.url}</p>
        </div>
      </div>
      <Form action='/dataSources' method='delete'>
        <input type='hidden' name='id' value={dataSource.id} />
        <IconButton border>
          <DeleteIcon size='sm' fill='red' />
        </IconButton>
      </Form>
    </div >
  );
}