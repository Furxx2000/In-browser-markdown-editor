import SideBar from './SideBar';
import MainContent from './MainContent';
import Dialog from '../UI/Dialog';
import Toast from '../UI/Toast';
import useFiles from '../../Hooks/useFiles';
import { useTheme } from '../../Hooks/useDarkMode';

function MarkdownEditor() {
  const {
    files,
    curFile,
    inputRef,
    deleteCurFile,
    changeCurFile,
    AddNewDocument,
    saveChange,
    changeMarkdownContent,
  } = useFiles();

  const { changeDialogStatus, changeToastStatus } = useTheme();

  function deleteCurDocument(timeStamp: string) {
    deleteCurFile(timeStamp);
    changeDialogStatus();
  }

  function saveCurChange() {
    saveChange();
    changeToastStatus();
  }

  return (
    <div className='root-container'>
      <SideBar
        files={files}
        changeCurFile={changeCurFile}
        addNewDocument={AddNewDocument}
      />
      <MainContent
        curFile={curFile}
        fileQuantity={files.length}
        inputRef={inputRef}
        saveChange={saveCurChange}
        changeMarkdownContent={changeMarkdownContent}
      />
      <Dialog
        name={curFile.name}
        timeStamp={curFile.timeStamp}
        deleteCurFile={deleteCurDocument}
      />
      <Toast />
    </div>
  );
}

export default MarkdownEditor;
