import React, { useEffect, useRef, useState } from 'react';
import SideBar from './SideBar';
import MainContent from './MainContent';
import Dialog from '../UI/Dialog';
import MONTHS from '../../helpers/months';

interface File {
  name: string;
  content: string;
  createdAt: string;
  timeStamp: string;
  isSelected: boolean;
}

function MarkdownEditor() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [markdownVal, setMarkdownVal] = useState('');
  const [files, setNewFiles] = useState<File[]>([]);
  const [curFile, setCurFile] = useState<File>({
    name: '',
    content: '',
    createdAt: '',
    timeStamp: '',
    isSelected: true,
  });
  const [menuStatus, setMenuStatus] = useState(false);
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  useEffect(() => {
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
      setCurFile(rawData.find((data: File) => data.isSelected));
      setMarkdownVal(rawData[0].content);
    };
    fetchData();
  }, []);

  function changeMenuStatus() {
    setMenuStatus(!menuStatus);
  }

  function changeDialogStatus() {
    setIsOpenDialog(!isOpenDialog);
  }

  function deleteCurFile(timeStamp: string) {
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
    setIsOpenDialog(!isOpenDialog);
  }

  function AddNewDocument() {
    // Each new document should have 3 seconds gap, otherwise return;
    const lastDocumentTimeStamp =
      Math.floor(new Date().getTime() / 1000) - +files[0].timeStamp;
    if (lastDocumentTimeStamp < 3) {
      return;
    }

    // Create new document template
    const year = new Date().getFullYear();
    const month = MONTHS[new Date().getMonth()];
    const date = new Date().getDate().toString().padStart(2, '0');
    const newDoc = {
      name: 'Untitled Document',
      content:
        "# Welcome to Markdown\n\nMarkdown is a lightweight markup language that you can use to add formatting elements to plaintext text documents.\n\n## How to use this?\n\n1. Write markdown in the markdown editor window\n2. See the rendered markdown in the preview window\n\n### Features\n\n- Create headings, paragraphs, links, blockquotes, inline-code, code blocks, and lists\n- Name and save the document to access again later\n- Choose between Light or Dark mode depending on your preference\n\n> This is an example of a blockquote. If you would like to learn more about markdown syntax, you can visit this [markdown cheatsheet](https://www.markdownguide.org/cheat-sheet/).\n\n#### Headings\n\nTo create a heading, add the hash sign (#) before the heading. The number of number signs you use should correspond to the heading level. You'll see in this guide that we've used all six heading levels (not necessarily in the correct way you should use headings!) to illustrate how they should look.\n\n##### Lists\n\nYou can see examples of ordered and unordered lists above.\n\n###### Code Blocks\n\nThis markdown editor allows for inline-code snippets, like this: `<p>I'm inline</p>`. It also allows for larger code blocks like this:\n\n```\n<main>\n  <h1>This is a larger code block</h1>\n</main>\n```",
      createdAt: `${date} ${month} ${year}`,
      timeStamp: Math.floor(new Date().getTime() / 1000).toString(),
      isSelected: false,
    };
    setNewFiles([newDoc, ...files]);
  }

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

  function saveChangedName() {
    if (inputRef.current !== null) {
      const newName = inputRef.current?.value;
      const newArr = [...files];
      const targetFile = newArr.find((file) => file.isSelected);
      if (targetFile) targetFile.name = newName;
      setCurFile({ ...curFile, name: newName });
      setNewFiles(newArr);
    }
  }

  function changeMarkdownVal(e: React.ChangeEvent<HTMLTextAreaElement>) {
    console.log(e.target.value);
  }

  return (
    <div className={`root-container ${menuStatus ? 'is-active' : ''}`}>
      <SideBar
        isMenuOpen={menuStatus}
        files={files}
        changeCurFile={changeCurFile}
        addNewDocument={AddNewDocument}
      />
      <MainContent
        curFile={curFile}
        isMenuOpen={menuStatus}
        fileQuantity={files.length}
        inputRef={inputRef}
        markdownVal={markdownVal}
        onChangeMenuStatus={changeMenuStatus}
        onChangeDialogStatus={changeDialogStatus}
        saveChangedName={saveChangedName}
        changeMarkdownVal={changeMarkdownVal}
      />
      <Dialog
        name={curFile.name}
        timeStamp={curFile.timeStamp}
        isOpenDialog={isOpenDialog}
        changeDialogStatus={changeDialogStatus}
        deleteCurFile={deleteCurFile}
      />
    </div>
  );
}

export default MarkdownEditor;
