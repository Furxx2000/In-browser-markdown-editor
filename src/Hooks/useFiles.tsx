import { useState, useEffect, useRef } from 'react';
import Document from '../helpers/Interface';
import MONTHS from '../helpers/Months';
import {
  LastDocumentTimeStamp,
  CreateNewDocument,
} from '../helpers/AddNewDocument';

function useFiles() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setNewFiles] = useState<Document[]>([
    {
      name: '',
      content: '',
      createdAt: '',
      timeStamp: '',
      isSelected: true,
    },
  ]);

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
    setNewFiles(newFiles);
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
  }

  function AddNewDocument() {
    if (LastDocumentTimeStamp(files) < 3) return;

    const newDoc = CreateNewDocument(MONTHS);
    setNewFiles([newDoc, ...files]);
  }

  function saveChangedName() {
    if (inputRef.current !== null) {
      const curFile = files.find((file) => file.isSelected);
      if (inputRef.current.value === curFile?.name) return;

      const newName = inputRef.current?.value;
      const newArr = files.map((file) => {
        if (file.isSelected) {
          return {
            ...file,
            name: newName,
          };
        }
        return file;
      });
      setNewFiles(newArr);
    }
  }

  function changeMarkdownContent(markdownContent: string) {
    const newArr = files.map((file) => {
      if (file.isSelected) {
        return {
          ...file,
          content: markdownContent,
        };
      }
      return file;
    });
    setNewFiles(newArr);
  }

  return {
    files,
    inputRef,
    deleteCurFile,
    changeCurFile,
    AddNewDocument,
    saveChangedName,
    changeMarkdownContent,
  };
}

export default useFiles;
