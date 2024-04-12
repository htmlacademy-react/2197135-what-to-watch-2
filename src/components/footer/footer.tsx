import Logo from '../logo/logo';


export default function Footer() {
  return (
    <footer className="page-footer">
      <Logo className='logo__link logo__link--light' />
      <div className="copyright">
        <p>© 2019 What to watch Ltd.</p>
      </div>
    </footer>
  );
}
