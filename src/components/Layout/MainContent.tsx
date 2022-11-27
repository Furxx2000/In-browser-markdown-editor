import Header from './Header';

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
    <>
      <Header
        name={props.curFile.name}
        createdAt={props.curFile.createdAt}
        isSelected={props.curFile.isSelected}
        isMenuOpen={props.isMenuOpen}
        onChangeMenuStatus={props.onChangeMenuStatus}
      />
    </>
  );
}

export default MainContent;
