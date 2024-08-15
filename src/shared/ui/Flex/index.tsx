import type { ElementType, FC, PropsWithChildren } from 'react';
import module from './Flex.module.scss';
import classNames from 'classnames';

interface IProps extends PropsWithChildren {
  tag?: ElementType;
  className?: string;
}

export const Flex: FC<IProps> = props => {
  const { tag: Tag = 'div', className, children } = props;

  return (
    <Tag className={classNames(module.wrapper, className)}>{children}</Tag>
  );
};
