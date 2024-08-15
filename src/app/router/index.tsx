import { Main as MainPage } from 'pages/Main';
import { Create as CreatePage } from 'pages/Create';

import type { RouteObject } from 'react-router-dom';

export enum RouterPath {
  Main = '/',
  Create = '/create'
}

export const AppRouter: RouteObject[] = [
  {
    path: RouterPath.Main,
    element: <MainPage />
  },
  {
    path: RouterPath.Create,
    element: <CreatePage />
  }
];
