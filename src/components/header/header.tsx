import { ReactNode } from 'react';
import Logo from '../logo/logo';

type HeaderProps = {
  children?: ReactNode;
  breadcrumbs?: ReactNode;
  className: string;
};

export default function Header({
  className,
  breadcrumbs,
  children,
}: HeaderProps) {
  return (
    <header className={className}>
      <Logo className="logo__link" />
      {breadcrumbs}
      {children}
    </header>
  );
}
