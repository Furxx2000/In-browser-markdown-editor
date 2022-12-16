import SvgIcon from '../SvgIcon';
import '../../../scss/Button.scss';

interface Props {
  saveChangedName: () => void;
}

function SaveChangeBtn({ saveChangedName }: Props) {
  const mql = window.matchMedia('(max-width: 480px)');

  return (
    <button
      type='button'
      className='save-change bg-orange-1 rounded text-white'
      onClick={saveChangedName}
    >
      <SvgIcon name='icon-save' color='white' />
      {mql.matches ? '' : <p>Save Changes</p>}
    </button>
  );
}

export default SaveChangeBtn;
