import { SettingsIcon } from '~/modules/shared/components/icons/SettingsIcon';
import styles from './SettingsHeader.module.css';
import classNames from 'classnames';

type SettingsHeaderProps = {
  isOpen: boolean;
  toggleSettingsOpen: () => void;
};

export const SettingsHeader = ({ isOpen, toggleSettingsOpen }: SettingsHeaderProps) => {

  return (
    <header
      onClick={toggleSettingsOpen}
      className={classNames(
        styles.SettingsHeader,
        {
          [styles.isOpen]: isOpen,
        }
      )}
    >
      <SettingsIcon size='lg' fill='var(--gray-primary)' className={styles.settingsIcon} />
      <h3>Settings</h3>
    </header>
  );

};