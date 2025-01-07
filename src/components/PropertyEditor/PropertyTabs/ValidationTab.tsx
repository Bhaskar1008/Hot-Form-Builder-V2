import React from 'react';
import { FormComponent } from '../../../types/form';
import PropertyField from '../PropertyField';
import { Info } from 'lucide-react';

interface ValidationTabProps {
  component: FormComponent;
  onChange: (updates: Partial<FormComponent>) => void;
}

interface ValidationProperty {
  name: string;
  type: string;
  info?: string;
  options?: Array<{ label: string; value: string }>;
  min?: number;
  max?: number;
  placeholder?: string;
}

const ValidationTab: React.FC<ValidationTabProps> = ({ component, onChange }) => {
  const handleValidationChange = (name: string, value: any) => {
    onChange({
      validation: {
        ...component.validation,
        [name]: value
      }
    });
  };

  const getValidationProperties = (): ValidationProperty[] => {
    const baseProperties: ValidationProperty[] = [
      {
        name: 'required',
        type: 'switch',
        info: 'Make this field required'
      },
      {
        name: 'validateOn',
        type: 'select',
        info: 'When to trigger validation',
        options: [
          { label: 'Change', value: 'change' },
          { label: 'Blur', value: 'blur' }
        ]
      }
    ];

    switch (component.type) {
      case 'text':
        return [
          ...baseProperties,
          {
            name: 'minLength',
            type: 'number',
            info: 'Minimum number of characters',
            min: 0
          },
          {
            name: 'maxLength',
            type: 'number',
            info: 'Maximum number of characters',
            min: 0
          },
          {
            name: 'pattern',
            type: 'text',
            info: 'Regular expression pattern',
            placeholder: '^[A-Za-z]+$'
          },
          {
            name: 'custom',
            type: 'textarea',
            info: 'Custom error message',
            placeholder: 'Enter custom error message'
          }
        ];

      case 'datetime':
        return [
          ...baseProperties,
          {
            name: 'strictDateValidation',
            type: 'switch',
            info: 'Enforce strict date format validation'
          }
        ];

      case 'otp':
        return [
          ...baseProperties,
          {
            name: 'minLength',
            type: 'number',
            info: 'Minimum number of digits',
            min: 0
          },
          {
            name: 'maxLength',
            type: 'number',
            info: 'Maximum number of digits',
            min: 0
          }
        ];

      default:
        return baseProperties;
    }
  };

  const renderPropertyField = (prop: ValidationProperty) => (
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
        value={component.validation?.[prop.name] ?? ''}
        onChange={(value) => handleValidationChange(prop.name, value)}
        options={prop.options}
        min={prop.min}
        max={prop.max}
        placeholder={prop.placeholder}
      />
    </div>
  );

  return (
    <div className="space-y-6">
      {getValidationProperties().map(renderPropertyField)}
    </div>
  );
};

export default ValidationTab;