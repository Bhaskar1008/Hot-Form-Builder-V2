import React, { useState } from 'react';
import { FormComponent } from '../../../types/form';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface WizardProps {
  component: FormComponent;
  onChange?: (value: any) => void;
}

const Wizard: React.FC<WizardProps> = ({ component, onChange }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const steps = component.settings?.steps || [];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderProgress = () => {
    const percentage = Math.round((currentStep / (steps.length - 1)) * 100);

    return (
      <div className="mb-4">
        <div className="relative pt-1">
          <div className="flex mb-2 items-center justify-between">
            <div>
              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                Progress
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold inline-block text-blue-600">
                {percentage}%
              </span>
            </div>
          </div>
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-100">
            <div
              style={{ width: `${percentage}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 transition-all duration-300"
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="mb-4">
      <label className="hotform-label">
        {component.label}
        {component.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <div className="border border-gray-200 rounded-lg p-4">
        {renderProgress()}
        
        <div className="min-h-[200px] mb-4">
          {steps[currentStep]?.content}
        </div>
        
        <div className="flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              currentStep === 0
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
            }`}
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Previous
          </button>
          
          <button
            onClick={handleNext}
            disabled={currentStep === steps.length - 1}
            className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              currentStep === steps.length - 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            Next
            <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Wizard;