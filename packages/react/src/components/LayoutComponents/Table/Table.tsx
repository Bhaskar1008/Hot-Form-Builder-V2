import React from 'react';
import { TableHeader } from './components/TableHeader';
import { TableContent } from './components/TableContent';
import classNames from 'classnames';
import type { TableProps } from './types';

const Table: React.FC<TableProps> = ({ component }) => {
  const {
    showHeaders = false,
    headers = [],
    showBorders = true,
    striped = false,
    hover = true,
    columnCount = 3
  } = component.display || {};

  const tableHeaders = headers.length > 0 
    ? headers 
    : Array(columnCount).fill(null).map((_, index) => ({
        label: `Column ${index + 1}`,
        value: `column-${index + 1}`
      }));

  return (
    <div className="mb-4">
      {component.label && (
        <h3 className="text-lg font-medium text-gray-900 mb-2">{component.label}</h3>
      )}
      <div className="overflow-x-auto">
        <table className={classNames(
          'min-w-full divide-y divide-gray-200',
          showBorders && 'border border-gray-200',
          component.display?.customClass
        )}>
          {showHeaders && (
            <TableHeader 
              headers={tableHeaders}
              showBorders={showBorders}
            />
          )}
          <TableContent
            component={component}
            showBorders={showBorders}
            striped={striped}
            hover={hover}
          />
        </table>
      </div>
    </div>
  );
};

export default Table;