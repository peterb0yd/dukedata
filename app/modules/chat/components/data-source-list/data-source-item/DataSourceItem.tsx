import { DataSource } from "@prisma/client";
import styles from "./DataSourceItem.module.css";
import { DeleteIcon } from "~/modules/shared/components/icons/DeleteIcon";
import { IconButton } from "~/modules/shared/components/icon-button/IconButton";
import { Form, useSubmit } from "@remix-run/react";
import classNames from "classnames";

type DataSourceItemProps = {
  dataSource: DataSource;
}

export const DataSourceItem = ({ dataSource }: DataSourceItemProps) => {
  const submit = useSubmit();

  const handleToggle = () => {
    submit({
      isSelected: !dataSource.isSelected,
      id: dataSource.id,
    }, {
      method: "patch",
      action: "/api/dataSources"
    });
  }

  const renderCheckbox = () => {
    return (
      <div
        onClick={handleToggle}
        className={classNames(
          styles.checkbox,
          {
            [styles.selected]: dataSource.isSelected
          }
        )}
      />
    );
  }

  return (
    <div className={styles.DataSourceItem}>
      {renderCheckbox()}
      <div className={styles.info}>
        <div className={styles.title}>
          <img className={styles.icon} src={'/data-source-icons/postgres-logo.png'} alt={dataSource.name} />
          <p className={styles.name}>{dataSource.name}</p>
        </div>
        <p className={styles.url}>{dataSource.url}</p>
      </div>
      <Form action='/api/dataSources' method='delete'>
        <input type='hidden' name='id' value={dataSource.id} />
        <IconButton border>
          <DeleteIcon size='sm' fill='red' />
        </IconButton>
      </Form>
    </div >
  );
}