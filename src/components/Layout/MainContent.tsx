import Markdown from '../UI/Markdown';
import Header from './Header';
import '../../scss/MainContent.scss';
import Preview from '../UI/Preview';
import { useState } from 'react';

interface File {
  name: string;
  timeStamp: string;
  content: string;
  isSelected: boolean;
}

interface Props {
  curFile: File;
  isMenuOpen: boolean;
  fileQuantity: number;
  onChangeMenuStatus: () => void;
  onChangeDialogStatus: () => void;
}

function MainContent({
  curFile,
  isMenuOpen,
  fileQuantity,
  onChangeMenuStatus,
  onChangeDialogStatus,
}: Props) {
  const [isMarkdown, setIsMarkdown] = useState(true);

  function changeMarkdownStatus() {
    setIsMarkdown(!isMarkdown);
  }

  return (
    <main className={`main-content ${isMenuOpen ? 'is-active' : ''}`}>
      <Header
        name={curFile.name}
        timeStamp={curFile.timeStamp}
        isSelected={curFile.isSelected}
        isMenuOpen={isMenuOpen}
        fileQuantity={fileQuantity}
        onChangeMenuStatus={onChangeMenuStatus}
        onChangeDialogStatus={onChangeDialogStatus}
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
