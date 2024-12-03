import React from 'react';
import { FormComponent } from '../../../types/form';
import { DataPropertiesType } from '../../../types/propertyTypes';
import PropertyField from '../PropertyField';

interface DataTabProps {
  component: FormComponent;
  onChange: (updates: Partial<FormComponent>) => void;
}

const DataTab: React.FC<DataTabProps> = ({ component, onChange }) => {
  return (
    <div className="space-y-6">
      <PropertyField
        label="Default Value"
        type="text"
        value={component.defaultValue || ''}
        onChange={(value) => onChange({ defaultValue: value })}
      />

      <div className="grid grid-cols-2 gap-4">
        <PropertyField
          label="Multiple Values"
          type="switch"
          value={component.multiple || false}
          onChange={(value) => onChange({ multiple: value })}
        />

        <PropertyField
          label="Unique"
          type="switch"
          value={component.unique || false}
          onChange={(value) => onChange({ unique: value })}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <PropertyField
          label="Persistent"
          type="switch"
          value={component.persistent || false}
          onChange={(value) => onChange({ persistent: value })}
        />

        <PropertyField
          label="Protected"
          type="switch"
          value={component.protected || false}
          onChange={(value) => onChange({ protected: value })}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <PropertyField
          label="Table View"
          type="switch"
          value={component.tableView || false}
          onChange={(value) => onChange({ tableView: value })}
        />

        <PropertyField
          label="Modal Edit"
          type="switch"
          value={component.modalEdit || false}
          onChange={(value) => onChange({ modalEdit: value })}
        />
      </div>

      <PropertyField
        label="Calculate Value"
        type="textarea"
        value={component.calculateValue || ''}
        onChange={(value) => onChange({ calculateValue: value })}
        placeholder="Enter JavaScript code for calculated value"
      />

      <div className="grid grid-cols-2 gap-4">
        <PropertyField
          label="Calculate on Server"
          type="switch"
          value={component.calculateServer || false}
          onChange={(value) => onChange({ calculateServer: value })}
        />

        <PropertyField
          label="Allow Override"
          type="switch"
          value={component.allowCalculateOverride || false}
          onChange={(value) => onChange({ allowCalculateOverride: value })}
        />
      </div>

      <PropertyField
        label="Encrypted"
        type="switch"
        value={component.encrypted || false}
        onChange={(value) => onChange({ encrypted: value })}
      />
    </div>
  );
};

export default DataTab;