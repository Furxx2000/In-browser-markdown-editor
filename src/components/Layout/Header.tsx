import '../../scss/Header.scss';
import Menu from '../UI/Menu';
import FileRename from '../UI/FileRename';
import SvgIcon from '../UI/SvgIcon';
import SaveChangeBtn from '../UI/Buttons/SaveChangeBtn';

interface File {
  name: string;
  timeStamp: string;
  isSelected: boolean;
  isMenuOpen: boolean;
  fileQuantity: number;
  onChangeMenuStatus: () => void;
  onChangeDialogStatus: () => void;
}

function Header({
  name,
  isMenuOpen,
  fileQuantity,
  timeStamp,
  onChangeMenuStatus,
  onChangeDialogStatus,
}: File) {
  const deleteColor = '#7c8187';
  return (
    <>
      <header className={`header bg-dark-3 flex`}>
        <Menu isMenuOpen={isMenuOpen} onChangeMenuStatus={onChangeMenuStatus} />
        <FileRename fileName={name} timeStamp={timeStamp} />
        {fileQuantity > 1 && (
          <SvgIcon
            className='icon-delete'
            name='icon-delete'
            color={deleteColor}
            onClick={onChangeDialogStatus}
          />
        )}

        <SaveChangeBtn />
      </header>
    </>
  );
}

export default Header;
