import SvgIcon from './SvgIcon';
import { useTheme } from '../../Hooks/useDarkMode';
import '../../scss/ModeSwitcher.scss';

function ModeSwitcher() {
  const notActive = '#5a6069';
  const { theme, toggleDarkMode } = useTheme();

  return (
    <div className='mode-switcher flex'>
      <SvgIcon name='icon-dark-mode' color={theme ? 'white' : notActive} />
      <div className='toggler bg-gray-1' onClick={toggleDarkMode}></div>
      <SvgIcon name='icon-light-mode' color={theme ? notActive : 'white'} />
    </div>
  );
}

export default ModeSwitcher;
