import React from 'react';
import styles from './styles.css';

interface Props {
  className?: string;
  color?: 'white' | 'blue';
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Button: React.FC<Props> = ({
  children,
  className = '',
  color = 'white',
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`${styles.button} ${className} ${styles[color]}`}
    >
      {children}
    </button>
  );
};
