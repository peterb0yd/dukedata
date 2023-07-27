import React from 'react';
import { SettingsPanel } from '~/modules/chat/components/settings-panel/SettingsPanel';
import styles from './MainLayout.module.css';
import classNames from 'classnames';

type MainLayoutProps = {
  children: React.ReactNode;
};

export const MainLayout = ({ children }: MainLayoutProps) => {
  const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);

  const toggleSettingsOpen = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  return (
    <div className={classNames(
      styles.MainLayout, {
        [styles.isSettingsOpen]: isSettingsOpen,
      })
    }
      >
      <main>{children}</main>
      <SettingsPanel
        isOpen={isSettingsOpen}
        toggleSettingsOpen={toggleSettingsOpen}
      />
    </div>
  );
}