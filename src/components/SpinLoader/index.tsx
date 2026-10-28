import clsx from 'clsx';

type SpinLoaderProps = {
  className?: string;
};

export function SpinLoader({ className = '' }: SpinLoaderProps) {
  const classes = clsx('flex', 'items-center', 'justify-center', className);
  const communclasses = clsx(
    'w-10 h-10',
    'border-5 border-t-transparent border-slate-900',
    'rounded-full',
    'animate-spin',
  );

  return (
    <div className={classes}>
      <div className={communclasses}></div>
    </div>
  );
}
