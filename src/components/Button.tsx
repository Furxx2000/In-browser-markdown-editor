import SvgIcon from './SvgIcon';
import '../scss/Button.scss';

interface ButtonAttr {
  color?: string;
  name?: string;
  text?: string;
}

function Button({ color, name, text }: ButtonAttr) {
  return (
    <button type='button' className='bg-orange-1 rounded text-white'>
      {name && <SvgIcon name={name} color={color} />}
      {text}
    </button>
  );
}

export default Button;
