import '../../scss/Dialog.scss';

interface Props {
  name: string;
  timeStamp: string;
  isOpenDialog: boolean;
  isDarkMode: boolean;
  changeDialogStatus: () => void;
  deleteCurFile: (fileName: string) => void;
}

function Dialog({
  changeDialogStatus,
  deleteCurFile,
  name,
  timeStamp,
  isOpenDialog,
  isDarkMode,
}: Props) {
  return (
    <>
      <div
        className={`backdrop ${isDarkMode ? 'bg-gray-2' : 'bg-dark-1'} ${
          isOpenDialog ? 'is-active' : ''
        }`}
        onClick={changeDialogStatus}
      ></div>
      <div
        role='dialog'
        aria-label='Delete this document?'
        className={`dialog ${
          isDarkMode ? 'bg-dark-2' : 'bg-white-1'
        } rounded flex ${isOpenDialog ? 'is-active' : ''}`}
      >
        <h4 className={`dialog-title ${isDarkMode ? 'text-white' : ''}`}>
          Delete this document?
        </h4>
        <p
          className={`dialog-description ff-roboto-slab fs-250 text-gray-${
            isDarkMode ? '3' : '2'
          }`}
        >
          Are you sure you want to delete the ‘{name}’ document and its
          contents? This action cannot be reversed.
        </p>
        <button
          type='button'
          className='dialog-btn bg-orange-1 text-white rounded'
          onClick={() => deleteCurFile(timeStamp)}
        >
          Confirm & Delete
        </button>
      </div>
    </>
  );
}

export default Dialog;
