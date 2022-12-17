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
  const deleteColor = '#7c8187';
  return (
    <>
      <header
        className={`header bg-dark-3 flex ${isMenuOpen ? 'is-active' : ''}`}
      >
        <Menu isMenuOpen={isMenuOpen} onChangeMenuStatus={onChangeMenuStatus} />
        <FileRename fileName={name} inputRef={inputRef} />
        {fileQuantity > 1 && (
          <SvgIcon
            className='icon-delete'
            name='icon-delete'
            color={deleteColor}
            onClick={onChangeDialogStatus}
          />
        )}
        <SaveChangeBtn saveChangedName={saveChangedName} />
      </header>
    </>
  );
}

export default Header;
