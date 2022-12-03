import '../../scss/GrayHeader.scss';
import SvgIcon from './SvgIcon';

interface Props {
  text: string;
  icon: string;
  onChangeMarkdownStatus: () => void;
}

function GrayHeader({ text, icon, onChangeMarkdownStatus }: Props) {
  const grayColor = '#7C8187';
  return (
    <div className='markdown-header fs-250 fw-medium letter-spacing-1 text-gray-2 bg-white-1 flex'>
      {text}
      <SvgIcon name={icon} color={grayColor} onClick={onChangeMarkdownStatus} />
    </div>
  );
}

export default GrayHeader;
