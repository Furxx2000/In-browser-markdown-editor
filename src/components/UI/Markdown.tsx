import { useEffect, useState } from 'react';
import '../../scss/Markdown.scss';
import GrayHeader from './GrayHeader';

interface Props {
  content: string;
  onChangeMarkdownStatus: () => void;
}

function Markdown({ content, onChangeMarkdownStatus }: Props) {
  const [markdown, setMarkdown] = useState(content);

  useEffect(() => {
    setMarkdown(content);
  }, [content]);

  function handleMarkdownValue(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setMarkdown(e.target.value);
  }

  return (
    <section className='markdown'>
      <GrayHeader
        text='MARKDOWN'
        icon='icon-show-preview'
        onChangeMarkdownStatus={onChangeMarkdownStatus}
      />
      <textarea
        id='markdown'
        className='markdown-content ff-roboto-mono fs-250 text-dark-4'
        name='markdown'
        value={markdown}
        onChange={handleMarkdownValue}
      ></textarea>
    </section>
  );
}

export default Markdown;
