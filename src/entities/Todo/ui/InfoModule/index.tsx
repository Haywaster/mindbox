import type { Dispatch, FC } from 'react';
import { memo } from 'react';
import module from './InfoModule.module.scss';
import { Button } from 'shared/ui/Button';
import { useTodos } from 'entities/Todo/model/store/useTodos.ts';
import type { TodoFilter } from 'entities/Todo';
import { todoFilter } from 'entities/Todo';

interface IProps {
  leftCount: number;
  id: string;
  filterBy: TodoFilter;
  changeFilter: Dispatch<TodoFilter>;
}

interface IFilteredBtnProps {
  filter: TodoFilter;
  changeFilter: Dispatch<TodoFilter>;
  filterBy: TodoFilter;
}

const FilterBtn: FC<IFilteredBtnProps> = memo(props => {
  const { filter, changeFilter, filterBy } = props;

  const clickHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
    changeFilter(filter);
  };

  return (
    <Button
      key={filter}
      size='xs'
      mode='secondary'
      isActive={filter === filterBy}
      onClick={clickHandler}
    >
      {filter}
    </Button>
  );
});

export const InfoModule: FC<IProps> = memo(props => {
  const { leftCount = 0, id, changeFilter, filterBy } = props;
  const clearCompleted = useTodos(state => state.clearCompleted);

  const onClearCompleted = (e: React.MouseEvent): void => {
    e.stopPropagation();
    clearCompleted(id);
  };

  return (
    <div className={module.wrapper}>
      <span>{leftCount} items left</span>
      <div className={module.sort}>
        {todoFilter.map(filter => (
          <FilterBtn
            filter={filter}
            key={filter}
            changeFilter={changeFilter}
            filterBy={filterBy}
          />
        ))}
      </div>
      <Button onClick={onClearCompleted} size='xs' mode='ghost'>
        Clear completed
      </Button>
    </div>
  );
});
