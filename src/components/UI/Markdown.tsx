import { useRef } from 'react';
import '../../scss/Markdown.scss';

interface Props {
  content: string;
  isDarkMode: boolean;
  isMarkdownOpen: boolean;
  onChangeMarkdownContent: (value: string) => void;
}

function Markdown({
  content,
  isDarkMode,
  isMarkdownOpen,
  onChangeMarkdownContent,
}: Props) {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const mql = window.matchMedia('(max-width: 480px)');

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
    <section
      className={`markdown ${isMarkdownOpen ? 'open' : ''} ${
        isDarkMode ? 'dark-mode' : ''
      }`}
    >
      <textarea
        id='editor'
        className={`markdown-content ff-roboto-mono fs-250 text-${
          isDarkMode ? 'gray-3' : 'dark-4'
        }`}
        ref={textAreaRef}
        value={content}
        onChange={(e) => onChangeMarkdownContent(e.target.value)}
        onKeyDown={(e) => getIndentWhenPressingTab(e)}
      ></textarea>
    </section>
  );
}

export default Markdown;
