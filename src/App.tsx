import MarkdownEditor from './components/Layout/MarkdownEditor';
import { ThemeProvider } from './Hooks/useDarkMode';
import './assets/App.scss';

function App() {
  return (
    <ThemeProvider>
      <MarkdownEditor />
    </ThemeProvider>
  );
}

export default App;
