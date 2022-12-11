import {} from './months';

function convertToOrderedList(arr: string[]) {
  const isOrderedList = /^[0-9].\s+/;

  const result = arr.reduce((accu: string[], cur: string) => {
    if (isOrderedList.test(cur) && isOrderedList.test(accu.slice(-1)[0])) {
      return [...accu.slice(0, accu.length - 1), `${accu.slice(-1)[0]},${cur}`];
    } else {
      return [...accu, cur];
    }
  }, []);

  return result;
}

function convertToUnOrderedList(arr: string[]) {
  const isUnOrderedList = /^-\s+/;

  const result = arr.reduce((accu: string[], cur: string) => {
    if (isUnOrderedList.test(cur) && isUnOrderedList.test(accu.slice(-1)[0])) {
      return [...accu.slice(0, accu.length - 1), `${accu.slice(-1)[0]},${cur}`];
    } else {
      return [...accu, cur];
    }
  }, []);

  return result;
}

function ConvertMarkdownToPreview(content: string) {
  const isHeadingText = /^\#+\s+\w+/;

  const isBlockQuote = /^>\s+/;
  const isHyperLink = /\[\w+\s*\w+\]\(https:\/\/.+\)/;
  const isInlineCode = /\`[^\`].+\`/;
  const removePTag = /[^<\/*p>]+/g;

  const markdownTemplate = content
    .split('\n')
    .reduce((accu: string[], el: string) => {
      let temp = el ? `<p>${el}</p>` : '';

      if (isHeadingText.test(el)) {
        const regexForHashtag = /\#+/g;
        const tagNumber = el.match(regexForHashtag)![0].length;

        temp = `<h${tagNumber}>${el
          .replaceAll('#', '')
          .trim()}</h${tagNumber}>`;
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
        const [str] = el.match(isInlineCode)!;
        const [str2] = str.match(regex)!;
        const tempp = `<code>${str2}</code>`;
        temp = el.replace(isInlineCode, '');
      }

      return [...accu, temp];
    }, [])
    .join('');

  const firstArr = content.split('\n').map((el) => el);
  const secondArr = convertToOrderedList(firstArr);
  const thirdArr = convertToUnOrderedList(secondArr);
  console.log(thirdArr);
  return markdownTemplate;
}

export default ConvertMarkdownToPreview;
