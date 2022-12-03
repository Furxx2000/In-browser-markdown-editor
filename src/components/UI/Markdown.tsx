import { useEffect } from 'react';
import '../../scss/Markdown.scss';
import GrayHeader from './GrayHeader';

interface Props {
  content: string;
  onChangeMarkdownStatus: () => void;
}

function Markdown({ content, onChangeMarkdownStatus }: Props) {
  useEffect(() => {}, [content]);

  return (
    <section className='markdown'>
      <GrayHeader
        text='MARKDOWN'
        icon='icon-show-preview'
        onChangeMarkdownStatus={onChangeMarkdownStatus}
      />
      <pre className='markdown-content ff-roboto-mono fs-250 text-dark-4'>
        {content}
      </pre>
    </section>
  );
}

export default Markdown;
