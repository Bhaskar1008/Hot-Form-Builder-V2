import React from 'react';
import { FormComponent } from '../../types';

interface ContainerProps {
  component: FormComponent;
  renderComponent: (component: FormComponent) => React.ReactNode;
}

export const Container: React.FC<ContainerProps> = ({ 
  component, 
  renderComponent 
}) => {
  return (
    <div className={`space-y-4 ${component.display?.customClass || ''}`}>
      {component.label && (
        <h3 className="text-lg font-medium text-gray-900">{component.label}</h3>
      )}
      <div className="space-y-4">
        {component.children?.map((child) => renderComponent(child))}
      </div>
    </div>
  );
};