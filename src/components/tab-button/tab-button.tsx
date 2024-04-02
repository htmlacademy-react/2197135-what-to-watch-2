import classes from './tab-button.module.css';

type ButtonProps = {
  children: string;
  onClick: () => void;
};

export default function TabButton({
  children,
  onClick,
}: ButtonProps): JSX.Element {
  return (
    <button className={classes.tabButton} onClick={onClick} type="button">
      {children}
    </button>
  );
}
