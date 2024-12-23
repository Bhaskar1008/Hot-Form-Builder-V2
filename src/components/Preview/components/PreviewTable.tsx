import React from 'react';
import { FormComponent } from '../../../types/form';

interface PreviewTableProps {
  component: FormComponent;
  renderComponent: (component: FormComponent) => React.ReactNode;
}

const PreviewTable: React.FC<PreviewTableProps> = ({ component, renderComponent }) => {
  return (
    <div className="mb-4">
      {component.label && (
        <h3 className="text-lg font-medium text-gray-900 mb-2">{component.label}</h3>
      )}
      <div className="overflow-x-auto">
        <table className={`min-w-full divide-y divide-gray-200 ${component.display?.customClass || ''}`}>
          {component.display?.showHeaders && (
            <thead className="bg-gray-50">
              <tr>
                {component.display.headers?.map((header, index) => (
                  <th
                    key={index}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {header.label}
                  </th>
                ))}
              </tr>
            </thead>
          )}
          <tbody className="bg-white divide-y divide-gray-200">
            {Array(component.display?.rowCount || 3).fill(null).map((_, rowIndex) => (
              <tr key={rowIndex}>
                {Array(component.display?.columnCount || 3).fill(null).map((_, colIndex) => {
                  const cellId = `cell-${component.id}-${rowIndex}-${colIndex}`;
                  const cellComponents = component.children?.filter(c => c.parentId === cellId);
                  return (
                    <td key={colIndex} className="px-6 py-4">
                      {cellComponents?.map(child => renderComponent(child))}
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

export default PreviewTable;