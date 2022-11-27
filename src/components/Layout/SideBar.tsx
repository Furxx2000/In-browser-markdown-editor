import NewDocumentBtn from '../UI/Buttons/NewDocumentBtn';
import SvgIcon from '../UI/SvgIcon';
import '../../scss/SideBar.scss';
import FileRename from '../UI/FileRename';
import ModeSwitcher from '../UI/ModeSwitcher';

interface File {
  name: string;
  createdAt: string;
  content: string;
  isSelected: boolean;
}

interface Props {
  files: File[];
  isMenuOpen: boolean;
}

function SideBar(props: Props) {
  return (
    <div
      className={`side-bar bg-dark-2 ${props.isMenuOpen ? 'is-active' : ''}`}
    >
      <div className='flow'>
        <SvgIcon className='icon-logo' name='logo' color='white' />
        <p className='fs-250 fw-medium text-gray-2 letter-spacing-1'>
          MY DOCUMENTS
        </p>
        <NewDocumentBtn />
        <ul>
          {props.files.map((file: File) => (
            <li key={file.name}>
              <FileRename
                fileName={file.name}
                date={file.createdAt}
                isSelected={file.isSelected}
              />
            </li>
          ))}
        </ul>
      </div>
      <ModeSwitcher />
    </div>
  );
}

export default SideBar;
