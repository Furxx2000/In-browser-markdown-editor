import { useFile } from '../../Hooks/useFiles';
import { useEffect, useMemo } from 'react';
import SvgIcon from './SvgIcon';
import '../../scss/FileRename.scss';

function FileRename() {
  const mql = window.matchMedia('(max-width: 480px)');
  const { curFile, inputRef } = useFile();
  const fileName = useMemo(() => curFile.name, [curFile]);

  useEffect(() => {
    if (inputRef?.current !== null) {
      inputRef.current.value = fileName;
    }
  }, [fileName]);

  return (
    <div className='file-rename flex text-white'>
      <SvgIcon name='icon-document' color='white' />
      <div className='document-name'>
        <label htmlFor='document-name' className='fs-200 fw-light text-gray-2'>
          Document Name
        </label>

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
