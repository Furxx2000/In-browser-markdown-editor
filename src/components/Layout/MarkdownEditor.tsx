import MainContent from './MainContent';
import Dialog from '../UI/Dialog';
import SideBar from './SideBar';
import Toast from '../UI/Toast';

function MarkdownEditor() {
  return (
    <div className='root-container'>
      <SideBar />
      <MainContent />
      <Dialog />
      <Toast />
    </div>
  );
}

export default MarkdownEditor;
