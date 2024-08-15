import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { IDropTodo } from 'entities/Todo';

interface State {
  todos: IDropTodo[];
}

interface Actions {
  addTodo: (todo: IDropTodo) => void;
  removeTodo: (id: string) => void;
  makeChecked: (parentId: string, childId: string) => void;
  clearCompleted: (id: string) => void;
}

export const useTodos = create<State & Actions>()(
  persist(
    (set, get) => ({
      todos: [],
      addTodo: todo =>
        set(state => ({
          todos: [...state.todos, todo]
        })),
      removeTodo: id =>
        set(state => ({
          todos: state.todos.filter(todo => todo.id !== id)
        })),
      makeChecked: (parentId, childId) =>
        set(state => {
          const newTodos = state.todos.map(todo => {
            if (todo.id === parentId) {
              return {
                ...todo,
                todos: todo.todos.map(item => {
                  if (item.id === childId) {
                    return {
                      ...item,
                      completed: !item.completed
                    };
                  }

                  return item;
                })
              };
            }

            return todo;
          });

          return { todos: newTodos };
        }),
      clearCompleted: id =>
        set({
          todos: get().todos.map(todo => {
            if (todo.id === id) {
              return {
                ...todo,
                todos: todo.todos.map(item => ({ ...item, completed: false }))
              };
            }

            return todo;
          })
        })
    }),
    {
      name: 'todos-storage',
      storage: createJSONStorage(() => sessionStorage)
    }
  )
);
