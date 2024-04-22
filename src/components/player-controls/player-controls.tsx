import PlayerControlTimeLine from '../player-control-timeline/player-control-timeline';
import PlayerFullScreenButton from '../player-full-screen-button/player-full-screen-button';
import PlayerPlayPauseButton from '../player-play-pause-button/player-play-pause-button';

type PlayerControlProps = {
  onTogglerDown: (event: React.MouseEvent<HTMLDivElement>) => void;
  currentTime: number;
  duration: number;
  filmName: string;
  isPlaying: boolean;
  onFullScreenClick: () => void;
  onPlayPauseClick: () => void;
};

export default function PlayerControls({
  onTogglerDown,
  currentTime,
  duration,
  isPlaying,
  onFullScreenClick,
  filmName,
  onPlayPauseClick,
}: PlayerControlProps) {
  return (
    <div className="player__controls">
      <PlayerControlTimeLine
        duration={duration}
        currentTime={currentTime}
        onTogglerDown={onTogglerDown}
      />
      <div className="player__controls-row">
        <PlayerPlayPauseButton
          onPlayPauseClick={onPlayPauseClick}
          isPlaying={isPlaying}
        />
        <div className="player__name">{filmName}</div>
        <PlayerFullScreenButton onFullScreenClick={onFullScreenClick} />
      </div>
    </div>
  );
}
