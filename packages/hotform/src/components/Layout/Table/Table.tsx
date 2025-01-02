import React from 'react';
import { FormComponent } from '../../../types/form';
import { useNestedDrop } from '../../../hooks/useNestedDrop';
import { componentMap } from '../../../utils/componentMap';
import classNames from 'classnames';

interface TableProps {
  component: FormComponent;
}

const Table: React.FC<TableProps> = ({ component }) => {
  const {
    rowCount = 3,
    columnCount = 3,
    showHeaders = false,
    headers = [],
    showBorders = true,
    striped = false,
    hover = true
  } = component.display || {};

  const tableHeaders = headers.length > 0 
    ? headers 
    : Array(columnCount).fill(null).map((_, index) => ({
        label: `Column ${index + 1}`,
        value: `column-${index + 1}`
      }));

  const rows = Array(rowCount).fill(null);

  const [{ isOver, canDrop }, drop] = useNestedDrop({
    parentId: component.id
  });

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {component.label}
        {component.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <div 
        ref={drop}
        className={classNames(
          'overflow-x-auto rounded-lg transition-colors',
          isOver && canDrop ? 'ring-2 ring-blue-400 bg-blue-50' : ''
        )}
      >
        <table className={classNames(
          'min-w-full divide-y divide-gray-200',
          showBorders && 'border border-gray-200',
          component.display?.customClass
        )}>
          {showHeaders && (
            <thead className="bg-gray-50">
              <tr>
                {tableHeaders.map((header) => (
                  <th
                    key={header.value}
                    className={classNames(
                      'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider',
                      showBorders && 'border-b border-gray-200'
                    )}
                  >
                    {header.label}
                  </th>
                ))}
              </tr>
            </thead>
          )}
          <tbody className="bg-white divide-y divide-gray-200">
            {rows.map((_, rowIndex) => (
              <tr 
                key={rowIndex}
                className={classNames(
                  striped && rowIndex % 2 === 0 && 'bg-gray-50',
                  hover && 'hover:bg-gray-100'
                )}
              >
                {tableHeaders.map((_, colIndex) => {
                  const cellId = `cell-${component.id}-${rowIndex}-${colIndex}`;
                  const cellComponents = component.children?.filter(c => c.parentId === cellId);
                  
                  return (
                    <td 
                      key={`${rowIndex}-${colIndex}`}
                      className={classNames(
                        'px-6 py-4',
                        showBorders && 'border border-gray-200'
                      )}
                    >
                      {cellComponents?.map(child => {
                        const Component = componentMap[child.type];
                        return Component ? (
                          <div key={child.id}>
                            <Component component={child} />
                          </div>
                        ) : null;
                      })}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;