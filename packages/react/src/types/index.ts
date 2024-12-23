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
  };
  children?: FormComponent[];
  parentId?: string;
}