import MarkdownEditor from './components/Layout/MarkdownEditor';
import { FileProvider } from './Hooks/useFiles';
import './assets/App.scss';

function App() {
  return (
    <FileProvider>
      <MarkdownEditor />
    </FileProvider>
  );
}

export default App;
