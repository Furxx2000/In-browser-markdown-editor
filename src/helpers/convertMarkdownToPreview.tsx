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

function convertInlineCode(arr: string[]) {
  const inlineCodeArr = arr.map((el) => {
    if (InlineCodeRegex.test(el)) {
      const matchedArr = el.match(InlineCodeRegex)!;
      console.log(matchedArr);
      const newTempArr = matchedArr.map((text) => {
        const textContent = text
          .replaceAll('`', '')
          .replaceAll('<', '&lt;')
          .replaceAll('>', '&gt;');
        const textTemp = `<code>${textContent}</code>`;
        return textTemp;
      });

      newTempArr.forEach((temp) => {
        el = el.replace(/(\`[^`]+\`)/, temp);
      });
      return el;
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
      const matchedArr = el.match(BoldTextRegex)!;
      const newTempArr = matchedArr.map((text) => {
        const textContent = text.replaceAll('*', '');
        const textTemp = `<strong>${textContent}</strong>`;
        return textTemp;
      });
      newTempArr.forEach((temp) => {
        el = el.replace(/(\*\*[^*]+\*\*)/, temp);
      });
      return el;
    }
    return el;
  });
  return boldTextArr;
}

function convertHyperLink(arr: string[]) {
  const hyperLinkArr = arr.map((el) => {
    if (HyperLinkRegex.test(el)) {
      const matchedArr = el.match(HyperLinkRegex)!;
      const newTempArr = matchedArr.map((text) => {
        const [textContent, url] = text.match(HyperLinkRegex2)!;
        const linkTemp = `<a href='${url}' target='_blank'>${textContent}</a>`;
        return linkTemp;
      });
      newTempArr.forEach((temp) => {
        el = el.replace(/(\[.+?\]\(https:\/\/.+?\))/, temp);
      });
      return el;
    }
    return el;
  });
  return hyperLinkArr;
}

function convertItalicText(arr: string[]) {
  const italicTextArr = arr.map((el) => {
    if (ItalicTextRegex.test(el)) {
      const matchedArr = el.match(ItalicTextRegex)!;
      const newTempArr = matchedArr.map((text) => {
        const textContent = text.replaceAll('_', '');
        const textTemp = `<i>${textContent}</i>`;
        return textTemp;
      });
      newTempArr.forEach((temp) => {
        el = el.replace(/(\_[^_]+\_)/, temp);
      });
      return el;
    }
    return el;
  });
  return italicTextArr;
}

function convertDeleteText(arr: string[]) {
  const deleteTextArr = arr.map((el) => {
    if (DelTextRegex.test(el)) {
      const matchedArr = el.match(DelTextRegex)!;
      const newTempArr = matchedArr.map((text) => {
        const textContent = text.replaceAll('~~', '');
        const textTemp = `<del>${textContent}</del>`;
        return textTemp;
      });
      newTempArr.forEach((temp) => {
        el = el.replace(/(\~\~[^~]+\~\~)/, temp);
      });
      return el;
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
  const convertedArr = convertArr
    .reduce(
      (accumulator: string[], curFunc) =>
        curFunc(accumulator.length > 0 ? accumulator : textArr),
      []
    )
    .join('');
  return convertedArr;
}

export default ConvertMarkdownToPreview;
