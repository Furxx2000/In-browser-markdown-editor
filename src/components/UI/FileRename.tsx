import { useState } from 'react';
import '../../scss/FileRename.scss';
import SvgIcon from './SvgIcon';

function FileRename() {
  const [fileName, setFileName] = useState('welcome.md');

  function handleSetFileName(e: React.ChangeEvent<HTMLInputElement>) {
    setFileName(e.target.value.trim());
  }

  return (
    <div className='file-rename flex bg-dark-3 text-white'>
      <SvgIcon name='icon-document' color='white' />
      <div className='document-name'>
        <label htmlFor='document-name' className='fs-200 fw-light text-gray-3'>
          Document Name
        </label>
        <input
          id='document-name'
          name='document-name'
          type='text'
          value={fileName}
          onChange={handleSetFileName}
          className='text-white'
        />
      </div>
    </div>
  );
}

export default FileRename;
