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
      <div className='preview-content ff-roboto-mono fs-250 text-dark-4'>
        {content}
      </div>
    </section>
  );
}

export default Preview;
