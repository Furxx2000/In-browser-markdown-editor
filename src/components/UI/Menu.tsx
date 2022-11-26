import { useState } from 'react';
import '../../scss/Menu.scss';
import SvgIcon from './SvgIcon';

function Menu() {
  const [isMenuOpen, setMenu] = useState(false);

  function toggleMenu() {
    setMenu(!isMenuOpen);
  }

  return (
    <button
      type='button'
      aria-label='Menu'
      className='menu bg-dark-4'
      onClick={toggleMenu}
    >
      {isMenuOpen ? (
        <SvgIcon className='icon-close' name='icon-close' color='white' />
      ) : (
        <SvgIcon className='icon-menu' name='icon-menu' color='white' />
      )}
      <span className='sr-only'>Menu</span>
    </button>
  );
}

export default Menu;
