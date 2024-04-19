import { formatTime } from '@/utils/const';

type PlayerControlTimeLineType = {
  currentTime: number;
  duration: number;
  handleToggler: (event: React.MouseEvent<HTMLDivElement>) => void;
};

export default function PlayerControlTimeLine({
  currentTime,
  duration,
  handleToggler,
}: PlayerControlTimeLineType) {
  return (
    <div className="player__controls-row">
      <div
        className="player__time"
        onMouseDown={(event) => handleToggler(event)}
      >
        <progress
          className="player__progress"
          value={currentTime / duration}
          max={1}
        />
        <div
          onMouseDown={handleToggler}
          className="player__toggler"
          style={{ left: `${(currentTime / duration) * 100}%` }}
        >
          Toggler
        </div>
      </div>
      <div className="player__time-value">
        {formatTime(Math.max(0, duration - currentTime))}
      </div>
    </div>
  );
}
