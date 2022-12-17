import { useState, useEffect } from 'react';
import { getTheme, setTheme, getMediaPreference } from '../helpers/DarkMode';

function useDarkMode() {
  const [isDarkMode, setMode] = useState(false);

  useEffect(() => {
    const userTheme = getTheme() || getMediaPreference();
    const darkMode = userTheme === 'dark-mode';

    if (darkMode) {
      setMode(darkMode);
      document.body.classList.add('dark-mode');
    }
  });

  function toggleDarkMode() {
    if (isDarkMode) setTheme('light-mode');
    else setTheme('dark-mode');
    setMode(!isDarkMode);
    document.body.classList.toggle('dark-mode');
  }

  return { isDarkMode, toggleDarkMode };
}

export default useDarkMode;
