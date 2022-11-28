import { useEffect, useState } from 'react';
import '../../scss/Markdown.scss';
import SvgIcon from './SvgIcon';

interface Content {
  content: string;
}

function Markdown(props: Content) {
  const grayColor = '#7C8187';
  const [markdown, setMarkdown] = useState(props.content);

  useEffect(() => {
    setMarkdown(props.content);
  }, [props.content]);

  function handleMarkdownValue(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setMarkdown(e.target.value);
  }

  return (
    <section className='markdown'>
      <div className='markdown-header fs-250 fw-medium letter-spacing-1 text-gray-2 bg-white-1 flex'>
        MARKDOWN
        <SvgIcon name='icon-show-preview' color={grayColor} />
      </div>
      <textarea
        id='markdown'
        className='ff-roboto-mono fs-250 text-dark-4'
        name='markdown'
        value={markdown}
        onChange={handleMarkdownValue}
      ></textarea>
    </section>
  );
}

export default Markdown;
