import '../../../scss/Button.scss';

interface Props {
  addNewDocument: () => void;
}

function NewDocumentBtn({ addNewDocument }: Props) {
  return (
    <button
      type='button'
      className='new-document-btn bg-orange-1 rounded text-white'
      onClick={addNewDocument}
    >
      + New Document
    </button>
  );
}

export default NewDocumentBtn;
