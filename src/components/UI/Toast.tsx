import SvgIcon from './SvgIcon';
import '../../scss/Toast.scss';

interface Props {
  isToastOpen: boolean;
}

export default function Toast({ isToastOpen }: Props) {
  return (
    <div className={`toast flex ${isToastOpen ? 'is-active' : ''}`}>
      <SvgIcon name='icon-circle-check-solid' color='#f39765' />
      <div>
        <h5>Success</h5>
        <p className='text-gray-2 fs-250'>
          Your changes are saved successfully
        </p>
      </div>
    </div>
  );
}
