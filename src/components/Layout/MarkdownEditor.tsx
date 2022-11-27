import { useEffect, useState } from 'react';
import SideBar from './SideBar';
import MainContent from './MainContent';

interface File {
  name: string;
  createdAt: string;
  content: string;
  isSelected: boolean;
}

function MarkdownEditor() {
  const [files, setNewFiles] = useState<File[]>([]);
  const [menuStatus, setMenuStatus] = useState(false);
  const [curFile, setCurFile] = useState<File>({
    name: '',
    createdAt: '',
    content: '',
    isSelected: true,
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('../../../data/data.json');
      const data = await res.json();

      setNewFiles(data);
      setCurFile({ ...data[0], isSelected: true });
    };
    fetchData();
  }, []);

  function changeMenuStatus() {
    setMenuStatus(!menuStatus);
  }

  return (
    <div className={`root-container ${menuStatus ? 'is-active' : ''}`}>
      <SideBar isMenuOpen={menuStatus} files={files} />
      <MainContent
        curFile={curFile}
        isMenuOpen={menuStatus}
        onChangeMenuStatus={changeMenuStatus}
      />
    </div>
  );
}

export default MarkdownEditor;
