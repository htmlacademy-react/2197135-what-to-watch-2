import { useEffect, useRef, useState } from 'react';

type VideoPlayerProps = {
  isPlaying: boolean;
  name: string;
  src: string;
  poster: string;
  width: number;
  height: number;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
};

export default function VideoPlayer({
  isPlaying,
  src,
  name,
  poster,
  width,
  height,
  onMouseEnter,
  onMouseLeave,
}: VideoPlayerProps): JSX.Element {
  const [isLoaded, setIsLoaded] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const playerElement = videoRef.current;

    const dataLoadedHandle = () => {
      setIsLoaded(true);
    };

    playerElement?.addEventListener('loadeddata', dataLoadedHandle);

    return () => {
      playerElement?.removeEventListener('loadeddata', dataLoadedHandle);
    };
  }, []);

  useEffect(() => {
    if (videoRef.current === null) {
      return;
    }

    if (isPlaying) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }, [isPlaying, isLoaded]);

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => {
      onMouseEnter();
    }, 1000);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    onMouseLeave();
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="small-film-card__image"
    >
      {!isPlaying ? (
        <img src={poster} alt={name} width={width} height={height} />
      ) : (
        <video ref={videoRef} src={src} poster={poster} width={width} height={height} muted />
      )}
    </div>
  );
}
