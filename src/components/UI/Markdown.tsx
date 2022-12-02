import React, { useEffect } from 'react';
import '../../scss/Markdown.scss';
import GrayHeader from './GrayHeader';

interface Props {
  content: string;
  markdownVal: string;
  onChangeMarkdownStatus: () => void;
  changeMarkdownVal: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

function Markdown({
  content,
  markdownVal,
  changeMarkdownVal,
  onChangeMarkdownStatus,
}: Props) {
  useEffect(() => {}, [content]);

  return (
    <section className='markdown'>
      <GrayHeader
        text='MARKDOWN'
        icon='icon-show-preview'
        onChangeMarkdownStatus={onChangeMarkdownStatus}
      />
      <textarea
        id='markdown'
        className='markdown-content ff-roboto-mono fs-250 text-dark-4'
        name='markdown'
        value={markdownVal}
        onChange={changeMarkdownVal}
      ></textarea>
    </section>
  );
}

export default Markdown;
