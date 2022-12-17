import { RefObject, useState } from 'react';
import Markdown from '../UI/Markdown';
import Header from './Header';
import GrayHeader from '../UI/GrayHeader';
import Preview from '../UI/Preview';
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
  saveChangedName: () => void;
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
  saveChangedName,
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
        saveChangedName={saveChangedName}
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

      {isOnePagePreviewOpen ? (
        <div className='one-page-preview'>
          <GrayHeader
            text='PREVIEW'
            icon='icon-hide-preview'
            isDarkMode={isDarkMode}
            changeOnePagePreviewStatus={changeOnePagePreviewStatus}
          />
          <div className='one-page-preview-content'>
            <Preview content={curFile.content} />
          </div>
        </div>
      ) : (
        ''
      )}
    </main>
  );
}

export default MainContent;
