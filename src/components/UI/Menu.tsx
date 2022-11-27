import '../../scss/Menu.scss';
import SvgIcon from './SvgIcon';

interface ChangeMenuStatus {
  isMenuOpen: boolean;
  onChangeMenuStatus: () => void;
}

function Menu({ isMenuOpen, onChangeMenuStatus }: ChangeMenuStatus) {
  return (
    <button
      type='button'
      aria-label='Menu'
      className='menu bg-dark-4'
      onClick={onChangeMenuStatus}
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
