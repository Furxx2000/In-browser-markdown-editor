import SvgIcon from './SvgIcon';
import '../../scss/ModeSwitcher.scss';

interface Props {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

function ModeSwitcher({ isDarkMode, toggleDarkMode }: Props) {
  const notActive = '#5a6069';

  return (
    <div className='mode-switcher flex'>
      <SvgIcon name='icon-dark-mode' color={isDarkMode ? 'white' : notActive} />
      <div className='toggler bg-gray-1' onClick={toggleDarkMode}></div>
      <SvgIcon
        name='icon-light-mode'
        color={isDarkMode ? notActive : 'white'}
      />
    </div>
  );
}

export default ModeSwitcher;
