import { type FC, memo } from 'react';
import module from './FilterPanel.module.scss';
import { Button } from 'shared/ui/Button';
import { RouterPath } from 'app/router';
import { useLocation } from 'react-router-dom';

export const FilterPanel: FC = memo(() => {
  const { pathname } = useLocation();

  const items: Record<RouterPath, string> = {
    [RouterPath.Create]: 'Create',
    [RouterPath.Main]: 'Todos'
  };

  return (
    <ul className={module.wrapper}>
      {Object.entries(items).map(([link, name]) => (
        <li key={link}>
          <Button link to={link} isActive={pathname === link} size='xs'>
            {name}
          </Button>
        </li>
      ))}
    </ul>
  );
});
