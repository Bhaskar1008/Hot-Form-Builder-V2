import React, { useState } from 'react';
import { FormComponent } from '../../../types/form';
import { Eye, EyeOff } from 'lucide-react';
import Modal from '../../UI/Modal';
import classNames from 'classnames';

interface PasswordProps {
  component: FormComponent;
  value?: string;
  onChange?: (value: string) => void;
}

const Password: React.FC<PasswordProps> = ({ component, value = '', onChange }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState<string>();
  const [touched, setTouched] = useState(false);
  const [values, setValues] = useState<string[]>(value ? value.split(',').filter(Boolean) : []);

  const { display, validation, data } = component;

  const validateValue = (val: string): string | undefined => {
    if (!val && validation?.required) {
      return 'This field is required';
    }

    if (!val) return undefined;

    if (validation?.minLength && val.length < validation.minLength) {
      return `Minimum length is ${validation.minLength} characters`;
    }

    if (validation?.maxLength && val.length > validation.maxLength) {
      return `Maximum length is ${validation.maxLength} characters`;
    }

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

    return undefined;
  };

  const handleChange = (newValue: string) => {
    let finalValue = newValue;
    setTouched(true);

    if (data?.calculateValue) {
      try {
        const calculate = new Function('value', 'data', data.calculateValue);
        finalValue = calculate(newValue, {});
      } catch (err) {
        console.error('Calculate value error:', err);
      }
    }

    if (validation?.validateOn === 'change') {
      const validationError = validateValue(finalValue);
      setError(validationError);
    }

    if (data?.multiple) {
      if (finalValue && !values.includes(finalValue)) {
        const newValues = [...values, finalValue];
        setValues(newValues);
        onChange?.(newValues.join(','));
        setError(undefined);
      }
    } else {
      onChange?.(finalValue);
    }
  };

  const handleBlur = () => {
    setTouched(true);
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

  const renderPasswordInput = () => (
    <div className="relative">
      {display?.prefix && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
          {display.prefix}
        </span>
      )}

      <input
        type={showPassword ? 'text' : 'password'}
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

      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
      >
        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
      </button>

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
          <label className="text-sm font-medium text-gray-700">
            {component.label}
            {validation?.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        </div>
      )}

      {renderPasswordInput()}

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
    </div>
  );

  return (
    <div className="mb-4">
      {data?.modalEdit ? (
        <>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
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

export default Password;