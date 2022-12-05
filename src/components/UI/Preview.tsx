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
    const isUnOrderedList = /^-\s+/g;
    const isBlockQuote = /^>\s+/g;
    const isHyperLink = /\[\w+\s*\w+\]\(https:\/\/.+\)/g;

    const markdownTemplate = content
      .split('\n\n')
      .map((el) => {
        if (isHeadingText.test(el)) {
          const regexForHashtag = /#+/g;
          const tagNumber = el.match(regexForHashtag)![0].length;

          return `<h${tagNumber}>${el
            .replaceAll('#', '')
            .trim()}</h${tagNumber}>`;
        }

        if (isOrderedList.test(el)) {
          const listArr = el
            .split('\n')
            .map((f) => f.replaceAll(isOrderedList, ''));
          const orderedTemp = `
          <ol class='flow'>
            ${listArr.map((el) => `<li>${el}</li>`)}
          </ol>
          `.replaceAll(',', '');
          return orderedTemp;
        }

        if (isUnOrderedList.test(el)) {
          const listArr = el
            .split('\n')
            .map((f) => f.replaceAll(isUnOrderedList, ''));
          const unOrderedTemp = `
            <ul class='flow'>
              ${listArr.map((a) => `<li>${a}</li>`)}
            </ul>
          `.replaceAll(',', '');
          return unOrderedTemp;
        }

        if (isBlockQuote.test(el)) {
          console.log(el.match(isHyperLink));
          const blockQuoteTemp = `
            <div class='block-quote'>
              <p>
                ${el.replace('>', '')}
              </p>
            </div>
          `;
          return blockQuoteTemp;
        }

        if (isHyperLink.test(el)) {
          console.log('Hi');
        }

        return `<p>${el}</p>`;
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
      <div
        className={`preview-content grid ff-roboto-slab text-gray-2 fs-250  ${
          isDarkMode ? 'bg-dark-1' : ''
        }`}
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      ></div>
    </section>
  );
}

export default Preview;
