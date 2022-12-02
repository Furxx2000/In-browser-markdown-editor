import Markdown from '../UI/Markdown';
import Header from './Header';
import '../../scss/MainContent.scss';
import Preview from '../UI/Preview';
import React, { RefObject, useState } from 'react';

interface File {
  name: string;
  content: string;
  isSelected: boolean;
}

interface Props {
  curFile: File;
  isMenuOpen: boolean;
  fileQuantity: number;
  inputRef: RefObject<HTMLInputElement>;
  markdownVal: string;
  onChangeMenuStatus: () => void;
  onChangeDialogStatus: () => void;
  saveChangedName: () => void;
  changeMarkdownVal: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

function MainContent({
  curFile,
  isMenuOpen,
  fileQuantity,
  inputRef,
  markdownVal,
  onChangeMenuStatus,
  onChangeDialogStatus,
  saveChangedName,
  changeMarkdownVal,
}: Props) {
  const [isMarkdown, setIsMarkdown] = useState(true);

  function changeMarkdownStatus() {
    setIsMarkdown(!isMarkdown);
  }

  return (
    <main className={`main-content ${isMenuOpen ? 'is-active' : ''}`}>
      <Header
        name={curFile.name}
        isSelected={curFile.isSelected}
        isMenuOpen={isMenuOpen}
        fileQuantity={fileQuantity}
        inputRef={inputRef}
        onChangeMenuStatus={onChangeMenuStatus}
        onChangeDialogStatus={onChangeDialogStatus}
        saveChangedName={saveChangedName}
      />
      {isMarkdown ? (
        <Markdown
          content={curFile.content}
          markdownVal={markdownVal}
          onChangeMarkdownStatus={changeMarkdownStatus}
          changeMarkdownVal={changeMarkdownVal}
        />
      ) : (
        <Preview
          content={curFile.content}
          onChangeMarkdownStatus={changeMarkdownStatus}
        />
      )}
    </main>
  );
}

export default MainContent;
