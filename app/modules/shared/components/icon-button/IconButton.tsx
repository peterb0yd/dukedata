import classNames from "classnames";
import styles from "./IconButton.module.css";

type IconButtonProps = {
  children?: React.ReactNode;
  border?: boolean;
}

export const IconButton = ({ children, border }: IconButtonProps) => {
  return (
    <button className={classNames(
      styles.IconButton,
      {
        [styles.border]: border
      }
    )}>
      {children}
    </button>
  );
}