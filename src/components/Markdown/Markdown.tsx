import { useCustomState } from '../../Hooks/useCustomState';
import { useFile } from '../../Hooks/useFiles';
import { useMemo, useRef } from 'react';
import '../../scss/Markdown.scss';

function Markdown() {
  const { curFile, dispatch } = useFile();
  const { markdown } = useCustomState();
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const content = useMemo(() => curFile.content, [curFile]);

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

  function handleChangeMarkdownContent(content: string) {
    dispatch({ type: 'changeMarkdown', payload: content });
  }

  return (
    <section className={`markdown ${markdown ? 'open' : ''} `}>
      <textarea
        id='editor'
        className='markdown-content ff-roboto-mono fs-250'
        ref={textAreaRef}
        value={content}
        onChange={(e) => handleChangeMarkdownContent(e.target.value)}
        onKeyDown={(e) => getIndentWhenPressingTab(e)}
      ></textarea>
    </section>
  );
}

export default Markdown;
