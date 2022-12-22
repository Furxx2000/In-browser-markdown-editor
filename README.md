# Frontend Mentor - In-browser markdown editor solution

This is a solution to the [In-browser markdown editor challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/inbrowser-markdown-editor-r16TrrQX9). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- Create, Read, Update, and Delete markdown documents
- Name and save documents to be accessed as needed
- Edit the markdown of a document and see the formatted preview of the content
- View a full-page preview of the formatted content
- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- **Bonus**: If you're building a purely front-end project, use localStorage to save the current state in the browser that persists when the browser is refreshed
- **Bonus**: Build this project as a full-stack application

### Screenshot

![Light mode](./src/assets/Light%20mode.png)
![Dark mode](./src//assets/Dark%20mode.png)

### Links

- Solution URL: [Add solution URL here](https://github.com/Furxx2000/In-browser-markdown-editor)
- Live Site URL: [Add live site URL here](https://furxx2000.github.io/In-browser-markdown-editor/)

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- [Vite](https://vitejs.dev/) - Build tool
- [React](https://reactjs.org/) - JS library
- [TypeScript](https://www.typescriptlang.org/) - Strongly typed JavaScript
- [SCSS](https://sass-lang.com/) - For styles

### What I learned

- Custom Hook -
  At first I write all useState code in "MarkdownEditor" this component, the file becomes really big and long,
  after finding ways to create custom hook, I separate all the states into individual hooks:

  useDarkMode
  useDialog
  useFile
  etc....

  So I can reuse these state in any components, super convenient!

- Add static asset -
  When I deploy this project on github pages I found a problem,
  in development I can easily fetch the JSON data for first load, but in published site it doesn't work since there is no such path in bundled file.
  After checking documentation on Vite, there is a way called "Explicit URL Imports".

  The default import for JSONdata in useFiles hook is like:

  ```js
  import JSONdata from '../../data/data.json';
  ```

  then I turned this to:

  ```js
  import JSONdata from '../../data/data.json?url';
  ```

  The problem was fixed! User can get default data when first load now.

- Dark mode -
  This time I implement this by using modern css selector :has().

  ```css
  @mixin darkMode {
    html:has(.dark-mode) & {
      @content;
    }
  }
  ```

  Now when I add .dark-mode class on body, the has selector detect .dark-mode class name has exist, then trigger dark mode styling.

  ```css
  @include tablet {
    padding-top: 1rem;
    height: calc(100vh - 114px);
  }
  @include darkMode {
    color: var(--clr-gray-3);
  }
  ```

- Regex -
  Honestly I used to be a little bit afraid of using Regex, After this project I become more confident with it.
  For parsing plain text to HTML tag, I create a Regex.tsx file to handle all the expression:

  ````js
  const HeadingRegex = /^\#+/;
  const OrderedListRegex = /^[0-9].\s+/;
  const UnOrderedListRegex = /^-\s+/;
  const BlockquoteRegex = /^>\s+/;
  const paragraphRegex = /^\w/;
  const HyperLinkRegex = /(\[.+?\]\(https:\/\/.+?\))/g;
  const HyperLinkRegex2 = /https:\/\/.+[^\)$]|[\w\s]+/g;
  const InlineCodeRegex = /(\`[^`]+\`)/g;
  const CodeBlockRegex = /^[```].+[```$]/g;
  const BoldTextRegex = /(\*\*[^*]+\*\*)/g;
  const ItalicTextRegex = /(\_[^_]+\_)/g;
  const DelTextRegex = /(\~\~[^~]+\~\~)/g;
  ````

  Really happy to learn something new and overcome it!

- Parse plain text to HTML tag -
  This is the most difficult part of this project. Paring ordered, unordered list and code block are the most difficult
  part, so I use the powerful reduce array function to achieve it.
  I did't use reduce much in other projects, but this time I am much familiar with it, really happy to make parsing HTML flow smooth!

  Parse list:

  ```js
  function groupListsIntoString(arr: string[], regex: RegExp) {
    const result = arr.reduce((accu: string[], cur: string) => {
      if (regex.test(cur) && regex.test(accu.slice(-1)[0])) {
        return [
          ...accu.slice(0, accu.length - 1),
          `${accu.slice(-1)[0]}|${cur}`,
        ];
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
  ```

  Parse code block:

  ```js
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
  ```

  - useContext - I followed react doc's recommendation using top-down(parent to child) data flow via props,
    but many components need certain types of props like UI theme, so passing props becomes a cumbersome task.
    Then I found useContext and follow the docs and clips on freecodecamp to rebuild the data flow, makes it global.
    Now it looks cleaner!

### Continued development

For this project:

- Export function - The next step is making this app really help someone who wants the export file.

For next project:

- CSS - This time I use SCSS for styling, in the next project I'll use Tailwind because utility class is awesome, can't wait to try it!

### Useful resources

- [Dillinger Markdown](https://dillinger.io/) - This helped me for understanding behavior of markdown editor, and got reference for HTML structure, how to fixed header when the menu is open, learn a lot by Dillinger.
- [React doc](https://reactjs.org/docs/getting-started.html) - Since this is the second time I use react to build project, documentation really helps me a lot to understand some basic concept of react.

## Author

- Website - [Danny]()
- Frontend Mentor - [@Furxx2000](https://www.frontendmentor.io/profile/Furxx2000)
- Twitter - [@Furxx2000](https://www.twitter.com/Furxx2000)
