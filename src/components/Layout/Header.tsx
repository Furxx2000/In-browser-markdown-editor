import Menu from '../UI/Menu';
import FileRename from '../UI/FileRename';
import SvgIcon from '../UI/SvgIcon';
import SaveChangeBtn from '../UI/Buttons/SaveChangeBtn';
import { RefObject } from 'react';
import '../../scss/Header.scss';

interface Props {
  name: string;
  isSelected: boolean;
  isMenuOpen: boolean;
  fileQuantity: number;
  inputRef: RefObject<HTMLInputElement>;
  onChangeMenuStatus: () => void;
  onChangeDialogStatus: () => void;
  saveChangedName: () => void;
}

function Header({
  name,
  isMenuOpen,
  fileQuantity,
  inputRef,
  onChangeMenuStatus,
  onChangeDialogStatus,
  saveChangedName,
}: Props) {
  return (
    <>
      <header
        className={`header bg-dark-3 flex ${isMenuOpen ? 'is-active' : ''}`}
      >
        <Menu isMenuOpen={isMenuOpen} onChangeMenuStatus={onChangeMenuStatus} />
        <SvgIcon className='icon-logo' name='logo' color='white' />
        <div className='divider'></div>
        <FileRename fileName={name} inputRef={inputRef} />
        {fileQuantity > 1 && (
          <SvgIcon
            className='icon-delete'
            name='icon-delete'
            color='#7c8187'
            onClick={onChangeDialogStatus}
          />
        )}
        <SaveChangeBtn saveChangedName={saveChangedName} />
      </header>
    </>
  );
}

export default Header;
