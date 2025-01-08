import React from 'react';
import { FormComponent } from '../../../types/form';
import { useNestedDrop } from '../../../hooks/useNestedDrop';
import { componentMap } from '../../../utils/componentMap';
import { GridColumn } from './components/GridColumn';
import { getColumnClasses } from './utils/columnUtils';
import classNames from 'classnames';

interface GridProps {
  component: FormComponent;
}

const Grid: React.FC<GridProps> = ({ component }) => {
  const [{ isOver, canDrop }, drop] = useNestedDrop({
    parentId: component.id,
    isNested: true // Enable nested drop support
  });

  const {
    columns = [{ size: 12, offset: 0, order: 0 }],
    alignment = 'start',
    verticalAlignment = 'start',
    noGutters = false,
    wrap = true,
    showBorders = false // Add border visibility option
  } = component.display?.grid || {};

  const containerClasses = classNames(
    'container-fluid',
    {
      'border border-gray-200 rounded-lg': showBorders // Add border when enabled
    },
    component.display?.customClass
  );

  const rowClasses = classNames(
    'row',
    {
      'no-gutters': noGutters,
      'flex-nowrap': !wrap,
      [`justify-content-${alignment}`]: alignment !== 'start',
      [`align-items-${verticalAlignment}`]: verticalAlignment !== 'start',
      'border-bottom border-gray-200': showBorders // Add row borders when enabled
    }
  );

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {component.label}
        {component.required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <div
        ref={drop}
        className={classNames(
          containerClasses,
          'transition-colors duration-200',
          isOver && canDrop ? 'ring-2 ring-blue-400 bg-blue-50' : ''
        )}
      >
        <div className={rowClasses}>
          {columns.map((column, index) => {
            const columnId = `${component.id}-col-${index}`;
            const columnComponents = component.children?.filter(
              c => c.parentId === columnId
            ) || [];

            return (
              <GridColumn
                key={columnId}
                columnId={columnId}
                columnConfig={column}
                components={columnComponents}
                showBorders={showBorders}
                renderComponent={(component) => {
                  const Component = componentMap[component.type];
                  return Component ? (
                    <Component key={component.id} component={component} />
                  ) : null;
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Grid;