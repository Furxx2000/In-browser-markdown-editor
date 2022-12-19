import { RefObject, useState } from 'react';
import Markdown from '../Markdown/Markdown';
import Header from './Header';
import GrayHeader from '../UI/GrayHeader';
import Preview from '../Preview/Preview';
import FullPagePreview from '../Preview/FullPagePreview';
import Document from '../../helpers/Interface';
import '../../scss/MainContent.scss';

interface Props {
  curFile: Document;
  isMenuOpen: boolean;
  fileQuantity: number;
  inputRef: RefObject<HTMLInputElement>;
  isDarkMode: boolean;
  onChangeMenuStatus: () => void;
  onChangeDialogStatus: () => void;
  saveChange: () => void;
  changeMarkdownContent: (value: string) => void;
}

function MainContent({
  curFile,
  isMenuOpen,
  fileQuantity,
  inputRef,
  isDarkMode,
  onChangeMenuStatus,
  onChangeDialogStatus,
  saveChange,
  changeMarkdownContent,
}: Props) {
  const [isMarkdownOpen, setIsMarkdown] = useState(true);
  const [isOnePagePreviewOpen, setOnePagePreview] = useState(false);
  const mql = window.matchMedia('(max-width: 480px)');

  function changeMarkdownStatus() {
    setIsMarkdown(!isMarkdownOpen);
  }

  function changeOnePagePreviewStatus() {
    setOnePagePreview(!isOnePagePreviewOpen);
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
        saveChange={saveChange}
      />
      {isMarkdownOpen ? (
        <GrayHeader
          text='MARKDOWN'
          icon='icon-show-preview'
          isDarkMode={isDarkMode}
          onChangeMarkdownStatus={changeMarkdownStatus}
        />
      ) : (
        <GrayHeader
          text='PREVIEW'
          icon='icon-hide-preview'
          isDarkMode={isDarkMode}
          onChangeMarkdownStatus={changeMarkdownStatus}
        />
      )}
      {!mql.matches ? (
        <GrayHeader
          text='PREVIEW'
          icon='icon-show-preview'
          isDarkMode={isDarkMode}
          changeOnePagePreviewStatus={changeOnePagePreviewStatus}
        />
      ) : (
        ''
      )}
      <Markdown
        content={curFile.content}
        isMarkdownOpen={isMarkdownOpen}
        onChangeMarkdownContent={changeMarkdownContent}
      />
      <Preview content={curFile.content} isMarkdownOpen={isMarkdownOpen} />

      {isOnePagePreviewOpen && (
        <FullPagePreview
          content={curFile.content}
          isDarkMode={isDarkMode}
          changeOnePagePreviewStatus={changeOnePagePreviewStatus}
        />
      )}
    </main>
  );
}

export default MainContent;
