import '../../scss/Markdown.scss';
import SvgIcon from './SvgIcon';

function Markdown() {
  const grayColor = '#7C8187';
  return (
    <section className='markdown'>
      <div className='markdown-header fs-250 fw-medium letter-spacing-1 text-gray-2 bg-white-1 flex'>
        MARKDOWN
        <SvgIcon name='icon-show-preview' color={grayColor} />
      </div>
      <textarea id='markdown' name='markdown'></textarea>
    </section>
  );
}

export default Markdown;
