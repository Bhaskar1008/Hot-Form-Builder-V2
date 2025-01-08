import React from 'react';
import { useNestedDrop } from '../../../../hooks/useNestedDrop';
import { FormComponent } from '../../../../types/form';
import { getColumnClasses } from '../utils/columnUtils';
import classNames from 'classnames';

interface GridColumnProps {
  columnId: string;
  columnConfig: {
    size: number;
    offset?: number;
    order?: number;
  };
  components: FormComponent[];
  showBorders?: boolean;
  renderComponent: (component: FormComponent) => React.ReactNode;
}

export const GridColumn: React.FC<GridColumnProps> = ({
  columnId,
  columnConfig,
  components,
  showBorders,
  renderComponent
}) => {
  const [{ isOver, canDrop }, drop] = useNestedDrop({
    parentId: columnId,
    isNested: true // Enable nested drop support
  });

  const columnClasses = getColumnClasses(columnConfig);

  return (
    <div
      ref={drop}
      className={classNames(
        columnClasses,
        'p-4 min-h-[100px] transition-colors',
        {
          'border-right border-gray-200': showBorders // Add column borders when enabled
        },
        isOver && canDrop ? 'ring-2 ring-blue-400 bg-blue-50' : ''
      )}
    >
      {components.length === 0 ? (
        <div className="flex items-center justify-center h-24 text-gray-400">
          Drop components here
        </div>
      ) : (
        <div className="space-y-4">
          {components.map(component => renderComponent(component))}
        </div>
      )}
    </div>
  );
};