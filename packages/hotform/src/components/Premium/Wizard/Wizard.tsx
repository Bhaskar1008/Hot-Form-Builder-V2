
import React from 'react';
import { WizardProps } from './types';
import { useWizardNavigation } from './hooks/useWizardNavigation';
import { ProgressIndicator } from './components/ProgressIndicator';
import { NavigationButtons } from './components/NavigationButtons';
import { StepContent } from './components/StepContent';
import { useNestedComponents } from '../../../hooks/useNestedComponents';

const Wizard: React.FC<WizardProps> = ({ component, onChange }) => {
  const steps = component.settings?.steps || [];
  const type = component.settings?.type || 'basic';
  const { currentStep, handleNext, handlePrevious } = useWizardNavigation(steps.length);
  
  const currentStepId = `${component.id}-step-${currentStep}`;
  const stepComponents = useNestedComponents(currentStepId);

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {component.label}
        {component.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <div className="border border-gray-200 rounded-lg p-6">
        <ProgressIndicator
          type={type}
          steps={steps}
          currentStep={currentStep}
        />
        
        <StepContent
          stepId={currentStepId}
          components={stepComponents}
        />
        
        <NavigationButtons
          currentStep={currentStep}
          totalSteps={steps.length}
          onPrevious={handlePrevious}
          onNext={handleNext}
        />
      </div>
    </div>
  );
};

export default Wizard;
