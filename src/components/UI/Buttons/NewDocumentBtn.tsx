import '../../../scss/Button.scss';

interface Props {
  dispatch: React.Dispatch<any>;
}

function NewDocumentBtn({ dispatch }: Props) {
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
