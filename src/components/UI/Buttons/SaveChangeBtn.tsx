import SvgIcon from '../SvgIcon';
import '../../../scss/Button.scss';

function SaveChangeBtn() {
  const mql = window.matchMedia('(max-width: 480px)');

  return (
    <button
      type='button'
      className='save-change bg-orange-1 rounded text-white'
    >
      <SvgIcon name='icon-save' color='white' />
      {mql.matches ? '' : <p>Save Change</p>}
    </button>
  );
}

export default SaveChangeBtn;
