import {} from './months';
import {
  HeadingRegex,
  OrderedListRegex,
  UnOrderedListRegex,
  BlockquoteRegex,
  paragraphRegex,
  HyperLinkRegex,
  HyperLinkRegex2,
  InlineCodeRegex,
  CodeBlockRegex,
} from './Regex';

function groupListsIntoString(arr: string[], regex: any) {
  const result = arr.reduce((accu: string[], cur: string) => {
    if (regex.test(cur) && regex.test(accu.slice(-1)[0])) {
      return [...accu.slice(0, accu.length - 1), `${accu.slice(-1)[0]}|${cur}`];
    } else {
      return [...accu, cur];
    }
  }, []);
  return result;
}
function groupOrderedAndUnOrderedListsToString(arr: string[]) {
  const regexArr = [OrderedListRegex, UnOrderedListRegex];
  regexArr.forEach((regex) => {
    arr = groupListsIntoString(arr, regex);
  });
  return arr;
}

function convertHeading(arr: string[]) {
  const headingTextArr = arr.map((el) => {
    if (HeadingRegex.test(el)) {
      const [headingTag] = el.match(HeadingRegex)!;
      const headingContent = el.replace(HeadingRegex, '').trim();
      const headingTemp = `
        <h${headingTag.length}>${headingContent}</h${headingTag.length}>
      `.trim();
      return headingTemp;
    }
    return el;
  });
  return headingTextArr;
}

function convertList(el: string, regex: any) {
  const listArr = el.split('|').map((list) => list.replace(regex, ''));
  const listType = regex === OrderedListRegex ? 'ol' : 'ul';
  const listTemp = `<${listType} class='flow'>${listArr
    .map((list) => `<li>${list}</li>`)
    .join('')}</${listType}>`;
  return listTemp;
}

function convertLists(arr: string[]) {
  const listTextArr = arr.map((el) => {
    if (OrderedListRegex.test(el)) return convertList(el, OrderedListRegex);
    if (UnOrderedListRegex.test(el)) return convertList(el, UnOrderedListRegex);
    return el;
  });
  return listTextArr;
}

function convertBlockquote(arr: string[]) {
  const blockquoteArr = arr.map((el) => {
    if (BlockquoteRegex.test(el)) {
      const blockquoteContent = el.replace(BlockquoteRegex, '');
      const blockquoteTemp = `<div class='block-quote'><p>${blockquoteContent}</p></div>`;
      return blockquoteTemp;
    }
    return el;
  });
  return blockquoteArr;
}

function convertParagraph(arr: string[]) {
  const plainTextArr = arr.map((el) => {
    if (paragraphRegex.test(el)) {
      const paragraphTemp = `<p>${el}</p>`;
      return paragraphTemp;
    }
    return el;
  });
  return plainTextArr;
}

function convertHyperLink(arr: string[]) {
  const hyperLinkArr = arr.map((el) => {
    if (HyperLinkRegex.test(el)) {
      const [linkStr] = el.match(HyperLinkRegex)!;
      const [text, url] = linkStr.match(HyperLinkRegex2)!;
      const linkTemp = `<a href='${url}' target='_blank'>${text}</a>`;
      const newTemp = el.replace(HyperLinkRegex, linkTemp);
      return newTemp;
    }
    return el;
  });
  return hyperLinkArr;
}

function convertInlineCode(arr: string[]) {
  const inlineCodeArr = arr.map((el) => {
    if (InlineCodeRegex.test(el)) {
      const [inlineCodeStr] = el.match(InlineCodeRegex)!;
      const HTMLEntityStr = inlineCodeStr
        .replaceAll('`', '')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;');
      const inlineCodeTemp = `<code>${HTMLEntityStr}</code>`;
      const newTemp = el.replace(InlineCodeRegex, inlineCodeTemp);
      return newTemp;
    }
    return el;
  });
  return inlineCodeArr;
}

function ConvertMarkdownToPreview(content: string) {
  const textArr = content.split('\n').map((el) => el);
  const convertedArr = groupOrderedAndUnOrderedListsToString(textArr);
  const headingTextArr = convertHeading(convertedArr);
  const listTextArr = convertLists(headingTextArr);
  const blockquoteArr = convertBlockquote(listTextArr);
  const paragraphArr = convertParagraph(blockquoteArr);
  const hyperLinkArr = convertHyperLink(paragraphArr);
  const inlineCodeArr = convertInlineCode(hyperLinkArr);
  const codeBlockArr = convertCodeBlock(inlineCodeArr);

  function convertCodeBlock(arr: string[]) {
    let codeBlockStartsIndex = 0;
    let codeBlockEndIndex = 0;

    const codeBlockArr = arr.map((el, index) => {
      if (CodeBlockRegex.test(el)) {
        if (!codeBlockStartsIndex) codeBlockStartsIndex = index;
        else codeBlockEndIndex = index;
      }
      return el;
    });
    const codeBlockStr = codeBlockArr
      .slice(codeBlockStartsIndex + 1, codeBlockEndIndex)
      .join('\n')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;');
    const codeBlockTemp = `
      <pre><code>${codeBlockStr}</code></pre>
    `;
    console.log(`Start: ${codeBlockStartsIndex}`);
    console.log(`End: ${codeBlockEndIndex}`);
    console.log(codeBlockTemp);
    return codeBlockArr;
  }

  console.log(codeBlockArr);
  return codeBlockArr.join('');
}

export default ConvertMarkdownToPreview;
