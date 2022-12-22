import { useCustomState } from '../../Hooks/useCustomState';
import { useFile } from '../../Hooks/useFiles';
import { useMemo } from 'react';
import '../../scss/Dialog.scss';

function Dialog() {
  const { curFile, dispatch } = useFile();
  const { dialog, changeDialogStatus } = useCustomState();
  const { name, timeStamp } = useMemo(() => {
    return {
      name: curFile.name,
      timeStamp: curFile.timeStamp,
    };
  }, [curFile]);

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
