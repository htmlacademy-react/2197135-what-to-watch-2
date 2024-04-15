import { Helmet } from 'react-helmet-async';
import Page404 from '../page-404/page-404';
import { AppRoute } from '@/utils/const';
import { useAppSelector } from '@/hooks';
import { getFilm } from '@/store/films-process/films-process-selectors';
import { useNavigate } from 'react-router-dom';

export default function Player(): JSX.Element {
  const chosenFilm = useAppSelector(getFilm);

  const navigate = useNavigate();

  if (!chosenFilm) {
    return <Page404 />;
  }

  return (
    <div className="player">
      <Helmet>
        <title>What to whatch. Player</title>
      </Helmet>
      <video
        src={chosenFilm.videoLink}
        className="player__video"
        poster={chosenFilm.posterImage}
      />
      <button
        onClick={() => navigate(AppRoute.Main)}
        type="button"
        className="player__exit"
      >
        Exit
      </button>
      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value={30} max={100} />
            <div className="player__toggler" style={{ left: '30%' }}>
              Toggler
            </div>
          </div>
          <div className="player__time-value">1:30:29</div>
        </div>
        <div className="player__controls-row">
          <button type="button" className="player__play">
            <svg viewBox="0 0 19 19" width={19} height={19}>
              <use xlinkHref="#play-s" />
            </svg>
            <span>Play</span>
          </button>
          <div className="player__name">Transpotting</div>
          <button type="button" className="player__full-screen">
            <svg viewBox="0 0 27 27" width={27} height={27}>
              <use xlinkHref="#full-screen" />
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
}
