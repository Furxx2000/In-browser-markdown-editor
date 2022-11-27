import { useState } from 'react';
import '../../scss/FileRename.scss';
import SvgIcon from './SvgIcon';

interface File {
  fileName: string;
  date: string;
  isSelected: boolean;
}

function FileRename({ fileName, date, isSelected }: File) {
  const [name, setFileName] = useState('welcome.md');
  const mql = window.matchMedia('(max-width: 480px)');

  function handleSetFileName(e: React.ChangeEvent<HTMLInputElement>) {
    setFileName(e.target.value.trim());
  }

  return (
    <div className='file-rename flex text-white'>
      <SvgIcon name='icon-document' color='white' />
      <div className='document-name'>
        {mql.matches && isSelected ? (
          ''
        ) : (
          <label
            htmlFor='document-name'
            className='fs-200 fw-light text-gray-3'
          >
            {isSelected ? 'Document Name' : date}
          </label>
        )}

        <input
          id='document-name'
          name='document-name'
          type='text'
          value={fileName}
          onChange={handleSetFileName}
          className='text-white'
          readOnly={!isSelected}
        />
      </div>
    </div>
  );
}

export default FileRename;
