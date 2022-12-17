import { RefObject, useEffect } from 'react';
import SvgIcon from './SvgIcon';
import '../../scss/FileRename.scss';

interface Props {
  fileName: string;
  inputRef: RefObject<HTMLInputElement>;
}

function FileRename({ fileName, inputRef }: Props) {
  const mql = window.matchMedia('(max-width: 480px)');

  useEffect(() => {
    if (inputRef?.current !== null) {
      inputRef.current.value = fileName;
    }
  }, [fileName]);

  return (
    <div className='file-rename flex text-white'>
      <SvgIcon name='icon-document' color='white' />
      <div className='document-name'>
        {mql.matches ? (
          ''
        ) : (
          <label
            htmlFor='document-name'
            className='fs-200 fw-light text-gray-2'
          >
            Document Name
          </label>
        )}

        <input
          id='document-name'
          className='text-white'
          name='document-name'
          type='text'
          ref={inputRef}
        />
      </div>
    </div>
  );
}

export default FileRename;
