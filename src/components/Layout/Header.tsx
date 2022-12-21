import Menu from '../UI/Menu';
import FileRename from '../UI/FileRename';
import SvgIcon from '../UI/SvgIcon';
import SaveChangeBtn from '../UI/Buttons/SaveChangeBtn';
import { RefObject } from 'react';
import { useTheme } from '../../Hooks/useDarkMode';
import '../../scss/Header.scss';

interface Props {
  name: string;
  isSelected: boolean;
  fileQuantity: number;
  inputRef: RefObject<HTMLInputElement>;
  saveChange: () => void;
}

function Header({ name, fileQuantity, inputRef, saveChange }: Props) {
  const { menu, changeDialogStatus } = useTheme();

  return (
    <>
      <header className={`header bg-dark-3 flex ${menu ? 'is-active' : ''}`}>
        <Menu />
        <SvgIcon className='icon-logo' name='logo' color='white' />
        <div className='divider'></div>
        <FileRename fileName={name} inputRef={inputRef} />
        {fileQuantity > 1 && (
          <SvgIcon
            className='icon-delete'
            name='icon-delete'
            color='#7c8187'
            onClick={changeDialogStatus}
          />
        )}
        <SaveChangeBtn saveChange={saveChange} />
      </header>
    </>
  );
}

export default Header;
