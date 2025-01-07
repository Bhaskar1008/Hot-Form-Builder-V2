import React from 'react';
import { FormComponent } from '../../../types/form';
import PropertyField from '../PropertyField';

interface DisplayTabProps {
  component: FormComponent;
  onChange: (updates: Partial<FormComponent>) => void;
}

const DisplayTab: React.FC<DisplayTabProps> = ({ component, onChange }) => {
  const handleDisplayChange = (name: string, value: any) => {
    // Update both display properties and direct component properties for label
    if (name === 'label') {
      onChange({
        label: value,
        display: {
          ...component.display,
          [name]: value
        }
      });
    } else {
      onChange({
        display: {
          ...component.display,
          [name]: value
        }
      });
    }
  };

  const getDisplayProperties = () => {
    const baseProperties = [
      { name: 'label', type: 'text', required: true },
      { name: 'customClass', type: 'text' },
      { name: 'hideLabel', type: 'switch' },
      { name: 'disabled', type: 'switch' }
    ];

    switch (component.type) {
      case 'text':
        return [
          ...baseProperties,
          { name: 'placeholder', type: 'text' },
          { name: 'description', type: 'textarea' },
          { name: 'tooltip', type: 'text' },
          { name: 'prefix', type: 'text' },
          { name: 'suffix', type: 'text' },
          { name: 'showCharCount', type: 'switch' },
          { name: 'showWordCount', type: 'switch' },
          { name: 'spellcheck', type: 'switch' }
        ];

      case 'select':
      case 'radio':
        return [
          ...baseProperties,
          { name: 'description', type: 'textarea' },
          { name: 'tooltip', type: 'text' }
        ];

      case 'checkbox':
        return [
          ...baseProperties,
          { name: 'description', type: 'textarea' }
        ];

      case 'datetime':
      case 'fileupload':
      case 'signature':
      case 'otp':
      case 'tags':
        return [
          ...baseProperties,
          { name: 'placeholder', type: 'text' },
          { name: 'description', type: 'textarea' },
          { name: 'tooltip', type: 'text' }
        ];

      default:
        return baseProperties;
    }
  };

  return (
    <div className="space-y-6">
      {getDisplayProperties().map((prop) => (
        <PropertyField
          key={prop.name}
          label={prop.name.split(/(?=[A-Z])/).join(' ').charAt(0).toUpperCase() + 
                prop.name.split(/(?=[A-Z])/).join(' ').slice(1)}
          type={prop.type}
          value={prop.name === 'label' ? component.label : (component.display?.[prop.name] ?? '')}
          onChange={(value) => handleDisplayChange(prop.name, value)}
          required={prop.required}
        />
      ))}
    </div>
  );
};

export default DisplayTab;