// Table specific display properties
export interface TableDisplayProperties {
  label?: string;
  customClass?: string;
  hideLabel?: boolean;
  disabled?: boolean;
  collapseTitle?: string;
  rowCount?: number;
  columnCount?: number;
  showHeaders?: boolean;
  headers?: Array<{ label: string; value: string }>;
  showBorders?: boolean;
  striped?: boolean;
  hover?: boolean;
}

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
  display?: TableDisplayProperties;
  children?: FormComponent[];
  parentId?: string;
}

export interface FormState {
  components: FormComponent[];
  selectedComponent: string | null;
  draggedComponent: FormComponent | null;
  orientation: 'horizontal' | 'vertical';
}

export interface RootState {
  form: FormState;
}