import { useState } from 'react';

function useDarkMode() {
  const [isDarkMode, setMode] = useState(false);

  function toggleDarkMode() {
    setMode(!isDarkMode);
    document.body.classList.toggle('dark-mode');
  }

  return { isDarkMode, toggleDarkMode };
}

export default useDarkMode;
