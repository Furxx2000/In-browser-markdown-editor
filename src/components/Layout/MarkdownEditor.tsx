import SideBar from './SideBar';
import MainContent from './MainContent';
import Dialog from '../UI/Dialog';
import Toast from '../UI/Toast';
import useFiles from '../../Hooks/useFiles';
import useDialog from '../../Hooks/useDialog';
import useMenu from '../../Hooks/useMenu';
import useDarkMode from '../../Hooks/useDarkMode';
import useToast from '../../Hooks/useToast';

function MarkdownEditor() {
  const {
    files,
    inputRef,
    deleteCurFile,
    changeCurFile,
    AddNewDocument,
    saveChange,
    changeMarkdownContent,
  } = useFiles();
  const { isOpenDialog, changeDialogStatus } = useDialog();
  const { menuStatus, changeMenuStatus } = useMenu();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const { toast, changeToastStatus } = useToast();
  const curFile = files.filter((file) => file.isSelected)[0];

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
        isMenuOpen={menuStatus}
        files={files}
        isDarkMode={isDarkMode}
        changeCurFile={changeCurFile}
        addNewDocument={AddNewDocument}
        toggleDarkMode={toggleDarkMode}
      />
      <MainContent
        curFile={curFile}
        isMenuOpen={menuStatus}
        fileQuantity={files.length}
        inputRef={inputRef}
        isDarkMode={isDarkMode}
        onChangeMenuStatus={changeMenuStatus}
        onChangeDialogStatus={changeDialogStatus}
        saveChange={saveCurChange}
        changeMarkdownContent={changeMarkdownContent}
      />
      <Dialog
        name={curFile.name}
        timeStamp={curFile.timeStamp}
        isOpenDialog={isOpenDialog}
        changeDialogStatus={changeDialogStatus}
        deleteCurFile={deleteCurDocument}
      />
      <Toast isToastOpen={toast} />
    </div>
  );
}

export default MarkdownEditor;
