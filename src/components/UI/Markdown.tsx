import { useRef } from 'react';
import '../../scss/Markdown.scss';
import GrayHeader from './GrayHeader';

interface Props {
  content: string;
  isDarkMode: boolean;
  onChangeMarkdownStatus: () => void;
  onChangeMarkdownContent: (value: string) => void;
}

function Markdown({
  content,
  isDarkMode,
  onChangeMarkdownStatus,
  onChangeMarkdownContent,
}: Props) {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  function getIndentWhenPressingTab(
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ) {
    if (e.code === 'Tab') {
      e.preventDefault();

      textAreaRef.current?.setRangeText(
        '  ',
        textAreaRef.current.selectionStart,
        textAreaRef.current.selectionStart,
        'end'
      );
    }
  }

  return (
    <section className='markdown'>
      <GrayHeader
        text='MARKDOWN'
        icon='icon-show-preview'
        isDarkMode={isDarkMode}
        onChangeMarkdownStatus={onChangeMarkdownStatus}
      />
      <textarea
        className={`markdown-content ff-roboto-mono fs-250 text-${
          isDarkMode ? 'gray-3' : 'dark-4'
        } ${isDarkMode ? 'bg-dark-1' : ''}`}
        ref={textAreaRef}
        value={content}
        onChange={(e) => onChangeMarkdownContent(e.target.value)}
        onKeyDown={(e) => getIndentWhenPressingTab(e)}
      ></textarea>
    </section>
  );
}

export default Markdown;
