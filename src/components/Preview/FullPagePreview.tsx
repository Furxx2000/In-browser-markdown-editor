import GrayHeader from '../UI/GrayHeader';
import Preview from './Preview';
import '../../scss/FullPagePreview.scss';

export default function FullPagePreview() {
  return (
    <div className='one-page-preview'>
      <GrayHeader text='PREVIEW' icon='icon-hide-preview' />
      <div className='one-page-preview-content'>
        <Preview />
      </div>
    </div>
  );
}
