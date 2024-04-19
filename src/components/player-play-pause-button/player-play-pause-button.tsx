import { Fragment } from 'react';

type PlayerPlayPauseButtontType = {
  handleClick: () => void;
  isPlaying: boolean;
};

export default function PlayerPlayPauseButton({
  handleClick,
  isPlaying,
}: PlayerPlayPauseButtontType): JSX.Element {
  return (
    <button onClick={handleClick} type="button" className="player__play">
      {isPlaying ? (
        <Fragment>
          <svg viewBox="0 0 14 21" width={14} height={21}>
            <use xlinkHref="#pause"></use>
          </svg>
          <span>Pause</span>
        </Fragment>
      ) : (
        <Fragment>
          <svg viewBox="0 0 19 19" width={19} height={19}>
            <use xlinkHref="#play-s" />
          </svg>
          <span>Play</span>
        </Fragment>
      )}
    </button>
  );
}
