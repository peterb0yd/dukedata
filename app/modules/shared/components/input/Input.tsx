import { InputHTMLAttributes } from 'react';
import styles from './Input.module.css';
import classNames from 'classnames';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  light?: boolean;
}
export const Input = ({ label, light, ...inputProps }: InputProps) => {
  return (
    <label className={classNames(
      styles.Input,
      {
        [styles.light]: light,
      }
    )}
    >
      {label ? <p>{label}</p> : null}
      <input {...inputProps} />
    </label>
  );
}