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
  BoldTextRegex,
  ItalicTextRegex,
  DelTextRegex,
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

function convertCodeBlock(arr: string[]) {
  interface CodeBlockItem {
    codeBlockStart: number;
    codeBlockEnd: number;
  }

  let codeBlockGroup: CodeBlockItem[] = [];
  let codeBlockStartsIndex = -1;
  let codeBlockEndIndex = 0;

  const codeBlockArr = arr.map((el, index) => {
    if (CodeBlockRegex.test(el)) {
      if (codeBlockStartsIndex === -1) codeBlockStartsIndex = index;
      else {
        codeBlockEndIndex = index;
        const codeBlockItem = {
          codeBlockStart: codeBlockStartsIndex,
          codeBlockEnd: codeBlockEndIndex,
        };
        codeBlockGroup = [...codeBlockGroup, codeBlockItem];
        codeBlockStartsIndex = -1;
        codeBlockEndIndex = 0;
      }
    }
    return el;
  });

  if (codeBlockGroup.length > 0) {
    let gap = 0;
    codeBlockGroup.forEach(({ codeBlockStart, codeBlockEnd }) => {
      const codeBlockStr = codeBlockArr
        .slice(codeBlockStart - gap + 1, codeBlockEnd - gap)
        .join('\n')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;');
      const codeBlockTemp = `
    <pre><code>${codeBlockStr}</code></pre>
  `;
      const deleteItemNum = codeBlockEnd - codeBlockStart + 1;
      codeBlockArr.splice(codeBlockStart - gap, deleteItemNum, codeBlockTemp);
      gap += deleteItemNum - 1;
    });
    return codeBlockArr;
  }
  return codeBlockArr;
}

function convertBoldText(arr: string[]) {
  const boldTextArr = arr.map((el) => {
    if (BoldTextRegex.test(el)) {
      const [boldTextStr] = el.match(BoldTextRegex)!;
      const boldTextContent = boldTextStr.replaceAll('*', '');
      const boldTextTemp = `<strong>${boldTextContent}</strong>`;
      const newTemp = el.replace(BoldTextRegex, boldTextTemp);
      return newTemp;
    }
    return el;
  });
  return boldTextArr;
}

function convertItalicText(arr: string[]) {
  const italicTextArr = arr.map((el) => {
    if (ItalicTextRegex.test(el)) {
      const [italicTextStr] = el.match(ItalicTextRegex)!;
      const italicTextContent = italicTextStr.replaceAll('_', '');
      const italicTextTemp = `<i>${italicTextContent}</i>`;
      const newTemp = el.replace(ItalicTextRegex, italicTextTemp);
      return newTemp;
    }
    return el;
  });
  return italicTextArr;
}

function convertDeleteText(arr: string[]) {
  const deleteTextArr = arr.map((el) => {
    if (DelTextRegex.test(el)) {
      const [delTextStr] = el.match(DelTextRegex)!;
      const delTextContent = delTextStr.replaceAll('~~', '');
      const delTextTemp = `<del>${delTextContent}</del>`;
      const newTemp = el.replace(DelTextRegex, delTextTemp);
      console.log(newTemp);
      return newTemp;
    }
    return el;
  });
  return deleteTextArr;
}

function ConvertMarkdownToPreview(content: string) {
  const textArr = content.split('\n').map((el) => el);
  const convertArr = [
    groupOrderedAndUnOrderedListsToString,
    convertHeading,
    convertLists,
    convertBlockquote,
    convertCodeBlock,
    convertHyperLink,
    convertInlineCode,
    convertBoldText,
    convertItalicText,
    convertDeleteText,
    convertParagraph,
  ];
  const convertedArr = convertArr.reduce(
    (accumulator: string[], curFunc) =>
      curFunc(accumulator.length > 0 ? accumulator : textArr),
    []
  );
  return convertedArr.join('');
}

export default ConvertMarkdownToPreview;
