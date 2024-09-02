import { render, screen, fireEvent } from '@testing-library/react';
import { CreateTodoForm } from 'features/createTodo';
import { useTodos } from 'entities/Todo';

jest.mock('entities/Todo/model/store/useTodos.ts');

describe('CreateTodoForm', () => {
  const addTodoMock = jest.fn();

  beforeEach(() => {
    const mockedUseTodos = useTodos as jest.MockedFunction<typeof useTodos>;
    mockedUseTodos.mockReturnValue({
      addTodo: addTodoMock
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders the form with initial elements', () => {
    render(<CreateTodoForm />);

    expect(
      screen.getByRole('textbox', { name: 'description' })
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '+' })).toBeInTheDocument();
  });

  test('adds a new input field when "+" button is clicked', () => {
    render(<CreateTodoForm />);

    const plusBtn = screen.getByRole('button', { name: '+' });
    fireEvent.click(plusBtn);

    const inputs = screen.getAllByRole('textbox', { name: 'description' });
    expect(inputs.length).toBe(2);
  });

  test('removes an input field when the remove button is clicked', () => {
    render(<CreateTodoForm />);

    const initialInput = screen.getByRole('textbox', { name: 'description' });
    expect(initialInput).toBeInTheDocument();

    const removeButton = screen.getByRole('button', { name: 'remove' });
    fireEvent.click(removeButton);

    const removedInput = screen.queryByRole('textbox', { name: 'description' });
    expect(removedInput).not.toBeInTheDocument();
  });

  test('updates state when input fields change', () => {
    render(<CreateTodoForm />);

    const titleInput = screen.getByPlaceholderText('Title');
    fireEvent.change(titleInput, { target: { value: 'New Todo' } });

    expect(titleInput).toHaveValue('New Todo');
  });

  test('does not call addTodo if title is empty', () => {
    render(<CreateTodoForm />);

    const createButton = screen.getByRole('button', { name: /create/i });
    fireEvent.click(createButton);

    expect(addTodoMock).not.toHaveBeenCalled();
  });
});
