import PlayerControlTimeLine from '../player-control-timeline/player-control-timeline';
import PlayerFullScreenButton from '../player-full-screen-button/player-full-screen-button';
import PlayerPlayPauseButton from '../player-play-pause-button/player-play-pause-button';

type PlayerControlProps = {
  handleToggler: (event: React.MouseEvent<HTMLDivElement>) => void;
  currentTime: number;
  duration: number;
  filmName: string;
  isPlaying: boolean;
  handleFullScreen: () => void;
  handlePlayPauseClick: () => void;
};

export default function PlayerControls({
  handleToggler,
  currentTime,
  duration,
  isPlaying,
  handleFullScreen,
  filmName,
  handlePlayPauseClick,
}: PlayerControlProps) {
  return (
    <div className="player__controls">
      <PlayerControlTimeLine
        duration={duration}
        currentTime={currentTime}
        handleToggler={handleToggler}
      />
      <div className="player__controls-row">
        <PlayerPlayPauseButton
          handleClick={handlePlayPauseClick}
          isPlaying={isPlaying}
        />
        <div className="player__name">{filmName}</div>
        <PlayerFullScreenButton handleClick={handleFullScreen} />
      </div>
    </div>
  );
}
