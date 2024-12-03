import React from 'react';
import { FormComponent } from '../../../types/form';
import { LogicPropertiesType } from '../../../types/propertyTypes';
import PropertyField from '../PropertyField';

interface LogicTabProps {
  component: FormComponent;
  onChange: (updates: Partial<FormComponent>) => void;
}

const LogicTab: React.FC<LogicTabProps> = ({ component, onChange }) => {
  const logic = component.logic || {
    conditional: {
      show: null,
      when: null,
      eq: ''
    }
  };

  const handleLogicChange = (key: string, value: any) => {
    onChange({
      logic: {
        ...logic,
        [key]: value
      }
    });
  };

  const handleConditionalChange = (key: string, value: any) => {
    onChange({
      logic: {
        ...logic,
        conditional: {
          ...logic.conditional,
          [key]: value
        }
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h4 className="text-sm font-medium text-gray-900 mb-4">Conditional Logic</h4>
        
        <div className="space-y-4">
          <PropertyField
            label="Show When"
            type="select"
            value={logic.conditional.when || ''}
            options={[
              { label: 'Select field...', value: '' },
              { label: 'Field 1', value: 'field1' },
              { label: 'Field 2', value: 'field2' }
            ]}
            onChange={(value) => handleConditionalChange('when', value)}
          />

          <PropertyField
            label="Equals"
            type="text"
            value={logic.conditional.eq}
            onChange={(value) => handleConditionalChange('eq', value)}
            placeholder="Enter value to compare"
          />
        </div>
      </div>

      <PropertyField
        label="Custom Conditional Logic"
        type="textarea"
        value={logic.customConditional || ''}
        onChange={(value) => handleLogicChange('customConditional', value)}
        placeholder="Enter custom JavaScript condition"
      />

      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h4 className="text-sm font-medium text-gray-900 mb-4">Calculation Settings</h4>
        
        <div className="space-y-4">
          <PropertyField
            label="Calculate Value"
            type="textarea"
            value={logic.calculateValue || ''}
            onChange={(value) => handleLogicChange('calculateValue', value)}
            placeholder="Enter calculation JavaScript"
          />

          <PropertyField
            label="Allow Calculate Override"
            type="switch"
            value={logic.allowCalculateOverride || false}
            onChange={(value) => handleLogicChange('allowCalculateOverride', value)}
          />
        </div>
      </div>
    </div>
  );
};

export default LogicTab;