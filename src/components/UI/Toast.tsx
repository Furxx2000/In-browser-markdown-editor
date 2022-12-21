import SvgIcon from './SvgIcon';
import { useTheme } from '../../Hooks/useDarkMode';
import '../../scss/Toast.scss';

export default function Toast() {
  const { toast } = useTheme();

  return (
    <div className={`toast flex ${toast ? 'is-active' : ''}`}>
      <SvgIcon name='icon-circle-check-solid' color='#f39765' />
      <div>
        <h5>Success</h5>
        <p className='fs-250'>Your changes are saved successfully</p>
      </div>
    </div>
  );
}
