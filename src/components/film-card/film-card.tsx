type FilmCardProps = {
  filmName: string;
  imageSrc: string;
  imageAlt: string;
};


export default function FilmCard({filmName, imageSrc, imageAlt}: FilmCardProps) {
  return (
    <>
      <div className="small-film-card__image">
        <img
          src={imageSrc}
          alt={imageAlt}
          width={280}
          height={175}
        />
      </div>
      <h3 className="small-film-card__title">
        <a className="small-film-card__link" href="film-page.html">
          {filmName}
        </a>
      </h3>
    </>
  );
}
