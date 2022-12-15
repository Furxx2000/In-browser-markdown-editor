import { useState, useEffect, useRef } from 'react';
import Document from '../helpers/Interface';
import MONTHS from '../helpers/Months';
import {
  LastDocumentTimeStamp,
  CreateNewDocument,
} from '../helpers/AddNewDocument';

function useFiles() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setNewFiles] = useState<Document[]>([]);
  const [curFile, setCurFile] = useState<Document>({
    name: '',
    content: '',
    createdAt: '',
    timeStamp: '',
    isSelected: true,
  });

  const fetchData = async () => {
    const res = await fetch('../../../data/data.json');
    const data = await res.json();
    const rawData = data.map((file: {}, index: number) => {
      return {
        ...file,
        isSelected: index === 0 ? true : false,
      };
    });
    setNewFiles(rawData);
    setCurFile(rawData.find((data: Document) => data.isSelected));
  };

  useEffect(() => {
    fetchData();
  }, []);

  function changeCurFile(timeStamp: string) {
    const newFiles = files.map((file) => {
      return {
        ...file,
        isSelected: timeStamp === file.timeStamp,
      };
    });
    const targetFile = newFiles.find((file) => file.isSelected) || curFile;
    setNewFiles(newFiles);
    setCurFile(targetFile);
  }

  function deleteCurFile(timeStamp: string) {
    if (files.length === 1) return;
    const newFiles = files
      .filter((file) => file.timeStamp !== timeStamp)
      .map((file, index) => {
        return {
          ...file,
          isSelected: index === 0,
        };
      });
    setNewFiles(newFiles);
    setCurFile(newFiles[0]);
  }

  function AddNewDocument() {
    if (LastDocumentTimeStamp(files) < 3) return;

    const newDoc = CreateNewDocument(MONTHS);
    setNewFiles([newDoc, ...files]);
  }

  function saveChangedName() {
    if (inputRef.current !== null) {
      if (inputRef.current.value === curFile.name) return;

      const newName = inputRef.current?.value;
      const newArr = [...files];
      const targetFile = newArr.find((file) => file.isSelected);
      if (targetFile) targetFile.name = newName;
      setCurFile({ ...curFile, name: newName });
    }
  }

  function changeMarkdownContent(markdownContent: string) {
    setCurFile({ ...curFile, content: markdownContent });
  }

  return {
    files,
    curFile,
    inputRef,
    deleteCurFile,
    changeCurFile,
    AddNewDocument,
    saveChangedName,
    changeMarkdownContent,
  };
}

export default useFiles;
