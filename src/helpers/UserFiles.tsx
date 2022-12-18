import Document from './Interface';

function getUserFiles() {
  return localStorage.getItem('user-files');
}

function setUserFiles(files: Document[]) {
  localStorage.setItem('user-files', JSON.stringify(files));
}

export { getUserFiles, setUserFiles };
