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

    expect(screen.getByPlaceholderText('Title')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '+' })).toBeInTheDocument();
  });

  test('adds a new input field when "+" button is clicked', () => {
    render(<CreateTodoForm />);

    const addButton = screen.getByRole('button', { name: '+' });
    fireEvent.click(addButton);

    const inputs = screen.getAllByPlaceholderText('Title');
    expect(inputs.length).toBe(1);
  });

  test('removes an input field when the remove button is clicked', () => {
    render(<CreateTodoForm />);

    const addButton = screen.getByRole('button', { name: '+' });
    fireEvent.click(addButton);

    let inputs = screen.getAllByPlaceholderText('Title');
    expect(inputs.length).toBe(1);

    const removeButton = screen.getByText(/remove/i); // Assuming the button text is "remove"
    fireEvent.click(removeButton);

    inputs = screen.getAllByPlaceholderText('Title');
    expect(inputs.length).toBe(1);
  });

  test('updates state when input fields change', () => {
    render(<CreateTodoForm />);

    const titleInput = screen.getByPlaceholderText('Title');
    fireEvent.change(titleInput, { target: { value: 'New Todo' } });

    expect(titleInput).toHaveValue('New Todo');
  });

  test('calls addTodo and resets form when "Create" button is clicked with valid inputs', () => {
    render(<CreateTodoForm />);

    const titleInput = screen.getByPlaceholderText('Title');
    fireEvent.change(titleInput, { target: { value: 'New Todo' } });

    const createButton = screen.getByRole('button', { name: /create/i });
    fireEvent.click(createButton);

    expect(addTodoMock).toHaveBeenCalledWith({
      title: 'New Todo',
      id: expect.any(String),
      todos: expect.any(Array)
    });

    expect(titleInput).toHaveValue('');
    expect(screen.getAllByPlaceholderText('Title').length).toBe(1);
  });

  test('does not call addTodo if title is empty', () => {
    render(<CreateTodoForm />);

    const createButton = screen.getByRole('button', { name: /create/i });
    fireEvent.click(createButton);

    expect(addTodoMock).not.toHaveBeenCalled();
  });

  test('does not call addTodo if there are no todos', () => {
    render(<CreateTodoForm />);

    const titleInput = screen.getByPlaceholderText('Title');
    fireEvent.change(titleInput, { target: { value: 'New Todo' } });

    const createButton = screen.getByRole('button', { name: /create/i });
    fireEvent.click(createButton);

    expect(addTodoMock).not.toHaveBeenCalled();
  });
});
