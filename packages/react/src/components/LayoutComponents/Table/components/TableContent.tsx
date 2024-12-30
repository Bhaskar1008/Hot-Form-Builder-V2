import React from 'react';
import { componentMap } from '../../../../utils/componentMap';
import classNames from 'classnames';
import type { TableContentProps } from '../types';

export const TableContent: React.FC<TableContentProps> = ({
  component,
  showBorders,
  striped,
  hover
}) => {
  const rowCount = component.display?.rowCount || 3;
  const columnCount = component.display?.columnCount || 3;
  const rows = Array(rowCount).fill(null);

  return (
    <tbody className="bg-white divide-y divide-gray-200">
      {rows.map((_, rowIndex) => (
        <tr 
          key={`row-${rowIndex}`}
          className={classNames(
            striped && rowIndex % 2 === 0 && 'bg-gray-50',
            hover && 'hover:bg-gray-100'
          )}
        >
          {Array(columnCount).fill(null).map((_, colIndex) => {
            const cellId = `cell-${component.id}-${rowIndex}-${colIndex}`;
            const cellComponents = component.children?.filter(c => c.parentId === cellId);
            
            return (
              <td 
                key={`cell-${rowIndex}-${colIndex}`}
                className={classNames(
                  'px-6 py-4',
                  showBorders && 'border border-gray-200'
                )}
              >
                {cellComponents?.map(child => {
                  const Component = componentMap[child.type];
                  return Component ? (
                    <Component key={child.id} component={child} />
                  ) : null;
                })}
              </td>
            );
          })}
        </tr>
      ))}
    </tbody>
  );
};