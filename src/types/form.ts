import { DisplayPropertiesType, DataPropertiesType, ValidationPropertiesType, LogicPropertiesType } from './propertyTypes';

export interface FormComponent {
  id: string;
  type: string;
  label: string;
  required?: boolean;
  placeholder?: string;
  options?: Array<{ label: string; value: string }>;
  validation?: ValidationPropertiesType;
  display?: DisplayPropertiesType;
  data?: DataPropertiesType;
  logic?: LogicPropertiesType;
  children?: FormComponent[];
  parentId?: string;
}

export interface FormState {
  components: FormComponent[];
  selectedComponent: string | null;
  draggedComponent: FormComponent | null;
  orientation: 'horizontal' | 'vertical';
}

export interface WidgetComponent extends FormComponent {
  settings: Record<string, any>;
  style: Record<string, any>;
}