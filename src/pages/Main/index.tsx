import { type FC } from 'react';
import { TodosSection } from 'widgets/TodosSection';
import { Layout } from 'shared/ui/Layout';

export const Main: FC = () => {
  return (
    <Layout>
      <TodosSection />
    </Layout>
  );
};
