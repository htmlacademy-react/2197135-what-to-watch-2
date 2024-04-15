import { ReactNode } from 'react';
import Logo from '../logo/logo';

type HeaderProps = {
  children?: ReactNode;
  className: string;
};

export default function Header({ className, children }: HeaderProps) {
  return (
    <header className={`page-header ${className}`}>
      <Logo className="logo__link" />
      {children}
    </header>
  );
}
