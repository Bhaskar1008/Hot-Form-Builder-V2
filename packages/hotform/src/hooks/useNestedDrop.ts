import { useDrop } from 'react-dnd';
import { FormComponent } from '../types/form';

interface UseNestedDropProps {
  parentId: string;
  onDrop?: (component: FormComponent) => void;
}

export const useNestedDrop = ({ parentId, onDrop }: UseNestedDropProps) => {
  return useDrop(() => ({
    accept: 'FORM_COMPONENT',
    drop: (item: FormComponent, monitor) => {
      if (!monitor.didDrop()) {
        if (onDrop) {
          onDrop(item);
        }
        return { dropped: true };
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver({ shallow: true }),
      canDrop: monitor.canDrop()
    })
  }), [parentId, onDrop]);
};