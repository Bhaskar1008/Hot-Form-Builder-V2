import { useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { addComponent } from '../redux/slices/formSlice';
import { FormComponent } from '../types/form';
import { v4 as uuidv4 } from 'uuid';

interface UseNestedDropProps {
  parentId: string;
  accept?: string[];
  onDrop?: (item: FormComponent) => void;
}

export const useNestedDrop = ({ parentId, accept = ['FORM_COMPONENT'], onDrop }: UseNestedDropProps) => {
  const dispatch = useDispatch();

  return useDrop(() => ({
    accept,
    drop: (item: FormComponent, monitor) => {
      if (monitor.didDrop()) {
        return;
      }

      if (onDrop) {
        onDrop(item);
        return;
      }

      const newComponent = {
        ...item,
        id: uuidv4(),
        parentId,
      };

      dispatch(addComponent(newComponent));
      return { dropped: true };
    },
    collect: (monitor) => ({
      isOver: monitor.isOver({ shallow: true }),
      canDrop: monitor.canDrop(),
      isDragging: !!monitor.getItem()
    })
  }), [parentId, onDrop]);
};