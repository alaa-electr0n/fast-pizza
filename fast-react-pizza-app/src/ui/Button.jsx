import { Link } from 'react-router-dom';

function Button({ children, onClick, disabled, to, type }) {
  const base =
    'inline-block rounded-full bg-yellow-400 font-semibold uppercase tracking-wide text-stone-800 text-xs transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed';

  const styleObje = {
    primary: base + ' px-4 py-3 md:px-6 md:py-4',

    small: base + ' text-xs px-4 py-2 md:px-5 md:py-2.5',

    round: base + 'text-sm px-2.5 py-1 md:px-3.5 md:py-2',

    secondary:
      'inline-block rounded-full font-semibold uppercase tracking-wide text-stone-400 text-xs transition-colors duration-300 border border-stone-300 hover:bg-stone-300 hover:text-stone-800 hover:text-stone-800 focus:bg-stone-300 focus:outline-none focus:ring focus:ring-stone-300 focus:text-stone-800 focus:ring-offset-2 disabled:cursor-not-allowed px-4 py-2.5 md:px-6 md:py-3.5',
  };

  if (to)
    return (
      <Link to={to} className={styleObje[type]}>
        {children}
      </Link>
    );

  if (onClick)
    return (
      <button onClick={onClick} disabled={disabled} className={styleObje[type]}>
        {children}
      </button>
    );

  return (
    <button disabled={disabled} className={styleObje[type]}>
      {children}
    </button>
  );
}

export default Button;
