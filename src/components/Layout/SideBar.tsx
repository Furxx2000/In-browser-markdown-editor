import { useCustomState } from '../../Hooks/useCustomState';
import { useFile } from '../../Hooks/useFiles';
import NewDocumentBtn from '../UI/Buttons/NewDocumentBtn';
import Document from '../../helpers/Interface';
import ModeSwitcher from '../UI/ModeSwitcher';
import SideBarList from '../UI/SideBarList';
import SvgIcon from '../UI/SvgIcon';
import '../../scss/SideBar.scss';

function SideBar() {
  const { files, dispatch } = useFile();
  const { menu } = useCustomState();

  function handleChangeCurFile(timeStamp: string) {
    dispatch({ type: 'changeFile', payload: timeStamp });
  }

  return (
    <aside className={`side-bar bg-dark-2 ${menu ? 'is-active' : ''}`}>
      <nav className='grid'>
        <SvgIcon className='icon-logo' name='logo' color='white' />
        <p className='fs-250 fw-medium text-gray-2 letter-spacing-1'>
          MY DOCUMENTS
        </p>
        <NewDocumentBtn />
        <ul>
          {files.map((file: Document) => (
            <li
              key={file.timeStamp}
              onClick={() => handleChangeCurFile(file.timeStamp)}
            >
              <SideBarList
                fileName={file.name}
                date={file.createdAt}
                isSelected={file.isSelected}
              />
            </li>
          ))}
        </ul>
      </nav>
      <ModeSwitcher />
    </aside>
  );
}

export default SideBar;
