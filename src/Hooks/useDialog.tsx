import { useState } from 'react';

function useDialog() {
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  function changeDialogStatus() {
    setIsOpenDialog(!isOpenDialog);
  }

  return { isOpenDialog, changeDialogStatus };
}

export default useDialog;
