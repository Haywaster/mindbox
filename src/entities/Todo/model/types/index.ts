import type { todoFilter } from 'entities/Todo';

export interface ITodo {
  id: string;
  value: string;
  completed: boolean;
}

export interface IDropTodo {
  id: string;
  title: string;
  todos: ITodo[];
}

export type TodoFilter = (typeof todoFilter)[number];
