import classNames from 'classnames';
import styles from './Button.module.css';

type ButtonProps = {
  children?: React.ReactNode;
  text?: string;
  light?: boolean;
}

export const Button = ({ children, text, light }: ButtonProps) => {
  return (
    <button className={classNames(
      styles.Button,
      {
        [styles.light]: light
      })
    }>
      {children ? children : <p>{text}</p>}
    </button>
  );
}