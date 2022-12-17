import SvgIcon from '../SvgIcon';
import '../../../scss/Button.scss';

interface Props {
  saveChangedName: () => void;
}

function SaveChangeBtn({ saveChangedName }: Props) {
  return (
    <button
      type='button'
      className='save-change bg-orange-1 rounded text-white'
      onClick={saveChangedName}
    >
      <SvgIcon name='icon-save' color='white' />
      <p className='save-change--text'>Save Changes</p>
    </button>
  );
}

export default SaveChangeBtn;
