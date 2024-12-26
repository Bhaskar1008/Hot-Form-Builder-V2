import React, { useState } from 'react';
import { FormComponent } from '../../types';

interface CollapseProps {
  component: FormComponent;
  renderComponent: (component: FormComponent) => React.ReactNode;
}

export const Collapse: React.FC<CollapseProps> = ({ 
  component, 
  renderComponent 
}) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={`space-y-4 ${component.display?.customClass || ''}`}>
      {component.label && (
        <h3 className="text-lg font-medium text-gray-900">{component.label}</h3>
      )}
      <div className="border rounded-lg">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-2 text-left text-sm font-medium text-gray-900 bg-gray-50 hover:bg-gray-100"
        >
          {component.display?.collapseTitle || 'Toggle'}
        </button>
        {isOpen && (
          <div className="p-4">
            {component.children?.map((child) => renderComponent(child))}
          </div>
        )}
      </div>
    </div>
  );
};