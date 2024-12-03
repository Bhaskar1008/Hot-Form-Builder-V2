import { z } from 'zod';

export const DisplayProperties = z.object({
  label: z.string(),
  labelPosition: z.enum(['top', 'left', 'right', 'bottom']),
  placeholder: z.string().optional(),
  description: z.string().optional(),
  tooltip: z.string().optional(),
  prefix: z.string().optional(),
  suffix: z.string().optional(),
  customClass: z.string().optional(),
  tabindex: z.string().optional(),
  hideLabel: z.boolean().optional(),
  disabled: z.boolean().optional(),
  autofocus: z.boolean().optional(),
  inputType: z.string(),
  showCharCount: z.boolean().optional(),
  showWordCount: z.boolean().optional(),
  spellcheck: z.boolean().optional(),
});

export const DataProperties = z.object({
  defaultValue: z.any().optional(),
  multiple: z.boolean().optional(),
  unique: z.boolean().optional(),
  persistent: z.boolean().optional(),
  protected: z.boolean().optional(),
  tableView: z.boolean().optional(),
  modalEdit: z.boolean().optional(),
  calculateValue: z.string().optional(),
  calculateServer: z.boolean().optional(),
  allowCalculateOverride: z.boolean().optional(),
  encrypted: z.boolean().optional(),
});

export const ValidationProperties = z.object({
  required: z.boolean(),
  validateOn: z.enum(['change', 'blur']),
  custom: z.string().optional(),
  customPrivate: z.boolean().optional(),
  strictDateValidation: z.boolean().optional(),
  multiple: z.boolean().optional(),
  unique: z.boolean().optional(),
  minLength: z.string().optional(),
  maxLength: z.string().optional(),
  pattern: z.string().optional(),
});

export const LogicProperties = z.object({
  conditional: z.object({
    show: z.boolean().nullable(),
    when: z.string().nullable(),
    eq: z.string(),
  }),
  customConditional: z.string().optional(),
  calculateValue: z.string().optional(),
  allowCalculateOverride: z.boolean().optional(),
});

export type DisplayPropertiesType = z.infer<typeof DisplayProperties>;
export type DataPropertiesType = z.infer<typeof DataProperties>;
export type ValidationPropertiesType = z.infer<typeof ValidationProperties>;
export type LogicPropertiesType = z.infer<typeof LogicProperties>;