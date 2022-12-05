import '../../scss/Preview.scss';
import GrayHeader from './GrayHeader';
import { useEffect, useState } from 'react';

interface Props {
  content: string;
  isDarkMode: boolean;
  onChangeMarkdownStatus: () => void;
}

function Preview({ content, isDarkMode, onChangeMarkdownStatus }: Props) {
  const [htmlContent, setHtmlContent] = useState('');

  useEffect(() => {
    const isHeadingText = /^#+\s+/g;
    const isOrderedList = /^[0-9].\s+/g;

    const markdownTemplate = content
      .split('\n\n')
      .map((el) => {
        if (isHeadingText.test(el)) {
          const regexForHashtag = /#+/g;
          const tagNumber = el.match(regexForHashtag)![0].length;

          return `<div class='preview-group'><h${tagNumber}>${el
            .replaceAll('#', '')
            .trim()}</h${tagNumber}></div>`;
        }

        if (isOrderedList.test(el)) {
          const listArr = el
            .split('\n')
            .map((f) => f.replaceAll(isOrderedList, ''));
          const orderedTemp = `
            <ol class='ff-roboto-slab text-gray-2 fs-250 flow'>
              ${listArr.map((el) => `<li>${el}</li>`)}
            </ol>
          `.replaceAll(',', '');
          return orderedTemp;
        }
        return `<div class="ff-roboto-slab text-gray-2 fs-250">${el}</div>`;
      })
      .join('\n');
    setHtmlContent(markdownTemplate);
  }, [content]);

  return (
    <section className='preview'>
      <GrayHeader
        icon='icon-hide-preview'
        text='PREVIEW'
        isDarkMode={isDarkMode}
        onChangeMarkdownStatus={onChangeMarkdownStatus}
      />
      <pre
        className={`preview-content ${isDarkMode ? 'bg-dark-1' : ''}`}
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      ></pre>
    </section>
  );
}

export default Preview;
