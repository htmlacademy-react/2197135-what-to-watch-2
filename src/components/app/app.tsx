import MainPage from '../../pages/main-page/main-page';
import { Film } from '../../types/film';

type AppProps = {
  films: Film[];
};

export default function App({films}: AppProps):JSX.Element {

  return <MainPage films={films} />;
}
