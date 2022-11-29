import '../../scss/Dialog.scss';

interface Props {
  name: string;
  changeDialogStatus: () => void;
}

function Dialog({ changeDialogStatus, name }: Props) {
  return (
    <>
      <div className='backdrop bg-dark-1' onClick={changeDialogStatus}></div>
      <div
        role='dialog'
        aria-label='Delete this document?'
        className='dialog bg-white-1 rounded flex'
      >
        <h4 className='dialog-title'>Delete this document?</h4>
        <p className='dialog-description ff-roboto-slab fs-250 text-gray-2'>
          Are you sure you want to delete the ‘{name}’ document and its
          contents? This action cannot be reversed.
        </p>
        <button
          type='button'
          className='dialog-btn bg-orange-1 text-white rounded'
        >
          Confirm & Delete
        </button>
      </div>
    </>
  );
}

export default Dialog;
