import '../../scss/Header.scss';
import Menu from '../UI/Menu';
import FileRename from '../UI/FileRename';
import SvgIcon from '../UI/SvgIcon';
import SaveChangeBtn from '../UI/Buttons/SaveChangeBtn';

function Header() {
  const deleteColor = '#7c8187';

  return (
    <>
      <header className='header bg-dark-3 flex'>
        <Menu />
        <FileRename />
        <SvgIcon
          className='icon-delete'
          name='icon-delete'
          color={deleteColor}
        />
        <SaveChangeBtn />
      </header>
    </>
  );
}

export default Header;
