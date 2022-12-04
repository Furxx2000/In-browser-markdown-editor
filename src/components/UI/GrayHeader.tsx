import '../../scss/GrayHeader.scss';
import SvgIcon from './SvgIcon';

interface Props {
  text: string;
  icon: string;
  isDarkMode: boolean;
  onChangeMarkdownStatus: () => void;
}

function GrayHeader({ text, icon, isDarkMode, onChangeMarkdownStatus }: Props) {
  const grayColor = isDarkMode ? '#C1C4CB' : '#7C8187';

  return (
    <div
      className={`markdown-header fs-250 fw-medium letter-spacing-1 text-gray-${
        isDarkMode ? '3' : '2'
      } ${isDarkMode ? 'bg-dark-2' : 'bg-white-1'} flex`}
    >
      {text}
      <SvgIcon name={icon} color={grayColor} onClick={onChangeMarkdownStatus} />
    </div>
  );
}

export default GrayHeader;
