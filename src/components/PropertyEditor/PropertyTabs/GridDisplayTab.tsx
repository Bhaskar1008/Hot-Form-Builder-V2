import React from 'react';
import { FormComponent } from '../../../types/form';
import PropertyField from '../PropertyField';

interface GridDisplayTabProps {
  component: FormComponent;
  onChange: (updates: Partial<FormComponent>) => void;
}

const GridDisplayTab: React.FC<GridDisplayTabProps> = ({ component, onChange }) => {
  const handleGridChange = (name: string, value: any) => {
    onChange({
      display: {
        ...component.display,
        grid: {
          ...component.display?.grid,
          [name]: value
        }
      }
    });
  };

  const handleColumnChange = (index: number, field: string, value: any) => {
    const columns = [...(component.display?.grid?.columns || [])];
    columns[index] = {
      ...columns[index],
      [field]: value
    };
    handleGridChange('columns', columns);
  };

  const addColumn = () => {
    const columns = [...(component.display?.grid?.columns || [])];
    columns.push({ size: 12, offset: 0, order: 0 });
    handleGridChange('columns', columns);
  };

  const removeColumn = (index: number) => {
    const columns = [...(component.display?.grid?.columns || [])];
    columns.splice(index, 1);
    handleGridChange('columns', columns);
  };

  return (
    <div className="space-y-6">
      <PropertyField
        label="Label"
        type="text"
        value={component.label}
        onChange={(value) => onChange({ label: value })}
        required
      />

      <PropertyField
        label="Alignment"
        type="select"
        value={component.display?.grid?.alignment || 'start'}
        onChange={(value) => handleGridChange('alignment', value)}
        options={[
          { label: 'Start', value: 'start' },
          { label: 'Center', value: 'center' },
          { label: 'End', value: 'end' },
          { label: 'Around', value: 'around' },
          { label: 'Between', value: 'between' }
        ]}
      />

      <PropertyField
        label="Vertical Alignment"
        type="select"
        value={component.display?.grid?.verticalAlignment || 'start'}
        onChange={(value) => handleGridChange('verticalAlignment', value)}
        options={[
          { label: 'Start', value: 'start' },
          { label: 'Center', value: 'center' },
          { label: 'End', value: 'end' }
        ]}
      />

      <PropertyField
        label="No Gutters"
        type="switch"
        value={component.display?.grid?.noGutters || false}
        onChange={(value) => handleGridChange('noGutters', value)}
      />

      <PropertyField
        label="Wrap Columns"
        type="switch"
        value={component.display?.grid?.wrap ?? true}
        onChange={(value) => handleGridChange('wrap', value)}
      />

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-medium text-gray-700">Columns</h3>
          <button
            onClick={addColumn}
            className="px-3 py-1 text-sm text-blue-600 hover:text-blue-700"
          >
            Add Column
          </button>
        </div>

        {(component.display?.grid?.columns || []).map((column, index) => (
          <div key={index} className="p-4 border border-gray-200 rounded-md space-y-4">
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-sm font-medium text-gray-700">Column {index + 1}</h4>
              <button
                onClick={() => removeColumn(index)}
                className="text-red-600 hover:text-red-700"
              >
                Remove
              </button>
            </div>

            <PropertyField
            label="Size"
            type="select"
            value={String(column.size)}
            onChange={(value) => handleColumnChange(index, 'size', parseInt(value, 10))}
            options={Array.from({ length: 12 }, (_, i) => ({
                label: `${i + 1}`,
                value: `${i + 1}`
            }))}
            />

            <PropertyField
            label="Offset"
            type="select"
            value={String(column.offset || 0)}
            onChange={(value) => handleColumnChange(index, 'offset', parseInt(value, 10))}
            options={Array.from({ length: 12 }, (_, i) => ({
                label: `${i}`,
                value: `${i}`
            }))}
            />

            <PropertyField
            label="Order"
            type="select"
            value={String(column.order || 0)}
            onChange={(value) => handleColumnChange(index, 'order', parseInt(value, 10))}
            options={Array.from({ length: 13 }, (_, i) => ({
                label: i === 0 ? 'Default' : `${i}`,
                value: `${i}`
            }))}
            />
            <PropertyField
            label="Show Grid Lines"
            type="switch"
            value={component.display?.grid?.showBorders || false}
            onChange={(value) => handleGridChange('showBorders', value)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GridDisplayTab;