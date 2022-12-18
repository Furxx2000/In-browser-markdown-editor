import '../../scss/Toast.scss';

interface Props {
  isToastOpen: boolean;
}

export default function Toast({ isToastOpen }: Props) {
  return (
    <div className={`toast ${isToastOpen ? 'is-active' : ''}`}>
      <p>Your change has been saved.</p>
    </div>
  );
}
