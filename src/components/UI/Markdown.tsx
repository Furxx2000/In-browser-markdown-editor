import { useRef } from 'react';
import '../../scss/Markdown.scss';

interface Props {
  content: string;
  isMarkdownOpen: boolean;
  onChangeMarkdownContent: (value: string) => void;
}

function Markdown({ content, isMarkdownOpen, onChangeMarkdownContent }: Props) {
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
    <section className={`markdown ${isMarkdownOpen ? 'open' : ''} `}>
      <textarea
        id='editor'
        className='markdown-content ff-roboto-mono fs-250'
        ref={textAreaRef}
        value={content}
        onChange={(e) => onChangeMarkdownContent(e.target.value)}
        onKeyDown={(e) => getIndentWhenPressingTab(e)}
      ></textarea>
    </section>
  );
}

export default Markdown;
