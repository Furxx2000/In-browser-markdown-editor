import { useCustomState } from '../../Hooks/useCustomState';
import '../../scss/Dialog.scss';

interface Props {
  name: string;
  timeStamp: string;
  dispatch: React.Dispatch<any>;
}

function Dialog({ dispatch, name, timeStamp }: Props) {
  const { dialog, changeDialogStatus } = useCustomState();

  function handleDeleteCurFile(timeStamp: string) {
    dispatch({ type: 'deleteFile', payload: timeStamp });
    changeDialogStatus();
  }

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
          onClick={() => handleDeleteCurFile(timeStamp)}
        >
          Confirm & Delete
        </button>
      </div>
    </>
  );
}

export default Dialog;
