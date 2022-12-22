import { useFile } from '../../../Hooks/useFiles';
import '../../../scss/Button.scss';

function NewDocumentBtn() {
  const { dispatch } = useFile();

  function handleAddNewDocument() {
    dispatch({ type: 'createFile', payload: null });
  }

  return (
    <button
      type='button'
      className='new-document-btn bg-orange-1 rounded text-white'
      onClick={handleAddNewDocument}
    >
      + New Document
    </button>
  );
}

export default NewDocumentBtn;
