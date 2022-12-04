import '../../scss/Preview.scss';
import GrayHeader from './GrayHeader';

interface Props {
  content: string;
  isDarkMode: boolean;
  onChangeMarkdownStatus: () => void;
}

function Preview({ content, isDarkMode, onChangeMarkdownStatus }: Props) {
  return (
    <section className='preview'>
      <GrayHeader
        icon='icon-hide-preview'
        text='PREVIEW'
        isDarkMode={isDarkMode}
        onChangeMarkdownStatus={onChangeMarkdownStatus}
      />
      <pre
        className={`markdown-content ff-roboto-mono fs-250 text-${
          isDarkMode ? 'gray-3' : 'dark-4'
        } ${isDarkMode ? 'bg-dark-1' : ''}`}
      >
        {content}
      </pre>
    </section>
  );
}

export default Preview;
