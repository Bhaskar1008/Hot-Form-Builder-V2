import React from 'react';
import { FormComponent } from '../../../types/form';
import { ValidationPropertiesType } from '../../../types/propertyTypes';
import PropertyField from '../PropertyField';

interface ValidationTabProps {
  component: FormComponent;
  onChange: (updates: Partial<FormComponent>) => void;
}

const ValidationTab: React.FC<ValidationTabProps> = ({ component, onChange }) => {
  const validation = component.validation || {};

  const handleValidationChange = (key: string, value: any) => {
    onChange({
      validation: {
        ...validation,
        [key]: value
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <PropertyField
          label="Required"
          type="switch"
          value={validation.required || false}
          onChange={(value) => handleValidationChange('required', value)}
        />

        <PropertyField
          label="Validate On"
          type="select"
          value={validation.validateOn || 'change'}
          options={[
            { label: 'Change', value: 'change' },
            { label: 'Blur', value: 'blur' }
          ]}
          onChange={(value) => handleValidationChange('validateOn', value)}
        />
      </div>

      <PropertyField
        label="Custom Validation"
        type="textarea"
        value={validation.custom || ''}
        onChange={(value) => handleValidationChange('custom', value)}
        placeholder="Enter custom validation JavaScript"
      />

      <div className="grid grid-cols-2 gap-4">
        <PropertyField
          label="Minimum Length"
          type="number"
          value={validation.minLength || ''}
          onChange={(value) => handleValidationChange('minLength', value)}
        />

        <PropertyField
          label="Maximum Length"
          type="number"
          value={validation.maxLength || ''}
          onChange={(value) => handleValidationChange('maxLength', value)}
        />
      </div>

      <PropertyField
        label="Pattern (Regex)"
        type="text"
        value={validation.pattern || ''}
        onChange={(value) => handleValidationChange('pattern', value)}
        placeholder="Enter regex pattern"
      />

      <div className="grid grid-cols-2 gap-4">
        <PropertyField
          label="Custom Private"
          type="switch"
          value={validation.customPrivate || false}
          onChange={(value) => handleValidationChange('customPrivate', value)}
        />

        <PropertyField
          label="Strict Date"
          type="switch"
          value={validation.strictDateValidation || false}
          onChange={(value) => handleValidationChange('strictDateValidation', value)}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <PropertyField
          label="Multiple"
          type="switch"
          value={validation.multiple || false}
          onChange={(value) => handleValidationChange('multiple', value)}
        />

        <PropertyField
          label="Unique"
          type="switch"
          value={validation.unique || false}
          onChange={(value) => handleValidationChange('unique', value)}
        />
      </div>

      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h4 className="text-sm font-medium text-gray-900 mb-2">Custom Error Messages</h4>
        <div className="space-y-4">
          <PropertyField
            label="Required Message"
            type="text"
            value={validation.errorMessage?.required || ''}
            onChange={(value) => handleValidationChange('errorMessage', {
              ...validation.errorMessage,
              required: value
            })}
            placeholder="Custom message for required field"
          />

          <PropertyField
            label="Pattern Message"
            type="text"
            value={validation.errorMessage?.pattern || ''}
            onChange={(value) => handleValidationChange('errorMessage', {
              ...validation.errorMessage,
              pattern: value
            })}
            placeholder="Custom message for pattern mismatch"
          />

          <PropertyField
            label="Custom Message"
            type="text"
            value={validation.errorMessage?.custom || ''}
            onChange={(value) => handleValidationChange('errorMessage', {
              ...validation.errorMessage,
              custom: value
            })}
            placeholder="Custom validation message"
          />
        </div>
      </div>
    </div>
  );
};

export default ValidationTab;