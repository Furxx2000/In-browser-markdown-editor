import GrayHeader from '../UI/GrayHeader';
import Preview from './Preview';
import '../../scss/FullPagePreview.scss';

interface Props {
  isDarkMode: boolean;
  content: string;
  changeOnePagePreviewStatus: () => void;
}

export default function FullPagePreview({
  isDarkMode,
  content,
  changeOnePagePreviewStatus,
}: Props) {
  return (
    <div className='one-page-preview'>
      <GrayHeader
        text='PREVIEW'
        icon='icon-hide-preview'
        isDarkMode={isDarkMode}
        changeOnePagePreviewStatus={changeOnePagePreviewStatus}
      />
      <div className='one-page-preview-content'>
        <Preview content={content} />
      </div>
    </div>
  );
}
