import { useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { addComponent } from '../redux/slices/formSlice';
import { FormComponent } from '../types/form';
import { v4 as uuidv4 } from 'uuid';

export const useNestedDrop = (parentId: string) => {
  const dispatch = useDispatch();

  return useDrop(() => ({
    accept: 'FORM_COMPONENT',
    drop: (item: FormComponent, monitor) => {
      if (monitor.didDrop()) {
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
      canDrop: monitor.canDrop()
    }),
    hover: (_, monitor) => {
      return !monitor.isOver({ shallow: true });
    }
  }), [parentId]);
};