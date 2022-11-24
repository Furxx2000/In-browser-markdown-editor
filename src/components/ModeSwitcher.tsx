import { useState } from 'react';
import SvgIcon from './SvgIcon';
import '../scss/ModeSwitcher.scss';

function ModeSwitcher() {
  const [isDarkMode, setMode] = useState(false);
  const notActive = '#5a6069';

  function handleToggleMode() {
    setMode((current) => !current);
    console.log(isDarkMode);
  }

  return (
    <div className='mode-switcher bg-dark-3 flex'>
      <SvgIcon name='icon-dark-mode' color={isDarkMode ? 'white' : notActive} />
      <div
        className={`toggler bg-gray-1 ${isDarkMode ? 'dark-mode' : ''}`}
        onClick={handleToggleMode}
      ></div>
      <SvgIcon
        name='icon-light-mode'
        color={isDarkMode ? notActive : 'white'}
      />
    </div>
  );
}

export default ModeSwitcher;
