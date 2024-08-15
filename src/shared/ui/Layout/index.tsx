import { FilterPanel } from 'widgets/FilterPanel';
import type { FC, PropsWithChildren } from 'react';

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <h1>Mindbox todo's</h1>
      <FilterPanel />
      {children}
    </>
  );
};
