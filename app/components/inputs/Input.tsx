import React from 'react';
import { BiDollar } from 'react-icons/bi';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  formateprice?: boolean;
  required?: boolean;
  register?: UseFormRegister<FieldValues>;
  errors?: FieldErrors;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type = 'text',
  disabled = false,
  formateprice = false,
  required = false,
  register,
  errors,
}) => {
  return (
    <div className="w-full relative">
      {formateprice && (
        <BiDollar size={24} className="absolute top-5 text-neutral-700 left-2" />
      )}
      <input
        id={id}
        type={type}
        disabled={disabled}
        {...register?.(id, { required })}
        placeholder=" "
        className={`peer w-full p-4 font-light bg-white border-2 rounded-md outline-none transition
          disabled:opacity-70 disabled:cursor-not-allowed
          ${formateprice ? 'pl-9' : 'pl-4'}
          ${errors && errors[id] ? 'border-rose-500' : 'border-neutral-300'}
          focus: ${errors && errors[id] ? 'border-rose-500' : 'border-black'}
          `}
      />
      <label
        className={`
          absolute text-md duration-150 transform -translate-y-3 top-5 z-10 origin-[0]
          ${formateprice ? 'left-9' : 'left-4'}
          peer-placeholder-shown:scale-100
          peer-placeholder-shown:translate-y-0
          peer-focus:scale-75
          peer-focus:-translate-y-4
          ${errors && errors[id] ? 'text-rose-500' : 'text-zinc-400'}
        `}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
