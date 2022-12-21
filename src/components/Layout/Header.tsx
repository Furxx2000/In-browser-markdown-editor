import Menu from '../UI/Menu';
import FileRename from '../UI/FileRename';
import SvgIcon from '../UI/SvgIcon';
import SaveChangeBtn from '../UI/Buttons/SaveChangeBtn';
import { RefObject } from 'react';
import { useCustomState } from '../../Hooks/useCustomState';
import '../../scss/Header.scss';

interface Props {
  name: string;
  isSelected: boolean;
  fileQuantity: number;
  inputRef: RefObject<HTMLInputElement>;
  dispatch: React.Dispatch<any>;
}

function Header({ name, fileQuantity, inputRef, dispatch }: Props) {
  const { menu, changeDialogStatus } = useCustomState();

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
        <SaveChangeBtn dispatch={dispatch} />
      </header>
    </>
  );
}

export default Header;
