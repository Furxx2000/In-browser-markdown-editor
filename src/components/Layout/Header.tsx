import { useCustomState } from '../../Hooks/useCustomState';
import { useFile } from '../../Hooks/useFiles';
import { useMemo } from 'react';
import SaveChangeBtn from '../UI/Buttons/SaveChangeBtn';
import FileRename from '../UI/FileRename';
import SvgIcon from '../UI/SvgIcon';
import Menu from '../UI/Menu';
import '../../scss/Header.scss';

function Header() {
  const { files } = useFile();
  const { menu, changeDialogStatus } = useCustomState();
  const fileQuantity = useMemo(() => files.length, [files]);

  return (
    <>
      <header className={`header bg-dark-3 flex ${menu ? 'is-active' : ''}`}>
        <Menu />
        <SvgIcon className='icon-logo' name='logo' color='white' />
        <div className='divider'></div>
        <FileRename />
        {fileQuantity > 1 && (
          <SvgIcon
            className='icon-delete'
            name='icon-delete'
            color='#7c8187'
            onClick={changeDialogStatus}
          />
        )}
        <SaveChangeBtn />
      </header>
    </>
  );
}

export default Header;
