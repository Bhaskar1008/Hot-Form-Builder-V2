import React from 'react';
import { FormComponent } from '../../../types/form';
import { DisplayPropertiesType } from '../../../types/propertyTypes';
import PropertyField from '../PropertyField';

interface DisplayTabProps {
  component: FormComponent;
  onChange: (updates: Partial<FormComponent>) => void;
}

const DisplayTab: React.FC<DisplayTabProps> = ({ component, onChange }) => {
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
        label="Label Position"
        type="select"
        value={component.labelPosition || 'top'}
        options={[
          { label: 'Top', value: 'top' },
          { label: 'Left', value: 'left' },
          { label: 'Right', value: 'right' },
          { label: 'Bottom', value: 'bottom' },
        ]}
        onChange={(value) => onChange({ labelPosition: value })}
      />

      <PropertyField
        label="Placeholder"
        type="text"
        value={component.placeholder || ''}
        onChange={(value) => onChange({ placeholder: value })}
      />

      <PropertyField
        label="Description"
        type="textarea"
        value={component.description || ''}
        onChange={(value) => onChange({ description: value })}
      />

      <PropertyField
        label="Tooltip"
        type="text"
        value={component.tooltip || ''}
        onChange={(value) => onChange({ tooltip: value })}
      />

      <div className="grid grid-cols-2 gap-4">
        <PropertyField
          label="Prefix"
          type="text"
          value={component.prefix || ''}
          onChange={(value) => onChange({ prefix: value })}
        />

        <PropertyField
          label="Suffix"
          type="text"
          value={component.suffix || ''}
          onChange={(value) => onChange({ suffix: value })}
        />
      </div>

      <PropertyField
        label="Custom CSS Class"
        type="text"
        value={component.customClass || ''}
        onChange={(value) => onChange({ customClass: value })}
      />

      <div className="grid grid-cols-2 gap-4">
        <PropertyField
          label="Show Character Count"
          type="switch"
          value={component.showCharCount || false}
          onChange={(value) => onChange({ showCharCount: value })}
        />

        <PropertyField
          label="Show Word Count"
          type="switch"
          value={component.showWordCount || false}
          onChange={(value) => onChange({ showWordCount: value })}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <PropertyField
          label="Hide Label"
          type="switch"
          value={component.hideLabel || false}
          onChange={(value) => onChange({ hideLabel: value })}
        />

        <PropertyField
          label="Disabled"
          type="switch"
          value={component.disabled || false}
          onChange={(value) => onChange({ disabled: value })}
        />
      </div>

      <PropertyField
        label="Spellcheck"
        type="switch"
        value={component.spellcheck || false}
        onChange={(value) => onChange({ spellcheck: value })}
      />
    </div>
  );
};

export default DisplayTab;