import React from 'react';
import { FormComponent } from '../../../types/form';
import classNames from 'classnames';

interface TableProps {
  component: FormComponent;
  children?: React.ReactNode;
}

const Table: React.FC<TableProps> = ({ component, children }) => {
  const columns = component.settings?.columns || [];
  const rows = component.settings?.rows || [];

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {component.label}
      </label>
      <div className="overflow-x-auto">
        <table className={classNames(
          'min-w-full divide-y divide-gray-200',
          component.settings?.className
        )}>
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column: string, index: number) => (
                <th
                  key={index}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {rows.map((row: any[], rowIndex: number) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;