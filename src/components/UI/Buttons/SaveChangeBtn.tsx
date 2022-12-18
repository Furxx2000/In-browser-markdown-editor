import SvgIcon from '../SvgIcon';
import '../../../scss/Button.scss';

interface Props {
  saveChange: () => void;
}

function SaveChangeBtn({ saveChange }: Props) {
  return (
    <button
      type='button'
      className='save-change bg-orange-1 rounded text-white'
      onClick={saveChange}
    >
      <SvgIcon name='icon-save' color='white' />
      <p className='save-change--text'>Save Changes</p>
    </button>
  );
}

export default SaveChangeBtn;
