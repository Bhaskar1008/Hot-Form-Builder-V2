import React from 'react';
import { FormComponent } from '../../../types/form';

interface PreviewContainerProps {
  component: FormComponent;
  renderComponent: (component: FormComponent) => React.ReactNode;
}

const PreviewContainer: React.FC<PreviewContainerProps> = ({ component, renderComponent }) => {
  return (
    <div 
      className={`p-4 rounded-lg border border-gray-200 ${component.display?.customClass || ''}`}
    >
      <h3 className="text-lg font-medium text-gray-900 mb-4">{component.label}</h3>
      {component.children?.map(child => renderComponent(child))}
    </div>
  );
};

export default PreviewContainer;