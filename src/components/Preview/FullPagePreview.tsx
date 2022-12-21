import GrayHeader from '../UI/GrayHeader';
import Preview from './Preview';
import '../../scss/FullPagePreview.scss';

interface Props {
  content: string;
  changeOnePagePreviewStatus: () => void;
}

export default function FullPagePreview({
  content,
  changeOnePagePreviewStatus,
}: Props) {
  return (
    <div className='one-page-preview'>
      <GrayHeader
        text='PREVIEW'
        icon='icon-hide-preview'
        changeOnePagePreviewStatus={changeOnePagePreviewStatus}
      />
      <div className='one-page-preview-content'>
        <Preview content={content} />
      </div>
    </div>
  );
}
