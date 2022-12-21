import { useTheme } from '../../Hooks/useDarkMode';
import '../../scss/Dialog.scss';

interface Props {
  name: string;
  timeStamp: string;
  deleteCurFile: (fileName: string) => void;
}

function Dialog({ deleteCurFile, name, timeStamp }: Props) {
  const { dialog, changeDialogStatus } = useTheme();

  return (
    <>
      <div
        className={`backdrop  ${dialog ? 'is-active' : ''}`}
        onClick={changeDialogStatus}
      ></div>
      <div
        role='dialog'
        aria-label='Delete this document?'
        className={`dialog rounded flex ${dialog ? 'is-active' : ''}`}
      >
        <h4 className='dialog-title'>Delete this document?</h4>
        <p className='dialog-description ff-roboto-slab fs-250'>
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
