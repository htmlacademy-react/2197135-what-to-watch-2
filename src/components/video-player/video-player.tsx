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


  /*creation of side effect for event listener for loading video for active card */

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

  /* creation of side effect to play a loaded video in DOM element */

  useEffect(() => {
    if (videoRef.current === null) {
      return;
    }

    if(isPlaying) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }

  }, [isPlaying, isLoaded]);


  const handleMouseEnter = () => {
    setTimeout(() => {
      onMouseEnter();
    }, 1000);
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={onMouseLeave}
      className="small-film-card__image"
    >
      {!isPlaying ? (
        <img src={poster} alt={name} width={width} height={height} />
      ) : (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          width={width}
          height={height}
          muted
        >
        </video>
      )}
    </div>
  );
}
