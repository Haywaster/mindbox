import { type FC, memo, useCallback, useState } from 'react';
import module from './DropTodo.module.scss';
import classNames from 'classnames';
import type { IDropTodo, TodoFilter } from '../../model';
import { Todo } from '../Todo';
import { Arrow, Plus } from 'entities/Todo/assets';
import { InfoModule } from '../InfoModule';
import { Button } from 'shared/ui/Button';
import { useTodos } from 'entities/Todo/model/store/useTodos.ts';

interface IProps extends IDropTodo {}

const MainTitle: FC<Omit<IProps, 'todos'>> = memo(props => {
  const { title, id } = props;
  const removeTodo = useTodos(state => state.removeTodo);

  const onRemove = (e: React.MouseEvent): void => {
    e.stopPropagation();
    removeTodo(id);
  };

  return (
    <div className={module.main}>
      <Arrow />
      <span>{title}</span>
      <Button
        icon
        size='xs'
        mode='secondary'
        onClick={onRemove}
        className={module.remove}
      >
        <Plus />
      </Button>
    </div>
  );
});

const TodoList: FC<Omit<IProps, 'title'>> = memo(props => {
  const { todos, id } = props;
  const makeChecked = useTodos(state => state.makeChecked);

  const checkHandler = useCallback(
    (todoId: string) => {
      makeChecked(id, todoId);
    },
    [id, makeChecked]
  );

  return (
    <ul>
      {todos.map(item => (
        <Todo key={item.id} {...item} onChecked={checkHandler} />
      ))}
    </ul>
  );
});

export const DropTodo: FC<IProps> = memo(props => {
  const { title, todos, id } = props;
  const [filterBy, setFilterBy] = useState<TodoFilter>('all');
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const handleClick = (): void => {
    setIsExpanded(prev => !prev);
  };

  const filteredTodos = todos.filter(todo => {
    switch (filterBy) {
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      default:
        return true;
    }
  });

  return (
    <li
      className={classNames(module.wrapper, { [module.expanded]: isExpanded })}
      onClick={handleClick}
    >
      <MainTitle title={title} id={id} />
      <div className={module.list}>
        <TodoList todos={filteredTodos} id={id} />
        <InfoModule
          leftCount={filteredTodos.length}
          id={id}
          changeFilter={setFilterBy}
          filterBy={filterBy}
        />
      </div>
    </li>
  );
});
