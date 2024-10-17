import { 
  forwardRef, useMemo,
} from 'react';
import { InputProps } from './types';

const baseInputClasses = `flex w-full rounded-lg border-0 text-sm py-3 text-slate-900 shadow-md
placeholder:text-gray-400 focus:ring-1 outline-none focus:ring-indigo-500 leading-tight
px-3 text-lg disabled:cursor-not-allowed bg-white disabled:bg-gray-50 disabled:text-text-secondary disabled:ring-gray-200`;
const getErrorClasses = (error: boolean | undefined) => error ? 'ring-1 ring-red-300 pr-10' : '';

export const Input = forwardRef<HTMLInputElement | null, InputProps>((props, ref) => {
  const { 
    type = 'text',
    name = 'input-name',
    id = 'input-id',
    placeholder = 'input placeholder',
    value = '',
    disabled = false,
    error = false,
    onChange = () => null,
    ...rest
  } = props;
  const computedClasses = useMemo(() => {
    return getErrorClasses(error);
  }, [error]);

  return (
    <input
      type={type}
      ref={ref}
      name={name}
      id={id}
      value={value}
      className={`${baseInputClasses} ${computedClasses}`}
      placeholder={placeholder}
      disabled={disabled}
      onChange={onChange}
      {...rest}
    />
  )
});
Input.displayName = "Input";