import React, { useState } from 'react';
import { FormComponent } from '../../types';

interface TabsProps {
  component: FormComponent;
  renderComponent: (component: FormComponent) => React.ReactNode;
}

export const Tabs: React.FC<TabsProps> = ({ 
  component, 
  renderComponent 
}) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {component.label}
        {component.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="border rounded-lg">
        <div className="flex border-b">
          {component.children?.map((child, index) => (
            <button
              key={child.id}
              onClick={() => setActiveTab(index)}
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === index
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {child.label}
            </button>
          ))}
        </div>
        <div className="p-4">
          {component.children?.[activeTab] && 
            renderComponent(component.children[activeTab])}
        </div>
      </div>
    </div>
  );
};
