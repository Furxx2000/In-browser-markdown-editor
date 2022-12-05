import NewDocumentBtn from '../UI/Buttons/NewDocumentBtn';
import SvgIcon from '../UI/SvgIcon';
import '../../scss/SideBar.scss';
import ModeSwitcher from '../UI/ModeSwitcher';
import SideBarList from '../UI/SideBarList';

interface File {
  name: string;
  createdAt: string;
  timeStamp: string;
  content: string;
  isSelected: boolean;
}

interface Props {
  files: File[];
  isMenuOpen: boolean;
  isDarkMode: boolean;
  changeCurFile: (fileName: string) => void;
  addNewDocument: () => void;
  toggleDarkMode: () => void;
}

function SideBar({
  files,
  isMenuOpen,
  isDarkMode,
  changeCurFile,
  addNewDocument,
  toggleDarkMode,
}: Props) {
  return (
    <aside className={`side-bar bg-dark-2 ${isMenuOpen ? 'is-active' : ''}`}>
      <nav className='grid'>
        <SvgIcon className='icon-logo' name='logo' color='white' />
        <p className='fs-250 fw-medium text-gray-2 letter-spacing-1'>
          MY DOCUMENTS
        </p>
        <NewDocumentBtn addNewDocument={addNewDocument} />
        <ul>
          {files.map((file: File) => (
            <li
              key={file.timeStamp}
              onClick={() => changeCurFile(file.timeStamp)}
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
      <ModeSwitcher isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
    </aside>
  );
}

export default SideBar;
