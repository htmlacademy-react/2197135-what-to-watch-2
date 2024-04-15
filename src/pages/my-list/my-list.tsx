import { Helmet } from 'react-helmet-async';
import Header from '@/components/header/header';
import Footer from '@/components/footer/footer';

export default function MyList() {
  return (
    <div className="user-page">
      <Helmet>
        <title>What to watch.Yours films list</title>
      </Helmet>
      <Header className={'user-page__head'} />
      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>
        <div className="catalog__films-list"></div>
      </section>
      <Footer />
    </div>
  );
}
