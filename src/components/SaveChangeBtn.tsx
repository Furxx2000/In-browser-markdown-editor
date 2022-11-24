import SvgIcon from './SvgIcon';
import '../scss/Button.scss';

function SaveChangeBtn() {
  return (
    <button type='button' className='bg-orange-1 rounded text-white'>
      <SvgIcon name='icon-save' color='white' />
      Save Change
    </button>
  );
}

export default SaveChangeBtn;
