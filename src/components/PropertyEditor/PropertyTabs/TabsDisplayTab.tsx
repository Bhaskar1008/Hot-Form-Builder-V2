import React from 'react';
import { FormComponent } from '../../../types/form';
import PropertyField from '../PropertyField';

interface TabsDisplayTabProps {
  component: FormComponent;
  onChange: (updates: Partial<FormComponent>) => void;
}

const TabsDisplayTab: React.FC<TabsDisplayTabProps> = ({ component, onChange }) => {
  const handleDisplayChange = (name: string, value: any) => {
    onChange({
      display: {
        ...component.display,
        [name]: value
      }
    });
  };

  return (
    <div className="space-y-6">
      <PropertyField
        label="Label"
        type="text"
        value={component.display?.label || ''}
        onChange={(value) => handleDisplayChange('label', value)}
        required
      />

      <PropertyField
        label="Orientation"
        type="select"
        value={component.display?.orientation || 'horizontal'}
        onChange={(value) => handleDisplayChange('orientation', value)}
        options={[
          { label: 'Horizontal', value: 'horizontal' },
          { label: 'Vertical', value: 'vertical' }
        ]}
      />

      <PropertyField
        label="Show Border"
        type="switch"
        value={component.display?.showBorder ?? true}
        onChange={(value) => handleDisplayChange('showBorder', value)}
      />

      <PropertyField
        label="Rounded Corners"
        type="switch"
        value={component.display?.rounded ?? true}
        onChange={(value) => handleDisplayChange('rounded', value)}
      />

      <PropertyField
        label="Shadow"
        type="switch"
        value={component.display?.shadow ?? true}
        onChange={(value) => handleDisplayChange('shadow', value)}
      />

      <PropertyField
        label="Custom Class"
        type="text"
        value={component.display?.customClass || ''}
        onChange={(value) => handleDisplayChange('customClass', value)}
      />
    </div>
  );
};

export default TabsDisplayTab;