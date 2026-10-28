import { clsx } from 'clsx';
import { useId } from 'react';

type InputProps = {
  labelText?: string;
} & React.ComponentProps<'input'>;

export function InputText({ labelText = '', ...props }: InputProps) {
  //
  const commonClasses = clsx('flex flex-col gap-2');

  const inputClasses = clsx(
    'bg-white outline-0 text-base/tight',
    'ring-2 ring-slate-400 rounded',
    'p-2 transition focus:ring-blue-600',
    'placeholder-slate-300',
    'disabled:bg-slate-200',
    'disabled:text-slate-400',
    'disabled:placeholder-slate-300',
    'read-only:bg-slate-100',
    props.className,
  );

  const id = useId();

  return (
    <div className={commonClasses}>
      {labelText && (
        <label className='text-sm' htmlFor={id}>
          {labelText}
        </label>
      )}
      <input {...props} className={inputClasses} id={id} />
    </div>
  );
}
