
import React from 'react';
import { Step, WizardType } from '../types';
import classNames from 'classnames';
import * as LucideIcons from 'lucide-react';

interface ProgressIndicatorProps {
  type: WizardType;
  steps: Step[];
  currentStep: number;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  type,
  steps,
  currentStep
}) => {
  const renderIcon = (step: Step, index: number) => {
    if (!step.icon) return index + 1;

    if (step.icon.type === 'library' && step.icon.value) {
      const IconComponent = LucideIcons[step.icon.value as keyof typeof LucideIcons];
      return IconComponent ? <IconComponent className="w-5 h-5" /> : index + 1;
    }

    if (step.icon.type === 'custom' && step.icon.value) {
      return (
        <img
          src={step.icon.value}
          alt={step.label}
          className="w-5 h-5 object-contain"
        />
      );
    }

    return index + 1;
  };

  switch (type) {
    case 'percentage':
      const percentage = Math.round((currentStep / (steps.length - 1)) * 100);
      return (
        <div className="mb-4">
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-blue-600">{percentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      );

    case 'advanced':
      return (
        <div className="flex items-center justify-between mb-8">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <div
                className={classNames(
                  'flex items-center justify-center w-10 h-10 rounded-full transition-colors',
                  index <= currentStep
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-600'
                )}
              >
                {renderIcon(step, index)}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={classNames(
                    'flex-1 h-1 mx-4 transition-colors',
                    index < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                  )}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      );

    default:
      return (
        <div className="flex justify-between mb-4">
          {steps.map((step, index) => (
            <span
              key={step.id}
              className={classNames(
                'text-sm font-medium',
                index === currentStep
                  ? 'text-blue-600'
                  : index < currentStep
                  ? 'text-green-600'
                  : 'text-gray-400'
              )}
            >
              {step.label}
            </span>
          ))}
        </div>
      );
  }
};
