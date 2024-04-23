type PlayerFullScreenButton = {
  onFullScreenClick: () => void;
};

export default function PlayerFullScreenButton({
  onFullScreenClick,
}: PlayerFullScreenButton): JSX.Element {
  return (
    <button
      onClick={onFullScreenClick}
      type="button"
      className="player__full-screen"
    >
      <svg viewBox="0 0 27 27" width={27} height={27}>
        <use xlinkHref="#full-screen" />
      </svg>
      <span>Full screen</span>
    </button>
  );
}
