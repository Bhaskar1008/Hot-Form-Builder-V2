import React from 'react';
import classNames from 'classnames';
import type { TableHeaderProps } from '../types';

export const TableHeader: React.FC<TableHeaderProps> = ({ headers, showBorders }) => {
  return (
    <thead className="bg-gray-50">
      <tr>
        {headers.map((header) => (
          <th
            key={header.value}
            className={classNames(
              'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider',
              showBorders && 'border border-gray-200'
            )}
          >
            {header.label}
          </th>
        ))}
      </tr>
    </thead>
  );
};