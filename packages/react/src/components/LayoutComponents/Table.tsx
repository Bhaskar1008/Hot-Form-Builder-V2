import React from 'react';
import { FormComponent } from '../../types';

interface TableProps {
  component: FormComponent;
  renderComponent: (component: FormComponent) => React.ReactNode;
}

export const Table: React.FC<TableProps> = ({ 
  component, 
  renderComponent 
}) => {
  return (
    <div className="space-y-4">
      {component.label && (
        <h3 className="text-lg font-medium text-gray-900">{component.label}</h3>
      )}
      <div className="overflow-x-auto">
        <table className={`min-w-full divide-y divide-gray-200 ${component.display?.customClass || ''}`}>
          {component.children?.map((child) => renderComponent(child))}
        </table>
      </div>
    </div>
  );
};