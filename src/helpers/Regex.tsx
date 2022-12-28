import {} from './months';

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

export {
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
};
