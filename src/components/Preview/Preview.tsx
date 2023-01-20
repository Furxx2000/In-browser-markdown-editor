import { useCustomState } from '../../Hooks/useCustomState';
import { useEffect, useMemo, useState } from 'react';
import { useFile } from '../../Hooks/useFiles';
import DOMPurify from 'dompurify';
import ConvertMarkdownToPreview from '../../helpers/ConvertMarkdownToPreview';
import '../../scss/Preview.scss';

function Preview() {
  const [htmlContent, setHtmlContent] = useState('');
  const { curFile } = useFile();
  const { markdown } = useCustomState();
  const mql = window.matchMedia('(max-width: 480px)');
  const content = useMemo(() => curFile.content, [curFile]);

  useEffect(() => {
    const temp = ConvertMarkdownToPreview(content);
    const purifiedHTML = DOMPurify.sanitize(temp, { FORCE_BODY: true });
    setHtmlContent(purifiedHTML);
  }, [content]);

  return (
    <section className={`preview ${markdown && mql.matches ? '' : 'open'}`}>
      <div
        id='preview'
        className='preview-content grid ff-roboto-slab fs-250'
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      ></div>
    </section>
  );
}

export default Preview;
