import ModeSwitcher from './components/ModeSwitcher';
import NewDocumentBtn from './components/NewDocumentBtn';
import SaveChangeBtn from './components/SaveChangeBtn';
import './assets/App.scss';

function App() {
  return (
    <div className='flex'>
      <SaveChangeBtn />
      <NewDocumentBtn />
      <ModeSwitcher />
    </div>
  );
}

export default App;
