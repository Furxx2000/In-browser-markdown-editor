import {} from './months';

const HeadingRegex = /^\#+/;
const OrderedListRegex = /^[0-9].\s+/;
const UnOrderedListRegex = /^-\s+/;
const BlockquoteRegex = /^>\s+/;
const paragraphRegex = /^\w/;
const HyperLinkRegex = /\[.+\]\(https:\/\/.+\)/;
const HyperLinkRegex2 = /https:\/\/.+[^\)$]|[\w\s]+/g;
const InlineCodeRegex = /\`[^\`.]+\`/g;
const CodeBlockRegex = /^[```].+[```$]/g;
const BoldTextRegex = /[\*\*].+[\*\*$]/;
const ItalicTextRegex = /[\_].+[\_$]/;
const DelTextRegex = /[\~\~].+[\~\~$]/;

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
