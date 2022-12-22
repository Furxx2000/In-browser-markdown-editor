import SvgIcon from './SvgIcon';
import '../../scss/SideBarList.scss';

interface Props {
  fileName: string;
  date: string;
  isSelected: boolean;
}

function SideBarList({ fileName, date, isSelected }: Props) {
  return (
    <div className='side-bar-list flex text-white'>
      <SvgIcon name='icon-document' color='white' />
      <div className='document-name'>
        <span className='fs-200 fw-light text-gray-3'>{date}</span>
        <p className={`${isSelected ? 'text-orange-1' : 'text-white'}`}>
          {fileName}
        </p>
      </div>
    </div>
  );
}

export default SideBarList;
