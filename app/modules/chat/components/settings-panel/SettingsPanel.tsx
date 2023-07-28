import { Input } from "~/modules/shared/components/input/Input";
import styles from "./SettingsPanel.module.css";
import classNames from "classnames";
import { SettingsHeader } from "./settings-header/SettingsHeader";
import { AddDataSource } from "../add-new-data-source/AddDataSource";
import { DataSourceList } from "../data-source-list/DataSourceList";
import { DataSource } from "@prisma/client";

type SettingsPanelProps = {
  isOpen: boolean;
  dataSources: DataSource[];
  toggleOpen: () => void;
}

export const SettingsPanel = ({ isOpen, dataSources, toggleOpen }: SettingsPanelProps) => {

  return (
    <div
      className={classNames(
        styles.SettingsPanel,
        {
          [styles.isOpen]: isOpen
        }
      )}
    >
      <SettingsHeader
        isOpen={isOpen}
        toggleOpen={toggleOpen}
      />
      <div className={styles.menuContent}>
        <AddDataSource />
        <DataSourceList dataSources={dataSources} />
      </div>
    </div>
  );
}