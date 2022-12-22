import { useCustomState } from '../../Hooks/useCustomState';
import FullPagePreview from '../Preview/FullPagePreview';
import Markdown from '../Markdown/Markdown';
import GrayHeader from '../UI/GrayHeader';
import Preview from '../Preview/Preview';
import Header from './Header';
import '../../scss/MainContent.scss';

function MainContent() {
  const { menu, markdown, onePagePreview } = useCustomState();
  const mql = window.matchMedia('(max-width: 480px)');

  return (
    <main className={`main-content ${menu ? 'is-active' : ''}`}>
      <Header />
      {markdown ? (
        <GrayHeader text='MARKDOWN' icon='icon-show-preview' />
      ) : (
        <GrayHeader text='PREVIEW' icon='icon-hide-preview' />
      )}
      {!mql.matches ? (
        <GrayHeader text='PREVIEW' icon='icon-show-preview' />
      ) : (
        ''
      )}
      <Markdown />
      <Preview />
      {onePagePreview && <FullPagePreview />}
    </main>
  );
}

export default MainContent;
