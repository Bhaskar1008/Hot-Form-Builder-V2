import React, { useState } from 'react';
import { FormComponent } from '../../../types/form';
import classNames from 'classnames';

interface TabsProps {
  component: FormComponent;
  children?: React.ReactNode;
}

const Tabs: React.FC<TabsProps> = ({ component, children }) => {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = component.settings?.tabs || [];

  return (
    <div className="mb-4">
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {tabs.map((tab: { label: string }, index: number) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={classNames(
                'py-2 px-1 border-b-2 text-sm font-medium',
                activeTab === index
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              )}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
      <div className="mt-4">
        {tabs[activeTab]?.content}
        {children}
      </div>
    </div>
  );
};

export default Tabs;