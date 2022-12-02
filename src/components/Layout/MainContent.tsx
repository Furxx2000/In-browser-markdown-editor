import Markdown from '../UI/Markdown';
import Header from './Header';
import '../../scss/MainContent.scss';
import Preview from '../UI/Preview';
import { RefObject, useState } from 'react';

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
  onChangeMenuStatus: () => void;
  onChangeDialogStatus: () => void;
  saveChangedName: () => void;
}

function MainContent({
  curFile,
  isMenuOpen,
  fileQuantity,
  inputRef,
  onChangeMenuStatus,
  onChangeDialogStatus,
  saveChangedName,
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
          onChangeMarkdownStatus={changeMarkdownStatus}
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
