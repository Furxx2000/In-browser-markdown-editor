import '../../scss/Preview.scss';
import GrayHeader from './GrayHeader';

interface Props {
  content: string;
  onChangeMarkdownStatus: () => void;
}

function Preview({ content, onChangeMarkdownStatus }: Props) {
  return (
    <section className='preview'>
      <GrayHeader
        icon='icon-hide-preview'
        text='PREVIEW'
        onChangeMarkdownStatus={onChangeMarkdownStatus}
      />
      <pre className='preview-content ff-roboto-mono fs-250 text-dark-4'>
        {content}
      </pre>
    </section>
  );
}

export default Preview;
