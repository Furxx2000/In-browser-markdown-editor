import { useEffect, useRef, useMemo, useReducer } from 'react';
import Document from '../helpers/Interface';
import MONTHS from '../helpers/Months';
import {
  LastDocumentTimeStamp,
  CreateNewDocument,
} from '../helpers/AddNewDocument';
import { getUserFiles, setUserFiles } from '../helpers/UserFiles';
import JSONdata from '../../data/data.json?url';

function useFiles() {
  const inputRef = useRef<HTMLInputElement>(null);

  const initial = [
    {
      name: '',
      content: '',
      createdAt: '',
      timeStamp: '',
      isSelected: true,
    },
  ];

  type FileState = Document[];

  type FileAction =
    | { type: 'setFile'; payload: Document[] }
    | { type: 'createFile'; payload: null }
    | { type: 'changeFile'; payload: string }
    | { type: 'deleteFile'; payload: string }
    | { type: 'saveFile'; payload: null }
    | { type: 'changeMarkdown'; payload: string };

  function fileReducer(state: FileState, action: FileAction) {
    const { type, payload } = action;
    switch (type) {
      case 'setFile':
        return payload;
      case 'createFile':
        const newFile = AddNewDocument();
        if (LastDocumentTimeStamp(state) < 2) return state;
        return [newFile, ...state];
      case 'changeFile':
        const changedFiles = changeCurFile(state, payload);
        return changedFiles;
      case 'deleteFile':
        const deletedFiles = deleteCurFile(state, payload)!;
        return deletedFiles;
      case 'saveFile':
        const savedFiles = saveChange(state)!;
        return savedFiles;
      case 'changeMarkdown':
        const changedMarkdownFile = changeMarkdownContent(state, payload);
        return changedMarkdownFile;
      default:
        return state;
    }
  }

  const [files, dispatch] = useReducer(fileReducer, initial);

  const fetchData = async () => {
    const res = await fetch(JSONdata);
    const data = await res.json();
    const rawData = data.map((file: {}, index: number) => {
      return {
        ...file,
        isSelected: index === 0 ? true : false,
      };
    });
    dispatch({ type: 'setFile', payload: rawData });
  };

  useEffect(() => {
    const userFilesStr = getUserFiles();

    if (userFilesStr) {
      dispatch({ type: 'setFile', payload: JSON.parse(userFilesStr) });
    } else fetchData();
  }, []);

  function changeCurFile(files: Document[], timeStamp: string) {
    const newFiles = files.map((file) => {
      return {
        ...file,
        isSelected: timeStamp === file.timeStamp,
      };
    });
    return newFiles;
  }

  function deleteCurFile(files: Document[], timeStamp: string) {
    if (files.length === 1) return;
    const newFiles = files
      .filter((file) => file.timeStamp !== timeStamp)
      .map((file, index) => {
        return {
          ...file,
          isSelected: index === 0,
        };
      });

    setUserFiles(newFiles);
    return newFiles;
  }

  function AddNewDocument() {
    return CreateNewDocument(MONTHS);
  }

  function saveChange(files: Document[]) {
    if (inputRef.current !== null) {
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

      setUserFiles(newArr);
      return newArr;
    }
  }

  function changeMarkdownContent(files: Document[], markdownContent: string) {
    const newArr = files.map((file) => {
      if (file.isSelected) {
        return {
          ...file,
          content: markdownContent,
        };
      }
      return file;
    });
    return newArr;
  }

  const curFile = useMemo(
    () => files.filter((file) => file.isSelected),
    [files]
  )[0];

  return {
    files,
    curFile,
    inputRef,
    dispatch,
  };
}

export default useFiles;
