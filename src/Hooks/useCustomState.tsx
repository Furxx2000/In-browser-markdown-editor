import React, { useState, useEffect, createContext, useContext } from 'react';
import { getTheme, setTheme, getMediaPreference } from '../helpers/DarkMode';

function useStateSource() {
  const [theme, setMode] = useState(false);
  const [toast, setToast] = useState(false);
  const [menu, setMenuStatus] = useState(false);
  const [dialog, setIsOpenDialog] = useState(false);
  const [markdown, setMarkdown] = useState(true);
  const [onePagePreview, setOnePagePreview] = useState(false);

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

  function changeMarkdownStatus() {
    setMarkdown(!markdown);
  }

  function changeOnePagePreviewStatus() {
    setOnePagePreview(!onePagePreview);
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
    markdown,
    onePagePreview,
    changeOnePagePreviewStatus,
    changeMarkdownStatus,
    changeToastStatus,
    changeDialogStatus,
    changeMenuStatus,
    toggleDarkMode,
  };
}

const CustomStateContext = createContext<ReturnType<typeof useStateSource>>(
  null as unknown as ReturnType<typeof useStateSource>
);

export function useCustomState() {
  return useContext(CustomStateContext);
}

export function CustomStateProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CustomStateContext.Provider value={useStateSource()}>
      {children}
    </CustomStateContext.Provider>
  );
}
