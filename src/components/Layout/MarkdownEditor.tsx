import SideBar from './SideBar';
import MainContent from './MainContent';
import Dialog from '../UI/Dialog';
import Toast from '../UI/Toast';
import useFiles from '../../Hooks/useFiles';

function MarkdownEditor() {
  const { files, curFile, inputRef, dispatch } = useFiles();

  return (
    <div className='root-container'>
      <SideBar files={files} dispatch={dispatch} />
      <MainContent
        curFile={curFile}
        fileQuantity={files.length}
        inputRef={inputRef}
        dispatch={dispatch}
      />
      <Dialog
        name={curFile.name}
        timeStamp={curFile.timeStamp}
        dispatch={dispatch}
      />
      <Toast />
    </div>
  );
}

export default MarkdownEditor;
