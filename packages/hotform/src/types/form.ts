// Base Properties
export interface DisplayProperties {
    label?: string;
    customClass?: string;
    hideLabel?: boolean;
    disabled?: boolean;
    placeholder?: string;
    description?: string;
    tooltip?: string;
    prefix?: string;
    suffix?: string;
    showCharCount?: boolean;
    showWordCount?: boolean;
    spellcheck?: boolean;
    pageCount?: number;
    collapseTitle?: string;
    initiallyExpanded?: boolean;
    showBorder?: boolean;
    rowCount?: number;
    columnCount?: number;
    showHeaders?: boolean;
    headers?: Array<{ label: string; value: string }>;
    showBorders?: boolean;
    striped?: boolean;
    hover?: boolean;
    orientation?: 'horizontal' | 'vertical';
    tabs?: Array<{ id: string; label: string }>;
  }
  
  export interface DataProperties {
    persistent?: boolean;
    protected?: boolean;
    tableView?: boolean;
    modalEdit?: boolean;
    defaultValue?: any;
    multiple?: boolean;
    unique?: boolean;
    calculateValue?: string;
    calculateServer?: boolean;
    allowCalculateOverride?: boolean;
    encrypted?: boolean;
  }
  
  export interface ValidationProperties {
    required?: boolean;
    validateOn?: 'change' | 'blur';
    custom?: string;
    customPrivate?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    strictDateValidation?: boolean;
  }
  
  export interface LogicProperties {
    conditional?: {
      show?: boolean;
      when?: string;
      eq?: string;
    };
    customConditional?: string;
    calculateValue?: string;
    onClick?: string;
    customLogic?: string;
  }
  
  // Component Types
  export interface FormComponent {
    id: string;
    type: string;
    label: string;
    required?: boolean;
    placeholder?: string;
    options?: Array<{ label: string; value: string }>;
    validation?: ValidationProperties;
    display?: DisplayProperties;
    data?: DataProperties;
    logic?: LogicProperties;
    children?: FormComponent[];
    parentId?: string;
    settings?: {
      type?: string;
      steps?: Array<{
        label: string;
        content: string;
        icon?: {
          type: 'library' | 'custom';
          value: string;
        };
      }>;
    };
  }
  
  export interface ComponentProps {
    component: FormComponent;
    onChange?: (value: any) => void;
    value?: any;
  }
  
  export interface LayoutComponentProps extends ComponentProps {
    children?: React.ReactNode;
    renderComponent?: (component: FormComponent) => React.ReactNode;
  }
  
  export interface ChartComponentProps extends ComponentProps {
    settings?: {
      data?: any;
      options?: any;
      type?: string;
    };
  }
  
  export interface APIComponentProps extends ComponentProps {
    settings?: {
      url?: string;
      method?: string;
      headers?: Record<string, string>;
      body?: string;
    };
  }