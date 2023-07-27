import { Input } from "~/modules/shared/components/input/Input";
import styles from "./SettingsPanel.module.css";
import classNames from "classnames";
import { SettingsHeader } from "./settings-header/SettingsHeader";

type SettingsPanelProps = {
  isOpen: boolean;
  toggleSettingsOpen: () => void;
}

export const SettingsPanel = ({ isOpen, toggleSettingsOpen }: SettingsPanelProps) => {

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
        toggleSettingsOpen={toggleSettingsOpen}
      />
      <div className={styles.menuContent}>
        <Input
          label="Database Connection URL"
          light
        />
      </div>
    </div>
  );
}