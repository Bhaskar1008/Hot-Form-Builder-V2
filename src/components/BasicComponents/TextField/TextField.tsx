import React, { useState, useEffect } from 'react';
import { FormComponent } from '../../../types/form';
import { Info, Edit } from 'lucide-react';
import classNames from 'classnames';
import Modal from '../../UI/Modal';

interface TextFieldProps {
  component: FormComponent;
  value?: string;
  onChange?: (value: string) => void;
}

const TextField: React.FC<TextFieldProps> = ({ component, value: propValue = '', onChange }) => {
  const [value, setValue] = useState(propValue);
  const [error, setError] = useState<string>();
  const [showModal, setShowModal] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  const [values, setValues] = useState<string[]>(propValue ? propValue.split(',').filter(Boolean) : []);
  const [touched, setTouched] = useState(false);

  const { display, validation, data } = component;

  useEffect(() => {
    if (data?.defaultValue && !propValue) {
      setValue(data.defaultValue);
      onChange?.(data.defaultValue);
    } else {
      setValue(propValue);
    }
  }, [data?.defaultValue, propValue, onChange]);

  useEffect(() => {
    setCharCount(value?.length || 0);
    setWordCount(value?.trim() ? value.trim().split(/\s+/).length : 0);
  }, [value]);

  useEffect(() => {
    // Validate on mount if required
    if (validation?.required && !value) {
      setError('This field is required');
    }
  }, [validation?.required, value]);

  const validateValue = (val: string): string | undefined => {
    // Required field validation
    if (validation?.required && !val) {
      return 'This field is required';
    }

    if (!val) return undefined;

    // Min length validation
    if (validation?.minLength && val.length < validation.minLength) {
      return `Minimum length is ${validation.minLength} characters`;
    }

    // Max length validation
    if (validation?.maxLength && val.length > validation.maxLength) {
      return `Maximum length is ${validation.maxLength} characters`;
    }

    // Pattern (regex) validation
    if (validation?.pattern) {
      try {
        const regex = new RegExp(validation.pattern);
        if (!regex.test(val)) {
          return validation.custom || 'Invalid format';
        }
      } catch (err) {
        console.error('Invalid regex pattern:', err);
        return 'Invalid pattern format';
      }
    }

    // Custom validation
    if (validation?.custom && touched) {
      try {
        // eslint-disable-next-line no-new-func
        const validate = new Function('value', validation.custom);
        const result = validate(val);
        if (result !== true) {
          return typeof result === 'string' ? result : 'Invalid value';
        }
      } catch (err) {
        console.error('Custom validation error:', err);
        return 'Invalid value';
      }
    }

    // Unique value validation
    if (data?.unique && values.includes(val)) {
      return 'This value must be unique';
    }

    return undefined;
  };

  const handleChange = (newValue: string) => {
    let finalValue = newValue;
    setTouched(true);

    if (data?.calculateValue) {
      try {
        // eslint-disable-next-line no-new-func
        const calculate = new Function('value', 'data', data.calculateValue);
        finalValue = calculate(newValue, {});
      } catch (err) {
        console.error('Calculate value error:', err);
      }
    }

    setValue(finalValue);

    // Validate on change if configured
    if (validation?.validateOn === 'change') {
      const validationError = validateValue(finalValue);
      setError(validationError);
    }

    if (data?.multiple) {
      if (finalValue && !values.includes(finalValue)) {
        const newValues = [...values, finalValue];
        setValues(newValues);
        onChange?.(newValues.join(','));
        setValue('');
      }
    } else {
      onChange?.(finalValue);
    }
  };

  const handleBlur = () => {
    setTouched(true);
    // Always validate on blur for required fields
    if (validation?.required || validation?.validateOn === 'blur') {
      const validationError = validateValue(value);
      setError(validationError);
    }
  };

  const removeValue = (index: number) => {
    if (data?.multiple) {
      const newValues = values.filter((_, i) => i !== index);
      setValues(newValues);
      onChange?.(newValues.join(','));
    }
  };

  const renderInput = () => (
    <div className="relative">
      {display?.prefix && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
          {display.prefix}
        </span>
      )}

      <input
        type="text"
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        onBlur={handleBlur}
        placeholder={display?.placeholder}
        disabled={display?.disabled}
        spellCheck={display?.spellcheck}
        className={classNames(
          'w-full px-3 py-2 border rounded-md',
          'focus:outline-none focus:ring-2',
          error
            ? 'border-red-300 focus:ring-red-500'
            : 'border-gray-300 focus:ring-blue-500',
          display?.prefix && 'pl-8',
          display?.suffix && 'pr-8',
          display?.customClass
        )}
        required={validation?.required}
        pattern={validation?.pattern}
        minLength={validation?.minLength}
        maxLength={validation?.maxLength}
        aria-invalid={!!error}
        aria-describedby={error ? `${component.id}-error` : undefined}
      />

      {display?.suffix && (
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
          {display.suffix}
        </span>
      )}
    </div>
  );

  const renderField = () => (
    <div className="w-full">
      {!display?.hideLabel && (
        <div className="flex items-center mb-1">
          <label 
            htmlFor={component.id} 
            className="text-sm font-medium text-gray-700"
          >
            {component.label}
            {validation?.required && <span className="text-red-500 ml-1">*</span>}
          </label>
          {display?.tooltip && (
            <div className="relative inline-block ml-2 group">
              <Info className="w-4 h-4 text-gray-400" />
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                {display.tooltip}
              </div>
            </div>
          )}
        </div>
      )}

      {renderInput()}

      {data?.multiple && values.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {values.map((val, index) => (
            <div
              key={index}
              className="flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded"
            >
              <span>{val}</span>
              <button
                type="button"
                onClick={() => removeValue(index)}
                className="text-blue-600 hover:text-blue-800"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      {error && (
        <p 
          id={`${component.id}-error`}
          className="mt-1 text-sm text-red-600"
          role="alert"
        >
          {error}
        </p>
      )}

      {display?.description && (
        <p className="mt-1 text-sm text-gray-500">{display.description}</p>
      )}

      {(display?.showCharCount || display?.showWordCount) && (
        <div className="mt-1 text-xs text-gray-500 flex justify-end space-x-4">
          {display.showCharCount && (
            <span>Characters: {charCount}</span>
          )}
          {display.showWordCount && (
            <span>Words: {wordCount}</span>
          )}
        </div>
      )}
    </div>
  );

  return (
    <div className="mb-4">
      {data?.modalEdit ? (
        <>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            <Edit className="w-4 h-4" />
            {component.label}
          </button>
          <Modal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            title={`Edit ${component.label}`}
          >
            {renderField()}
          </Modal>
        </>
      ) : (
        renderField()
      )}
    </div>
  );
};

export default TextField;