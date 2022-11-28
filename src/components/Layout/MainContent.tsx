import Markdown from '../UI/Markdown';
import Header from './Header';
import '../../scss/MainContent.scss';

interface File {
  name: string;
  createdAt: string;
  content: string;
  isSelected: boolean;
}

interface Props {
  curFile: File;
  isMenuOpen: boolean;
  onChangeMenuStatus: () => void;
}

function MainContent(props: Props) {
  return (
    <main className={`main-content ${props.isMenuOpen ? 'is-active' : ''}`}>
      <Header
        name={props.curFile.name}
        createdAt={props.curFile.createdAt}
        isSelected={props.curFile.isSelected}
        isMenuOpen={props.isMenuOpen}
        onChangeMenuStatus={props.onChangeMenuStatus}
      />
      <Markdown content={props.curFile.content} />
    </main>
  );
}

export default MainContent;
