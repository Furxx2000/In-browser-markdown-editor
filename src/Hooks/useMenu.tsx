import { useState } from 'react';

function useMenu() {
  const [menuStatus, setMenuStatus] = useState(false);

  function changeMenuStatus() {
    setMenuStatus(!menuStatus);
  }

  return { menuStatus, changeMenuStatus };
}

export default useMenu;
