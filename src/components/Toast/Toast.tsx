import React from 'react';
import styles from './Toast.module.scss';


interface ToastProps {
  message: string;
  color: string;
}

export default function Toast({message, color}: ToastProps) {
  return (
    <div className={`${styles.container} ${styles[color]}`}>
      {message}
    </div>
  );
}
