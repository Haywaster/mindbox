import type { InputHTMLAttributes } from 'react';
import React, { memo } from 'react';
import module from './Input.module.scss';
import classNames from 'classnames';

type HTMLInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'className' | 'onChange' | 'size'
>;

type InputSize = 'lg' | 'md' | 'sm';

interface InputProps extends HTMLInputProps {
  className?: string;
  onChange?: (value: string) => void;
  size?: InputSize;
}

export const Input = memo((props: InputProps) => {
  const { className, onChange, type = 'text', size = 'md', ...rest } = props;

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  return (
    <div className={classNames(module.wrapper, [className, module[size]])}>
      <input
        type={type}
        onChange={onChangeHandler}
        className={module.input}
        {...rest}
      />
    </div>
  );
});
