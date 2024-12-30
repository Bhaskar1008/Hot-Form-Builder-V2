import { FormComponent } from '../types';

export interface FormState {
  components: FormComponent[];
  selectedComponent: string | null;
  draggedComponent: FormComponent | null;
  orientation: 'horizontal' | 'vertical';
}

export interface RootState {
  form: FormState;
}