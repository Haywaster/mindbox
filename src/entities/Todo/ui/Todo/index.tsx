import { type FC, memo, useEffect, useState } from 'react';
import module from './Todo.module.scss';
import classNames from 'classnames';
import type { ITodo } from 'entities/Todo';

interface IProps extends ITodo {
  onChecked: (todoId: string) => void;
}

export const Todo: FC<IProps> = memo(props => {
  const { id, value, onChecked, completed: completedProp } = props;
  const [completed, setCompleted] = useState<boolean>(completedProp);

  useEffect(() => {
    setCompleted(completedProp);
  }, [completedProp]);

  const handleClick = (e: React.MouseEvent): void => {
    e.stopPropagation();
    setCompleted(prev => !prev);
    onChecked(id);
  };

  return (
    <li
      className={classNames(module.wrapper, { [module.completed]: completed })}
      onClick={handleClick}
    >
      <input type='checkbox' checked={completed} readOnly />
      <span>{value}</span>
    </li>
  );
});
