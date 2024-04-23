type PlayerPlayPauseButtontType = {
  onPlayPauseClick: () => void;
  isPlaying: boolean;
};

export default function PlayerPlayPauseButton({
  onPlayPauseClick,
  isPlaying,
}: PlayerPlayPauseButtontType): JSX.Element {
  return (
    <button onClick={onPlayPauseClick} type="button" className="player__play">
      {isPlaying ? (
        <>
          <svg viewBox="0 0 14 21" width={14} height={21}>
            <use xlinkHref="#pause"></use>
          </svg>
          <span>Pause</span>
        </>
      ) : (
        <>
          <svg viewBox="0 0 19 19" width={19} height={19}>
            <use xlinkHref="#play-s" />
          </svg>
          <span>Play</span>
        </>
      )}
    </button>
  );
}
