import React from 'react';
import { useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { addComponent } from '../../../redux/slices/formSlice';
import { FormComponent } from '../../../types/form';
import classNames from 'classnames';

interface ContainerProps {
  component: FormComponent;
  children?: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ component, children }) => {
  const dispatch = useDispatch();

  const [{ isOver }, drop] = useDrop({
    accept: 'FORM_COMPONENT',
    drop: (item: FormComponent) => {
      dispatch(addComponent({ ...item, parentId: component.id }));
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drop}
      className={classNames(
        'p-4 border rounded-lg',
        isOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300',
        component.settings?.className
      )}
    >
      <div className="text-sm font-medium text-gray-700 mb-2">{component.label}</div>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
};

export default Container;