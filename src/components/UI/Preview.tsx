import '../../scss/Preview.scss';
import { useEffect, useState } from 'react';
import ConvertMarkdownToPreview from '../../helpers/ConvertMarkdownToPreview';

interface Props {
  content: string;
  isDarkMode: boolean;
  isMarkdownOpen?: boolean;
}

function Preview({ content, isDarkMode, isMarkdownOpen }: Props) {
  const [htmlContent, setHtmlContent] = useState('');
  const mql = window.matchMedia('(max-width: 480px)');

  useEffect(() => {
    const temp = ConvertMarkdownToPreview(content);
    setHtmlContent(temp);
  }, [content]);

  return (
    <section
      className={`preview ${isMarkdownOpen && mql.matches ? '' : 'open'}`}
    >
      <div
        id='preview'
        className={`preview-content grid ff-roboto-slab text-gray-${
          isDarkMode ? '3' : '2'
        } fs-250 ${isDarkMode ? 'dark-mode' : ''}`}
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      ></div>
    </section>
  );
}

export default Preview;
