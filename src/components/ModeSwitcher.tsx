import { useState } from 'react';
import SvgIcon from './SvgIcon';
import '../scss/ModeSwitcher.scss';

function ModeSwitcher() {
  const [isDarkMode, setMode] = useState(false);

  function handleToggleMode() {
    setMode((current) => !current);
    console.log(isDarkMode);
  }

  return (
    <div className='mode-switcher bg-dark-3 flex'>
      <SvgIcon name='icon-dark-mode' color='white' />
      <div className='toggler bg-gray-1' onClick={handleToggleMode}></div>
      <SvgIcon name='icon-light-mode' color='white' />
    </div>
  );
}

export default ModeSwitcher;
