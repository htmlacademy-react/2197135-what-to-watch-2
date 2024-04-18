import { Helmet } from 'react-helmet-async';
import Header from '@/components/header/header';
import SignInForm from '@/components/sign-in-form/sign-in-form';
import Footer from '@/components/footer/footer';

export default function SignIn() {
  return (
    <div className="user-page">
      <Helmet>
        <title>What to watch. Sign in</title>
      </Helmet>
      <Header className={'user-page__head'}>
        <h1 className="page-title user-page__title">Sign in</h1>
      </Header>
      <SignInForm />
      <Footer />
    </div>
  );
}
