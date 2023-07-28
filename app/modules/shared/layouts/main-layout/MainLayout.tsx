import React from 'react';
import { SettingsPanel } from '~/modules/chat/components/settings-panel/SettingsPanel';
import styles from './MainLayout.module.css';
import classNames from 'classnames';

type MainLayoutProps = {
  isSidePanelOpen: boolean;
  children: React.ReactNode;
  sidePanel?: React.ReactNode;
};

export const MainLayout = ({ children, sidePanel, isSidePanelOpen }: MainLayoutProps) => {

  return (
    <div className={classNames(
      styles.MainLayout, {
        [styles.isSidePanelOpen]: isSidePanelOpen,
      })
    }
      >
      <main>{children}</main>
      {sidePanel ? sidePanel : null}
    </div>
  );
}