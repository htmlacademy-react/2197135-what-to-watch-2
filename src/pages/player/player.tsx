import { Helmet } from 'react-helmet-async';
import { useAppSelector } from '@/hooks';
import {
  getFilm,
  getFilmStatusSelector,
} from '@/store/films-slice/films-slice-selectors';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useFetchFilm } from '@/hooks/use-fetch-film';
import LoadingSpinner from '@/components/loading-spinner/loading-spinner';
import ErrorPage from '../error-page/error-page';
import PlayerControls from '@/components/player-controls/player-controls';

export default function Player(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  useFetchFilm(id);
  const chosenFilm = useAppSelector(getFilm);
  const chosenFilmStatus = useAppSelector(getFilmStatusSelector);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const videoElement = videoRef.current;

    if (videoElement) {
      const handleTimeUpdate = () => {
        setCurrentTime(Math.round(videoElement.currentTime));
      };

      const handleLoadedMetaData = () => {
        setDuration(videoElement.duration);
        setIsPlaying(true);
        videoElement.play();
      };

      videoElement.addEventListener('timeupdate', handleTimeUpdate);
      videoElement.addEventListener('loadedmetadata', handleLoadedMetaData);

      return () => {
        videoElement?.removeEventListener('timeupdate', handleTimeUpdate);
        videoElement?.removeEventListener(
          'loadedmetadata',
          handleLoadedMetaData
        );
      };
    }
  }, [isPlaying]);

  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullScreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
    };
  }, [isFullScreen]);

  if (chosenFilmStatus.isLoading) {
    return <LoadingSpinner />;
  }

  if (!chosenFilm || chosenFilmStatus.isError) {
    return <ErrorPage />;
  }

  const handlePlayPauseClick = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.currentTime = currentTime;
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const handleExitClick = () => {
    navigate(-1);
  };

  const handleTogglerMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const percentage = offsetX / rect.width;

    const newCurrentTime = duration * percentage;
    setCurrentTime(newCurrentTime);

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const moveOffsetX = moveEvent.clientX - rect.left;
      let movePercentage = moveOffsetX / rect.width;
      movePercentage = Math.min(1, Math.max(0, movePercentage));
      const newMoveCurrentTime = duration * movePercentage;
      setCurrentTime(newMoveCurrentTime);
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleFullScreen = () => {
    if (!document.fullscreenElement) {
      if (videoRef.current) {
        videoRef.current.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>What to whatch - Player</title>
      </Helmet>
      <div className="player">
        <video
          ref={videoRef}
          src={chosenFilm.videoLink}
          className="player__video"
          poster={chosenFilm.posterImage}
          autoPlay={isPlaying}
        />
        <button
          onClick={handleExitClick}
          type="button"
          className="player__exit"
        >
          Exit
        </button>
        <PlayerControls
          duration={duration}
          currentTime={currentTime}
          onTogglerDown={handleTogglerMouseDown}
          onFullScreenClick={handleFullScreen}
          isPlaying={isPlaying}
          filmName={chosenFilm.name}
          onPlayPauseClick={handlePlayPauseClick}
        />
      </div>
    </>
  );
}
