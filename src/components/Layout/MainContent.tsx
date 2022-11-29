import Markdown from '../UI/Markdown';
import Header from './Header';
import '../../scss/MainContent.scss';
import Preview from '../UI/Preview';
import { useState } from 'react';

interface File {
  name: string;
  createdAt: string;
  content: string;
  isSelected: boolean;
}

interface Props {
  curFile: File;
  isMenuOpen: boolean;
  onChangeMenuStatus: () => void;
}

function MainContent({ curFile, isMenuOpen, onChangeMenuStatus }: Props) {
  const [isMarkdown, setIsMarkdown] = useState(true);

  function changeMarkdownStatus() {
    setIsMarkdown(!isMarkdown);
  }

  return (
    <main className={`main-content ${isMenuOpen ? 'is-active' : ''}`}>
      <Header
        name={curFile.name}
        createdAt={curFile.createdAt}
        isSelected={curFile.isSelected}
        isMenuOpen={isMenuOpen}
        onChangeMenuStatus={onChangeMenuStatus}
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
