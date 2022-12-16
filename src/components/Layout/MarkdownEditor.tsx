import SideBar from './SideBar';
import MainContent from './MainContent';
import Dialog from '../UI/Dialog';
import useFiles from '../../Hooks/useFiles';
import useDialog from '../../Hooks/useDialog';
import useMenu from '../../Hooks/useMenu';
import useDarkMode from '../../Hooks/useDarkMode';

function MarkdownEditor() {
  const {
    files,
    inputRef,
    deleteCurFile,
    changeCurFile,
    AddNewDocument,
    saveChangedName,
    changeMarkdownContent,
  } = useFiles();
  const { isOpenDialog, changeDialogStatus } = useDialog();
  const { menuStatus, changeMenuStatus } = useMenu();
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  function deleteCurDocument(timeStamp: string) {
    deleteCurFile(timeStamp);
    changeDialogStatus();
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
        curFile={files.filter((file) => file.isSelected)[0]}
        isMenuOpen={menuStatus}
        fileQuantity={files.length}
        inputRef={inputRef}
        isDarkMode={isDarkMode}
        onChangeMenuStatus={changeMenuStatus}
        onChangeDialogStatus={changeDialogStatus}
        saveChangedName={saveChangedName}
        changeMarkdownContent={changeMarkdownContent}
      />
      <Dialog
        name={files.filter((file) => file.isSelected)[0].name}
        timeStamp={files.filter((file) => file.isSelected)[0].timeStamp}
        isOpenDialog={isOpenDialog}
        isDarkMode={isDarkMode}
        changeDialogStatus={changeDialogStatus}
        deleteCurFile={deleteCurDocument}
      />
    </div>
  );
}

export default MarkdownEditor;
