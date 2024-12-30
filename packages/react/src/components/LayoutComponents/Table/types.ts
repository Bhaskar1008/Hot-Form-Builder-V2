export interface TableProps {
    component: {
      id: string;
      type: string;
      label?: string;
      display?: {
        rowCount?: number;
        columnCount?: number;
        showHeaders?: boolean;
        headers?: Array<{ label: string; value: string }>;
        showBorders?: boolean;
        striped?: boolean;
        hover?: boolean;
        customClass?: string;
      };
      children?: any[];
    };
  }
  
  export interface TableContentProps {
    component: TableProps['component'];
    showBorders?: boolean;
    striped?: boolean;
    hover?: boolean;
  }
  
  export interface TableHeaderProps {
    headers: Array<{ label: string; value: string }>;
    showBorders?: boolean;
  }