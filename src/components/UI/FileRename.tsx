import { useState } from 'react';
import '../../scss/FileRename.scss';
import SvgIcon from './SvgIcon';

interface Props {
  fileName: string;
  timeStamp: string;
}

function FileRename({ fileName, timeStamp }: Props) {
  const [name, setFileName] = useState('welcome.md');
  const mql = window.matchMedia('(max-width: 480px)');

  function handleSetFileName(e: React.ChangeEvent<HTMLInputElement>) {
    setFileName(e.target.value.trim());
  }

  return (
    <div className='file-rename flex text-white'>
      <SvgIcon name='icon-document' color='white' />
      <div className='document-name'>
        {mql.matches ? (
          ''
        ) : (
          <label
            htmlFor='document-name'
            className='fs-200 fw-light text-gray-3'
          >
            Document Name
          </label>
        )}

        <input
          id='document-name'
          className='text-white'
          name='document-name'
          type='text'
          value={fileName}
          onChange={handleSetFileName}
        />
      </div>
    </div>
  );
}

export default FileRename;
