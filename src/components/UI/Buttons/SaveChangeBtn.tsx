import { useCustomState } from '../../../Hooks/useCustomState';
import SvgIcon from '../SvgIcon';
import '../../../scss/Button.scss';

interface Props {
  dispatch: React.Dispatch<any>;
}

function SaveChangeBtn({ dispatch }: Props) {
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
