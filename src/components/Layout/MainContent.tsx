import { RefObject, useState } from 'react';
import Markdown from '../Markdown/Markdown';
import Header from './Header';
import GrayHeader from '../UI/GrayHeader';
import Preview from '../Preview/Preview';
import FullPagePreview from '../Preview/FullPagePreview';
import Document from '../../helpers/Interface';
import { useCustomState } from '../../Hooks/useCustomState';
import '../../scss/MainContent.scss';

interface Props {
  curFile: Document;
  fileQuantity: number;
  inputRef: RefObject<HTMLInputElement>;
  dispatch: React.Dispatch<any>;
}

function MainContent({ curFile, fileQuantity, inputRef, dispatch }: Props) {
  const [isMarkdownOpen, setIsMarkdown] = useState(true);
  const [isOnePagePreviewOpen, setOnePagePreview] = useState(false);
  const { menu } = useCustomState();
  const mql = window.matchMedia('(max-width: 480px)');

  function changeMarkdownStatus() {
    setIsMarkdown(!isMarkdownOpen);
  }

  function changeOnePagePreviewStatus() {
    setOnePagePreview(!isOnePagePreviewOpen);
  }

  return (
    <main className={`main-content ${menu ? 'is-active' : ''}`}>
      <Header
        name={curFile.name}
        isSelected={curFile.isSelected}
        fileQuantity={fileQuantity}
        inputRef={inputRef}
        dispatch={dispatch}
      />
      {isMarkdownOpen ? (
        <GrayHeader
          text='MARKDOWN'
          icon='icon-show-preview'
          onChangeMarkdownStatus={changeMarkdownStatus}
        />
      ) : (
        <GrayHeader
          text='PREVIEW'
          icon='icon-hide-preview'
          onChangeMarkdownStatus={changeMarkdownStatus}
        />
      )}
      {!mql.matches ? (
        <GrayHeader
          text='PREVIEW'
          icon='icon-show-preview'
          changeOnePagePreviewStatus={changeOnePagePreviewStatus}
        />
      ) : (
        ''
      )}
      <Markdown
        content={curFile.content}
        isMarkdownOpen={isMarkdownOpen}
        dispatch={dispatch}
      />
      <Preview content={curFile.content} isMarkdownOpen={isMarkdownOpen} />

      {isOnePagePreviewOpen && (
        <FullPagePreview
          content={curFile.content}
          changeOnePagePreviewStatus={changeOnePagePreviewStatus}
        />
      )}
    </main>
  );
}

export default MainContent;
