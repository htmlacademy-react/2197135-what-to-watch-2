import { ReactNode } from 'react';
import Logo from '../logo/logo';
import Breadcrumbs from '../breadcrumbs/breadcrumbs';

type HeaderProps = {
  children?: ReactNode;
  hasBreadcrumbs?: boolean;
  className: string;
};

export default function Header({
  className,
  hasBreadcrumbs,
  children,
}: HeaderProps) {
  return (
    <header className={`${className}`}>
      <Logo className="logo__link" />
      {hasBreadcrumbs && <Breadcrumbs />}
      {children}
    </header>
  );
}
