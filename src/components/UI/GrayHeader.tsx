import SvgIcon from './SvgIcon';
import '../../scss/GrayHeader.scss';

interface Props {
  text: string;
  icon: string;
  isDarkMode: boolean;
  onChangeMarkdownStatus?: () => void;
  changeOnePagePreviewStatus?: () => void;
}

function GrayHeader({
  text,
  icon,
  isDarkMode,
  onChangeMarkdownStatus,
  changeOnePagePreviewStatus,
}: Props) {
  const grayColor = isDarkMode ? '#C1C4CB' : '#7C8187';
  const mql = window.matchMedia('(max-width: 480px)');
  const isTabletMarkdown = !mql.matches && text === 'MARKDOWN';

  return (
    <div
      className={`markdown-header fs-250 fw-medium letter-spacing-1 ${
        isTabletMarkdown ? 'b-right-gray' : ''
      } flex`}
    >
      {text}
      {isTabletMarkdown ? (
        ''
      ) : mql.matches ? (
        <SvgIcon
          name={icon}
          color={grayColor}
          onClick={onChangeMarkdownStatus}
        />
      ) : (
        <SvgIcon
          name={icon}
          color={grayColor}
          onClick={changeOnePagePreviewStatus}
        />
      )}
    </div>
  );
}

export default GrayHeader;
