import { useState } from 'react';

export default function useToast() {
  const [toast, setToast] = useState(false);

  function changeToastStatus() {
    setToast(true);
    setTimeout(() => {
      setToast(false);
    }, 2000);
  }

  return { toast, changeToastStatus };
}
