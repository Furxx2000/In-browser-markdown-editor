import { useEffect, useState } from 'react';
import SideBar from './SideBar';
import MainContent from './MainContent';
import Dialog from '../UI/Dialog';

interface File {
  name: string;
  createdAt: string;
  content: string;
  isSelected: boolean;
}

function MarkdownEditor() {
  const [files, setNewFiles] = useState<File[]>([]);
  const [curFile, setCurFile] = useState<File>({
    name: '',
    createdAt: '',
    content: '',
    isSelected: true,
  });
  const [menuStatus, setMenuStatus] = useState(false);
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('../../../data/data.json');
      const data = await res.json();

      setNewFiles(data);
      setCurFile({ ...data[1], isSelected: true });
    };
    fetchData();
  }, []);

  function changeMenuStatus() {
    setMenuStatus(!menuStatus);
  }

  function changeDialogStatus() {
    setIsOpenDialog(!isOpenDialog);
  }

  return (
    <div className={`root-container ${menuStatus ? 'is-active' : ''}`}>
      <SideBar isMenuOpen={menuStatus} files={files} />
      <MainContent
        curFile={curFile}
        isMenuOpen={menuStatus}
        onChangeMenuStatus={changeMenuStatus}
        onChangeDialogStatus={changeDialogStatus}
      />
      {isOpenDialog ? (
        <Dialog name={curFile.name} changeDialogStatus={changeDialogStatus} />
      ) : (
        ''
      )}
    </div>
  );
}

export default MarkdownEditor;
