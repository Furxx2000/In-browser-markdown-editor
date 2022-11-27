import '../../scss/Header.scss';
import Menu from '../UI/Menu';
import FileRename from '../UI/FileRename';
import SvgIcon from '../UI/SvgIcon';
import SaveChangeBtn from '../UI/Buttons/SaveChangeBtn';

interface File {
  name: string;
  createdAt: string;
  isSelected: boolean;
  isMenuOpen: boolean;
  onChangeMenuStatus: () => void;
}

function Header({
  name,
  createdAt,
  isSelected,
  isMenuOpen,
  onChangeMenuStatus,
}: File) {
  const deleteColor = '#7c8187';
  return (
    <>
      <header
        className={`header bg-dark-3 flex ${isMenuOpen ? 'is-active' : ''}`}
      >
        <Menu isMenuOpen={isMenuOpen} onChangeMenuStatus={onChangeMenuStatus} />
        <FileRename fileName={name} date={createdAt} isSelected={isSelected} />
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
