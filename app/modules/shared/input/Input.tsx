import { InputHTMLAttributes } from 'react';
import styles from './Input.module.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}
export const Input = ({ label, ...inputProps }: InputProps) => {
  return (
    <label>
      {label ? label : null}
      <input className={styles.Input} {...inputProps} />
    </label>
  );
}