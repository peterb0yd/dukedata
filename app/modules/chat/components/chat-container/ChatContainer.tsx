import styles from './ChatContainer.module.css';

type ChatContainerProps = {
  children: React.ReactNode;
}

export const ChatContainer = ({ children }: ChatContainerProps) => {
  return (
    <div className={styles.ChatContainer}>
      {children}
    </div>
  ); 
}