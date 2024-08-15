import { type FC, memo } from 'react';
import module from './TodosSection.module.scss';
import { DropTodo } from 'entities/Todo/ui/DropTodo';
import { Flex } from 'shared/ui/Flex';
import { useTodos } from 'entities/Todo/model/store/useTodos.ts';

export const TodosSection: FC = memo(() => {
  const todos = useTodos(state => state.todos);

  if (todos.length === 0) {
    return (
      <Flex tag='section' className={module.emptyList}>
        <h2>Todo list is empty :(</h2>
      </Flex>
    );
  }

  return (
    <section className={module.section}>
      <div className={module.todoList}>
        {todos.map(item => (
          <DropTodo key={item.id} {...item} />
        ))}
      </div>
    </section>
  );
});
