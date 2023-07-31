import { SelectHTMLAttributes } from 'react';
import styles from './Select.module.css';
import classNames from 'classnames';
import { capitalize } from 'lodash';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: string[];
  label?: string;
  light?: boolean;
}
export const Select = ({ options, label, light, ...selectProps }: SelectProps) => {
  return (
    <label className={classNames(
      styles.Select,
      {
        [styles.light]: light,
      }
    )}
    >
      {label ? <p className={styles.label}>{label}</p> : null}
      <select {...selectProps}>
        {options.map((option, index) => (
          <option key={index} value={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}