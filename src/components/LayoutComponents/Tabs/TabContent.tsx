import React from 'react';
import { useDispatch } from 'react-redux';
import { removeComponent, setSelectedComponent } from '../../../redux/slices/formSlice';
import { useComponentTree } from '../../../hooks/useComponentTree';
import { useDropTarget } from '../../../hooks/useDropTarget';
import { TabComponent } from './components/TabComponent';
import classNames from 'classnames';

interface TabContentProps {
  tabId: string;
  parentId: string;
  isActive: boolean;
}

const TabContent: React.FC<TabContentProps> = ({ tabId, parentId, isActive }) => {
  const dispatch = useDispatch();
  const tabContentId = `${parentId}-${tabId}`;
  const { components, addComponent } = useComponentTree(tabContentId);
  const [{ isOver }, drop] = useDropTarget({ onDrop: addComponent });

  if (!isActive) return null;

  return (
    <div
      ref={drop}
      className={classNames(
        'min-h-[200px] p-4 rounded-lg transition-colors',
        isOver ? 'bg-blue-50 ring-2 ring-blue-400' : 'bg-white',
        components.length === 0 && 'flex items-center justify-center'
      )}
    >
      {components.length === 0 ? (
        <div className="text-gray-400 text-sm">
          Drop components here
        </div>
      ) : (
        <div className="space-y-4">
          {components.map(component => (
            <TabComponent
              key={component.id}
              component={component}
              onSelect={() => dispatch(setSelectedComponent(component.id))}
              onRemove={() => dispatch(removeComponent(component.id))}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TabContent;