import { type FC, memo } from 'react';
import module from './AddedInput.module.scss';
import { Input } from 'shared/ui/Input';
import { Button } from 'shared/ui/Button';
import { Plus } from 'entities/Todo';

interface IProps {
  id: string;
  value: string;
  onChange: (id: string, value: string) => void;
  onClick: (id: string) => void;
}

export const AddedInput: FC<IProps> = memo(props => {
  const { id, value, onChange, onClick } = props;

  return (
    <div className={module.wrapper}>
      <Input
        aria-label='description'
        name={`description ${id}`}
        type='text'
        placeholder='Additional Task'
        value={value}
        onChange={value => onChange(id, value)}
      />
      <Button
        aria-label='remove'
        icon
        size='xs'
        mode='ghost'
        className={module.remove}
        onClick={() => onClick(id)}
      >
        <Plus />
      </Button>
    </div>
  );
});
