import type { ComponentProps } from '../../types/form';
import TextField from './TextField/TextField';
import Checkbox from './Checkbox/Checkbox';
import Radio from './Radio/Radio';
import Select from './Select/Select';
import Button from './Button/Button';

export type TextFieldComponent = React.FC<ComponentProps>;
export type CheckboxComponent = React.FC<ComponentProps>;
export type RadioComponent = React.FC<ComponentProps>;
export type SelectComponent = React.FC<ComponentProps>;
export type ButtonComponent = React.FC<ComponentProps>;

export const BasicComponents: Record<string, React.FC<ComponentProps>> = {
  text: TextField,
  checkbox: Checkbox,
  radio: Radio,
  select: Select,
  button: Button
};

export { TextField, Checkbox, Radio, Select, Button };