import React from 'react';
import styles from './Button.module.scss';


interface ButtonProps {
  title: string;
  color: string;
  onClickHandler?: () => Promise<void> | void;
}

export default function Button({title, color, onClickHandler}: ButtonProps) {
  return (
    <button  className={`${styles.container} ${styles[color]}`} onClick={onClickHandler}>
      {title}
    </button>
  );
}
