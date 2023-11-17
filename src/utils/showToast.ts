import { Dispatch, SetStateAction } from "react";

export const showToast = (message: string, color: string, setToastInfo: Dispatch<SetStateAction<{message: string, color: string}>>) => {
    setToastInfo({
      message,
      color,
    });
  
    const timeout = setTimeout(() => {
      setToastInfo({
        message: '',
        color: '',
      });
    }, 3000);
  
    return () => clearTimeout(timeout);
  }