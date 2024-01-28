export const formatDateForInput = (value: string): string => {
    const selectedDate = new Date(value);
    const year = selectedDate.getFullYear();
    const month = (selectedDate.getMonth() + 1).toString().padStart(2, '0');
    const day = selectedDate.getDate().toString().padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  };