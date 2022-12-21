import { useCustomState } from '../../Hooks/useCustomState';
import SvgIcon from './SvgIcon';
import '../../scss/Menu.scss';

function Menu() {
  const { menu, changeMenuStatus } = useCustomState();

  return (
    <button
      type='button'
      aria-label='Menu'
      className='menu bg-dark-4'
      onClick={changeMenuStatus}
    >
      {menu ? (
        <SvgIcon className='icon-close' name='icon-close' color='white' />
      ) : (
        <SvgIcon className='icon-menu' name='icon-menu' color='white' />
      )}
      <span className='sr-only'>Menu</span>
    </button>
  );
}

export default Menu;
