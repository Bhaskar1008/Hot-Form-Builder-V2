
import React from 'react';
import { useNestedDrop } from '../../../../hooks/useNestedDrop';
import { componentMap } from '../../../../utils/componentMap';
import classNames from 'classnames';

interface StepContentProps {
  stepId: string;
  components: any[];
}

export const StepContent: React.FC<StepContentProps> = ({ stepId, components }) => {
  const [{ isOver, canDrop }, drop] = useNestedDrop({
    parentId: stepId
  });

  return (
    <div
      ref={drop}
      className={classNames(
        'min-h-[200px] p-4 rounded-lg transition-colors',
        isOver && canDrop ? 'bg-blue-50 ring-2 ring-blue-400' : 'bg-white'
      )}
    >
      {components.length === 0 ? (
        <div className="flex items-center justify-center h-full text-gray-400">
          Drop components here
        </div>
      ) : (
        <div className="space-y-4">
          {components.map(component => {
            const Component = componentMap[component.type];
            return Component ? (
              <div key={component.id}>
                <Component component={component} />
              </div>
            ) : null;
          })}
        </div>
      )}
    </div>
  );
};
