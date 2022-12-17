import { useEffect, useState } from 'react';
import ConvertMarkdownToPreview from '../../helpers/ConvertMarkdownToPreview';
import '../../scss/Preview.scss';

interface Props {
  content: string;
  isMarkdownOpen?: boolean;
}

function Preview({ content, isMarkdownOpen }: Props) {
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
        className='preview-content grid ff-roboto-slab fs-250'
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      ></div>
    </section>
  );
}

export default Preview;
