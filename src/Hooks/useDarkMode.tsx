import React, { useState, useEffect, createContext, useContext } from 'react';
import { getTheme, setTheme, getMediaPreference } from '../helpers/DarkMode';

export function useThemeSource() {
  const [theme, setMode] = useState(false);
  const [toast, setToast] = useState(false);
  const [menu, setMenuStatus] = useState(false);
  const [dialog, setIsOpenDialog] = useState(false);

  useEffect(() => {
    const userTheme = getTheme() || getMediaPreference();
    const darkMode = userTheme === 'dark-mode';

    if (darkMode) {
      setMode(darkMode);
      document.body.classList.add('dark-mode');
    }
  }, []);

  function toggleDarkMode() {
    if (theme) setTheme('light-mode');
    else setTheme('dark-mode');
    setMode(!theme);
    document.body.classList.toggle('dark-mode');
  }

  function changeMenuStatus() {
    setMenuStatus(!menu);
  }

  function changeDialogStatus() {
    setIsOpenDialog(!dialog);
  }

  function changeToastStatus() {
    setToast(true);
    setTimeout(() => {
      setToast(false);
    }, 2000);
  }

  return {
    theme,
    menu,
    dialog,
    toast,
    changeToastStatus,
    changeDialogStatus,
    changeMenuStatus,
    toggleDarkMode,
  };
}

const ThemeContext = createContext<ReturnType<typeof useThemeSource>>(
  null as unknown as ReturnType<typeof useThemeSource>
);

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeContext.Provider value={useThemeSource()}>
      {children}
    </ThemeContext.Provider>
  );
}
