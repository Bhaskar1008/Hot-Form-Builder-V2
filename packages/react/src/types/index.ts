export interface FormComponent {
  id: string;
  type: string;
  label: string;
  required?: boolean;
  placeholder?: string;
  options?: Array<{ label: string; value: string }>;
  validation?: {
    required?: boolean;
    pattern?: string;
    minLength?: number;
    maxLength?: number;
  };
  display?: {
    label?: string;
    customClass?: string;
    hideLabel?: boolean;
    disabled?: boolean;
    collapseTitle?: string; // Added for Collapse component
  };
  children?: FormComponent[];
  parentId?: string;
}