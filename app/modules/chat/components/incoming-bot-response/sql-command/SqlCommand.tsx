import { useMemo } from 'react';
import styles from './SqlCommand.module.css';
import { commandKeywords } from '~/modules/chat/helpers';

type SqlCommandProps = {
  sqlQuery: string;
};

export const SqlCommand = ({ sqlQuery }: SqlCommandProps) => {

  const renderWord = (word: string) => {
    if (!word) return null;
    if (commandKeywords.includes(word)) {
      word = word.replace('-', ' ');
      return <span className={styles.keyword}>{word}</span>;
    }
    return <span>{word}</span>
  }

  const renderLine = (str: string) => {
    const words = str.split(' ');
    return words.map(word => renderWord(word));
  }

  const renderCommand = () => {
    return sqlQuery.split('\n').map(str => str.trim() ? (
      <p>{renderLine(str)}</p>
    ) : null);
  }

  return (
    <div className={styles.SqlCommand}>
      {renderCommand()}
    </div>
  );
} 