import '../../scss/Markdown.scss';
import GrayHeader from './GrayHeader';

interface Props {
  content: string;
  isDarkMode: boolean;
  onChangeMarkdownStatus: () => void;
  onChangeMarkdownContent: (value: string) => void;
}

function Markdown({
  content,
  isDarkMode,
  onChangeMarkdownStatus,
  onChangeMarkdownContent,
}: Props) {
  return (
    <section className='markdown'>
      <GrayHeader
        text='MARKDOWN'
        icon='icon-show-preview'
        isDarkMode={isDarkMode}
        onChangeMarkdownStatus={onChangeMarkdownStatus}
      />
      <textarea
        className={`markdown-content ff-roboto-mono fs-250 text-${
          isDarkMode ? 'gray-3' : 'dark-4'
        } ${isDarkMode ? 'bg-dark-1' : ''}`}
        value={content}
        onChange={(e) => onChangeMarkdownContent(e.target.value)}
      ></textarea>
    </section>
  );
}

export default Markdown;
