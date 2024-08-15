import { type FC } from 'react';
import { Layout } from 'shared/ui/Layout';
import { CreateTodoForm } from 'features/createTodo';

export const Create: FC = () => {
  return (
    <Layout>
      <CreateTodoForm />
    </Layout>
  );
};
