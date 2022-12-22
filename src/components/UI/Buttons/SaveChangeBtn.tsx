import { useCustomState } from '../../../Hooks/useCustomState';
import { useFile } from '../../../Hooks/useFiles';
import SvgIcon from '../SvgIcon';
import '../../../scss/Button.scss';

function SaveChangeBtn() {
  const { dispatch } = useFile();
  const { changeToastStatus } = useCustomState();

  function handleSaveChangeFile() {
    dispatch({ type: 'saveFile', payload: null });
    changeToastStatus();
  }

  return (
    <button
      type='button'
      className='save-change bg-orange-1 rounded text-white'
      onClick={handleSaveChangeFile}
    >
      <SvgIcon name='icon-save' color='white' />
      <p className='save-change--text'>Save Changes</p>
    </button>
  );
}

export default SaveChangeBtn;
