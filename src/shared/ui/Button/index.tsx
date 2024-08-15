import classNames from 'classnames';
import type { ButtonHTMLAttributes, ReactElement, FC } from 'react';
import { memo } from 'react';

import module from './Button.module.scss';
import { type LinkProps, Link } from 'react-router-dom';

type BtnSize = 'lg' | 'sm' | 'xs';
type BtnMode = 'primary' | 'secondary' | 'ghost';

interface IBaseProps {
  link?: boolean;
  isActive?: boolean;
  icon?: boolean;
  size?: BtnSize;
  mode?: BtnMode;
  children: ReactElement | string;
}

type BasePropsShared<L extends boolean = false> = IBaseProps &
  (L extends true ? LinkProps : ButtonHTMLAttributes<HTMLButtonElement>);

interface IBtnProps extends BasePropsShared {}

interface ILinkProps extends BasePropsShared<true> {
  link: true;
}

type IProps = IBtnProps | ILinkProps;

export const Button: FC<IProps> = memo(props => {
  const {
    icon,
    children,
    isActive,
    size = 'lg',
    mode = 'primary',
    className,
    link,
    ...rest
  } = props;

  const clazz = classNames(
    module.button,
    { [module.icon]: icon, [module.active]: isActive, [module.link]: link },
    [module[size], module[mode], className]
  );

  if (link) {
    return (
      <Link className={clazz} {...(rest as LinkProps)}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={props.type || 'button'}
      className={clazz}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
});
