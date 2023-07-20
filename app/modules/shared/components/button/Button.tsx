import styles from './Button.module.css';

type ButtonProps = {
  children?: React.ReactNode;
  text?: string;
}

export const Button = ({ children, text }: ButtonProps) => {
  return (
    <button className={styles.Button}>
      {children ? children : <p>{text}</p>}
    </button>
  ); 
}