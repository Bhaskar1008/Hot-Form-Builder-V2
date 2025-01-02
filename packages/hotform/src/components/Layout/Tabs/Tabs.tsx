import React, { useState } from 'react';
import { FormComponent } from '../../../types/form';
import { useNestedDrop } from '../../../hooks/useNestedDrop';
import { componentMap } from '../../../utils/componentMap';
import classNames from 'classnames';

interface TabsProps {
  component: FormComponent;
}

const Tabs: React.FC<TabsProps> = ({ component }) => {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = component.display?.tabs || [];
  const orientation = component.display?.orientation || 'horizontal';

  const [{ isOver, canDrop }, drop] = useNestedDrop({
    parentId: component.id
  });

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {component.label}
        {component.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <div className={classNames(
        'border border-gray-200 rounded-lg',
        component.display?.customClass,
        orientation === 'vertical' ? 'flex' : 'block'
      )}>
        <div className={classNames(
          'bg-gray-50',
          orientation === 'vertical' ? 'w-48 border-r' : 'border-b'
        )}>
          <div className={classNames(
            'flex gap-1 p-2',
            orientation === 'vertical' ? 'flex-col' : 'flex-row'
          )}>
            {tabs.map((tab, index) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(index)}
                className={classNames(
                  'px-4 py-2 text-sm font-medium rounded-md transition-colors',
                  activeTab === index
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div 
          ref={drop}
          className={classNames(
            'flex-1 p-4 transition-colors',
            isOver && canDrop ? 'bg-blue-50 ring-2 ring-blue-400' : 'bg-white'
          )}
        >
          {tabs.map((tab, index) => {
            if (activeTab !== index) return null;
            
            const tabComponents = component.children?.filter(
              c => c.parentId === `${component.id}-${tab.id}`
            );

            return tabComponents?.length ? (
              <div key={tab.id} className="space-y-4">
                {tabComponents.map(child => {
                  const Component = componentMap[child.type];
                  return Component ? (
                    <div key={child.id}>
                      <Component component={child} />
                    </div>
                  ) : null;
                })}
              </div>
            ) : (
              <div className="flex items-center justify-center h-24 text-gray-400">
                Drop components here
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Tabs;