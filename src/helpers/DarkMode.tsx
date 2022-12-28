function getTheme() {
  return localStorage.getItem('user-theme');
}

function setTheme(userTheme: string) {
  localStorage.setItem('user-theme', userTheme);
}

function getMediaPreference() {
  const hasDarkPreference = window.matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches;
  if (hasDarkPreference) return 'dark-mode';
  else return 'light-mode';
}

export { getTheme, setTheme, getMediaPreference };
