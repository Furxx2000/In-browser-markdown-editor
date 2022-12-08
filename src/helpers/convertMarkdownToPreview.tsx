import {} from './months';

function ConvertMarkdownToPreview(content: string) {
  const isHeadingText = /^#+\s+/g;
  const isOrderedList = /^[0-9].\s+/g;
  const isUnOrderedList = /^-\s+/g;
  const isBlockQuote = /^>\s+/g;
  const isHyperLink = /\[\w+\s*\w+\]\(https:\/\/.+\)/g;
  const isInlineCode = /\`.+\`/g;

  const markdownTemplate = content
    .split('\n\n')
    .map((el) => {
      let temp = `<p>${el}</p>`;

      if (isHeadingText.test(el)) {
        const regexForHashtag = /#+/g;
        const tagNumber = el.match(regexForHashtag)![0].length;

        temp = `<h${tagNumber}>${el
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
        temp = orderedTemp;
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
        temp = unOrderedTemp;
      }

      if (isBlockQuote.test(el)) {
        const blockQuoteTemp = `
            <div class='block-quote'>
              <p>
                ${el.replace('>', '')}
              </p>
            </div>
          `;
        temp = blockQuoteTemp;
      }

      if (isHyperLink.test(el)) {
        const [str] = temp.match(isHyperLink)!;
        const regex = /\[\w+\s*\w+\]|\(https:\/\/.+\)/g;

        const [linkText, url] = str.match(regex)!;
        const textRegex = /\w+\s*\w+/g;

        const [linkTextTemp] = linkText.match(textRegex)!;
        const urlRegex = /https:\/\/.+[^\)$]/g;

        const [urlTemp] = url.match(urlRegex)!;
        const linkTemp = `<a href='${urlTemp}' target='_blank'>${linkTextTemp}</a>`;

        temp = temp.replace(isHyperLink, linkTemp);
      }

      if (isInlineCode.test(el)) {
        const regex = /[^\`].+[^\`$]/g;
      }

      return temp;
    })
    .join('\n');

  return markdownTemplate;
}

export default ConvertMarkdownToPreview;
