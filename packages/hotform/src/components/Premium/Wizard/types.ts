
export interface Step {
  id: string;
  label: string;
  content: string;
  icon?: {
    type: 'library' | 'custom';
    value: string;
  };
}

export type WizardType = 'basic' | 'percentage' | 'advanced';

export interface WizardProps {
  component: {
    id: string;
    type: string;
    label: string;
    settings?: {
      type?: WizardType;
      steps?: Step[];
    };
  };
  onChange?: (value: any) => void;
}
