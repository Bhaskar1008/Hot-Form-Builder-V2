import React from 'react';
import { FormComponent } from '../../../types/form';
import PropertyField from '../PropertyField';
import { Info } from 'lucide-react';

interface DataTabProps {
  component: FormComponent;
  onChange: (updates: Partial<FormComponent>) => void;
}

interface DataProperty {
  name: string;
  type: string;
  info?: string;
  placeholder?: string;
  options?: Array<{ label: string; value: string }>;
}

const DataTab: React.FC<DataTabProps> = ({ component, onChange }) => {
  const handleDataChange = (name: string, value: any) => {
    onChange({
      data: {
        ...component.data,
        [name]: value
      }
    });
  };

  const getDataProperties = (): DataProperty[] => {
    const baseProperties: DataProperty[] = [
      {
        name: 'tableView',
        type: 'switch',
        info: 'Show this field in table view'
      },
      {
        name: 'modalEdit',
        type: 'switch',
        info: 'Allow editing this field in a modal'
      }
    ];

    switch (component.type) {
      case 'text':
        return [
          ...baseProperties,
          {
            name: 'defaultValue',
            type: 'text',
            info: 'Default value when form loads',
            placeholder: 'Enter default value'
          },
          {
            name: 'multiple',
            type: 'switch',
            info: 'Allow multiple values'
          },
          {
            name: 'unique',
            type: 'switch',
            info: 'Require unique values'
          },
          {
            name: 'calculateValue',
            type: 'textarea',
            info: 'JavaScript calculation code',
            placeholder: 'value = data.field1 + data.field2;'
          }
        ];

      case 'checkbox':
        return [
          ...baseProperties,
          {
            name: 'defaultValue',
            type: 'switch',
            info: 'Default checked state'
          }
        ];

      case 'radio':
      case 'select':
        return [
          ...baseProperties,
          {
            name: 'defaultValue',
            type: 'text',
            info: 'Default selected value',
            placeholder: 'Enter default value'
          },
          {
            name: 'multiple',
            type: 'switch',
            info: 'Allow multiple selections'
          }
        ];

      case 'datetime':
        return [
          ...baseProperties,
          {
            name: 'defaultValue',
            type: 'text',
            info: 'Default date/time (YYYY-MM-DD HH:mm)',
            placeholder: 'YYYY-MM-DD HH:mm'
          }
        ];

      case 'fileupload':
        return [
          ...baseProperties,
          {
            name: 'multiple',
            type: 'switch',
            info: 'Allow multiple file uploads'
          }
        ];

      default:
        return baseProperties;
    }
  };

  const renderPropertyField = (prop: DataProperty) => (
    <div key={prop.name} className="space-y-1">
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-gray-700">
          {prop.name.split(/(?=[A-Z])/).join(' ').charAt(0).toUpperCase() + 
           prop.name.split(/(?=[A-Z])/).join(' ').slice(1)}
        </label>
        {prop.info && (
          <div className="relative group">
            <Info className="w-4 h-4 text-gray-400" />
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-10">
              {prop.info}
              <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1">
                <div className="border-4 border-transparent border-t-gray-900" />
              </div>
            </div>
          </div>
        )}
      </div>
      <PropertyField
        type={prop.type}
        value={component.data?.[prop.name] ?? ''}
        onChange={(value) => handleDataChange(prop.name, value)}
        placeholder={prop.placeholder}
        options={prop.options}
      />
    </div>
  );

  return (
    <div className="space-y-6">
      {getDataProperties().map(renderPropertyField)}
    </div>
  );
};

export default DataTab;