import { type FC, memo, useCallback, useState } from 'react';
import module from './CreateTodoForm.module.scss';
import { Button } from 'shared/ui/Button';
import { Input } from 'shared/ui/Input';
import { AddedInput } from 'features/createTodo/ui/AddedInput';
import type { IDropTodo, ITodo } from 'entities/Todo';
import { Plus } from 'entities/Todo';
import { Flex } from 'shared/ui/Flex';
import { useTodos } from 'entities/Todo/model/store/useTodos.ts';

const radix = 16;

const initialInputs: ITodo[] = [
  {
    id: Date.now().toString(radix),
    value: '',
    completed: false
  }
];

export const CreateTodoForm: FC = memo(() => {
  const addTodo = useTodos(state => state.addTodo);
  const [title, setTitle] = useState<string>('');
  const [inputs, setInputs] = useState<ITodo[]>(initialInputs);

  const handleAddInput = useCallback((): void => {
    const newInput: ITodo = {
      id: Date.now().toString(radix),
      value: '',
      completed: false
    };
    setInputs(prev => [...prev, newInput]);
  }, []);

  const handleRemoveInput = useCallback((id: string): void => {
    setInputs(prev => prev.filter(input => input.id !== id));
  }, []);

  const handleInputChange = useCallback((id: string, value: string): void => {
    setInputs(prev =>
      prev.map(input => (input.id === id ? { ...input, value } : input))
    );
  }, []);

  const resetForm = (): void => {
    setTitle('');
    setInputs([]);
  };

  const handleCreate = (): void => {
    if (title && inputs.length > 0) {
      const newTodo: IDropTodo = {
        title,
        id: Date.now().toString(radix),
        todos: inputs
      };
      addTodo(newTodo);
      resetForm();
    }
  };

  return (
    <Flex>
      <h2>Create Todo</h2>
      <div className={module.form}>
        <Input
          name='title'
          type='text'
          placeholder='Title'
          value={title}
          onChange={setTitle}
        />
        {inputs.map(input => (
          <AddedInput
            key={input.id}
            id={input.id}
            value={input.value}
            onClick={handleRemoveInput}
            onChange={handleInputChange}
          />
        ))}
        <Button
          icon
          size='xs'
          mode='ghost'
          className={module.plus}
          onClick={handleAddInput}
          aria-label='+'
        >
          <Plus />
        </Button>
      </div>
      <Button
        className={module.createBtn}
        onClick={handleCreate}
        aria-label='create'
      >
        Create
      </Button>
    </Flex>
  );
});
