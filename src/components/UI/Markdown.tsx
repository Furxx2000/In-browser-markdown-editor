import { useEffect, useState } from 'react';
import '../../scss/Markdown.scss';
import GrayHeader from './GrayHeader';

interface Props {
  content: string;
  isDarkMode: boolean;
  onChangeMarkdownStatus: () => void;
}

function Markdown({ content, isDarkMode, onChangeMarkdownStatus }: Props) {
  const [htmlContent, setHtmlContent] = useState('');

  useEffect(() => {
    const markdownTemplate = content
      .split('\n\n')
      .map((el) => {
        return `<div>${el}</div>`;
      })
      .join(' ');
    setHtmlContent(markdownTemplate);
  }, [content]);

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
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      ></pre>
    </section>
  );
}

export default Markdown;
