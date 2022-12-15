import '../../scss/Preview.scss';
import GrayHeader from './GrayHeader';
import { useEffect, useState } from 'react';
import ConvertMarkdownToPreview from '../../helpers/ConvertMarkdownToPreview';

interface Props {
  content: string;
  isDarkMode: boolean;
  onChangeMarkdownStatus: () => void;
}

function Preview({ content, isDarkMode, onChangeMarkdownStatus }: Props) {
  const [htmlContent, setHtmlContent] = useState('');

  useEffect(() => {
    const temp = ConvertMarkdownToPreview(content);
    setHtmlContent(temp);
  }, [content]);

  return (
    <section className='preview'>
      <GrayHeader
        icon='icon-hide-preview'
        text='PREVIEW'
        isDarkMode={isDarkMode}
        onChangeMarkdownStatus={onChangeMarkdownStatus}
      />
      <div
        className={`preview-content grid ff-roboto-slab text-gray-${
          isDarkMode ? '3' : '2'
        } fs-250  ${isDarkMode ? 'bg-dark-1' : ''} ${
          isDarkMode ? 'dark-mode' : ''
        }`}
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      ></div>
    </section>
  );
}

export default Preview;
