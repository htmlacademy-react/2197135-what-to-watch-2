type PlayerFullScreenButton = {
  handleClick: () => void;
};

export default function PlayerFullScreenButton({
  handleClick,
}: PlayerFullScreenButton): JSX.Element {
  return (
    <button onClick={handleClick} type="button" className="player__full-screen">
      <svg viewBox="0 0 27 27" width={27} height={27}>
        <use xlinkHref="#full-screen" />
      </svg>
      <span>Full screen</span>
    </button>
  );
}
