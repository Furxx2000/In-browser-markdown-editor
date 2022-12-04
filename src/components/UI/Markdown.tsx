import { useEffect } from 'react';
import '../../scss/Markdown.scss';
import GrayHeader from './GrayHeader';

interface Props {
  content: string;
  isDarkMode: boolean;
  onChangeMarkdownStatus: () => void;
}

function Markdown({ content, isDarkMode, onChangeMarkdownStatus }: Props) {
  useEffect(() => {}, [content]);

  return (
    <section className='markdown'>
      <GrayHeader
        text='MARKDOWN'
        icon='icon-show-preview'
        isDarkMode={isDarkMode}
        onChangeMarkdownStatus={onChangeMarkdownStatus}
      />
      <pre
        className={`markdown-content ff-roboto-mono fs-250 text-${
          isDarkMode ? 'gray-3' : 'dark-4'
        } ${isDarkMode ? 'bg-dark-1' : ''}`}
      >
        {content}
      </pre>
    </section>
  );
}

export default Markdown;
