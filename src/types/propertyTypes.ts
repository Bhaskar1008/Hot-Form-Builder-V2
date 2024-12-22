import { z } from 'zod';

// Base property schemas that are commonly shared
const baseDisplayProperties = {
  label: z.string(),
  customClass: z.string().optional(),
  tabindex: z.string().optional(),
  hideLabel: z.boolean().optional(),
  disabled: z.boolean().optional(),
};

const baseDataProperties = {
  persistent: z.boolean().optional(),
  protected: z.boolean().optional(),
  tableView: z.boolean().optional(),
  modalEdit: z.boolean().optional(),
};

const baseLogicProperties = {
  conditional: z.object({
    show: z.boolean().nullable(),
    when: z.string().nullable(),
    eq: z.string(),
  }),
  customConditional: z.string().optional(),
};

// Component-specific property schemas
export const TextFieldProperties = {
  display: z.object({
    ...baseDisplayProperties,
    labelPosition: z.enum(['top', 'left', 'right', 'bottom']),
    placeholder: z.string().optional(),
    description: z.string().optional(),
    tooltip: z.string().optional(),
    prefix: z.string().optional(),
    suffix: z.string().optional(),
    autofocus: z.boolean().optional(),
    inputType: z.string(),
    showCharCount: z.boolean().optional(),
    showWordCount: z.boolean().optional(),
    spellcheck: z.boolean().optional(),
  }),
  data: z.object({
    ...baseDataProperties,
    defaultValue: z.string().optional(),
    multiple: z.boolean().optional(),
    unique: z.boolean().optional(),
    calculateValue: z.string().optional(),
    calculateServer: z.boolean().optional(),
    allowCalculateOverride: z.boolean().optional(),
    encrypted: z.boolean().optional(),
  }),
  validation: z.object({
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
  }),
  logic: z.object(baseLogicProperties),
};

export const CheckboxProperties = {
  display: z.object({
    ...baseDisplayProperties,
    labelPosition: z.enum(['top', 'left', 'right', 'bottom']),
    description: z.string().optional(),
    autofocus: z.boolean().optional(),
  }),
  data: z.object({
    ...baseDataProperties,
    defaultValue: z.boolean().optional(),
    encrypted: z.boolean().optional(),
  }),
  validation: z.object({
    required: z.boolean(),
    validateOn: z.enum(['change', 'blur']),
  }),
  logic: z.object(baseLogicProperties),
};

export const RadioProperties = {
  display: z.object({
    ...baseDisplayProperties,
    labelPosition: z.enum(['top', 'left', 'right', 'bottom']),
    description: z.string().optional(),
    autofocus: z.boolean().optional(),
  }),
  data: z.object({
    ...baseDataProperties,
    defaultValue: z.string().optional(),
  }),
  validation: z.object({
    required: z.boolean(),
    validateOn: z.enum(['change', 'blur']),
  }),
  logic: z.object(baseLogicProperties),
};

export const SelectProperties = {
  display: z.object({
    ...baseDisplayProperties,
    labelPosition: z.enum(['top', 'left', 'right', 'bottom']),
    placeholder: z.string().optional(),
    description: z.string().optional(),
    tooltip: z.string().optional(),
    autofocus: z.boolean().optional(),
  }),
  data: z.object({
    ...baseDataProperties,
    defaultValue: z.string().optional(),
    multiple: z.boolean().optional(),
    encrypted: z.boolean().optional(),
  }),
  validation: z.object({
    required: z.boolean(),
    validateOn: z.enum(['change', 'blur']),
    custom: z.string().optional(),
    customPrivate: z.boolean().optional(),
  }),
  logic: z.object({
    ...baseLogicProperties,
    calculateValue: z.string().optional(),
  }),
};

export const ButtonProperties = {
  display: z.object({
    ...baseDisplayProperties,
    labelPosition: z.enum(['top', 'left', 'right', 'bottom']),
    autofocus: z.boolean().optional(),
    buttonType: z.string(),
    icon: z.string().optional(),
  }),
  logic: z.object({
    onClick: z.string(),
    customLogic: z.string().optional(),
  }),
};

export const DateTimeProperties = {
  display: z.object({
    ...baseDisplayProperties,
    labelPosition: z.enum(['top', 'left', 'right', 'bottom']),
    placeholder: z.string().optional(),
    description: z.string().optional(),
    tooltip: z.string().optional(),
    autofocus: z.boolean().optional(),
  }),
  data: z.object({
    ...baseDataProperties,
    defaultValue: z.string().optional(),
    encrypted: z.boolean().optional(),
  }),
  validation: z.object({
    required: z.boolean(),
    validateOn: z.enum(['change', 'blur']),
    strictDateValidation: z.boolean(),
  }),
  logic: z.object({
    ...baseLogicProperties,
    calculateValue: z.string().optional(),
  }),
};

export const FileUploadProperties = {
  display: z.object({
    ...baseDisplayProperties,
    labelPosition: z.enum(['top', 'left', 'right', 'bottom']),
    description: z.string().optional(),
    tooltip: z.string().optional(),
    autofocus: z.boolean().optional(),
  }),
  data: z.object({
    ...baseDataProperties,
    defaultValue: z.any().optional(),
    multiple: z.boolean().optional(),
    encrypted: z.boolean().optional(),
  }),
  validation: z.object({
    required: z.boolean(),
    validateOn: z.enum(['change', 'blur']),
  }),
  logic: z.object({
    ...baseLogicProperties,
    calculateValue: z.string().optional(),
  }),
};

export const SignatureProperties = {
  display: z.object({
    ...baseDisplayProperties,
    labelPosition: z.enum(['top', 'left', 'right', 'bottom']),
    description: z.string().optional(),
  }),
  validation: z.object({
    required: z.boolean(),
  }),
  logic: z.object(baseLogicProperties),
};

export const OTPProperties = {
  display: z.object({
    ...baseDisplayProperties,
    labelPosition: z.enum(['top', 'left', 'right', 'bottom']),
    placeholder: z.string().optional(),
    description: z.string().optional(),
    tooltip: z.string().optional(),
    autofocus: z.boolean().optional(),
  }),
  data: z.object({
    ...baseDataProperties,
    defaultValue: z.string().optional(),
  }),
  validation: z.object({
    required: z.boolean(),
    validateOn: z.enum(['change', 'blur']),
    minLength: z.string(),
    maxLength: z.string(),
  }),
  logic: z.object({
    ...baseLogicProperties,
    calculateValue: z.string().optional(),
  }),
};

export const TagsProperties = {
  display: z.object({
    ...baseDisplayProperties,
    labelPosition: z.enum(['top', 'left', 'right', 'bottom']),
    placeholder: z.string().optional(),
    description: z.string().optional(),
  }),
  data: z.object({
    ...baseDataProperties,
    defaultValue: z.array(z.string()).optional(),
    multiple: z.boolean().optional(),
  }),
  logic: z.object({
    ...baseLogicProperties,
    calculateValue: z.string().optional(),
  }),
};

export const ContainerProperties = {
  display: z.object({
    ...baseDisplayProperties,
  }),
  data: z.object({
    ...baseDataProperties,
  }),
  logic: z.object({
    ...baseLogicProperties,
    calculateValue: z.string().optional(),
  }),
};

export const TableProperties = {
  display: z.object({
    ...baseDisplayProperties,
    resizable: z.boolean().optional(),
    sortable: z.boolean().optional(),
    pagination: z.boolean().optional(),
  }),
  data: z.object({
    ...baseDataProperties,
  }),
  validation: z.object({
    rowCount: z.number().optional(),
    columnValidation: z.record(z.any()).optional(),
  }),
  logic: z.object({
    ...baseLogicProperties,
    calculateValue: z.string().optional(),
  }),
};

export const TabsProperties = {
  display: z.object({
    ...baseDisplayProperties,
  }),
  data: z.object({
    ...baseDataProperties,
  }),
  logic: z.object({
    ...baseLogicProperties,
    calculateValue: z.string().optional(),
  }),
};

export const AccordionProperties = {
  display: z.object({
    ...baseDisplayProperties,
  }),
  data: z.object({
    ...baseDataProperties,
  }),
  logic: z.object({
    ...baseLogicProperties,
    calculateValue: z.string().optional(),
  }),
};

// Export types for each component's properties
export type TextFieldPropertiesType = z.infer<typeof TextFieldProperties.display> &
  z.infer<typeof TextFieldProperties.data> &
  z.infer<typeof TextFieldProperties.validation> &
  z.infer<typeof TextFieldProperties.logic>;

export type CheckboxPropertiesType = z.infer<typeof CheckboxProperties.display> &
  z.infer<typeof CheckboxProperties.data> &
  z.infer<typeof CheckboxProperties.validation> &
  z.infer<typeof CheckboxProperties.logic>;

export type RadioPropertiesType = z.infer<typeof RadioProperties.display> &
  z.infer<typeof RadioProperties.data> &
  z.infer<typeof RadioProperties.validation> &
  z.infer<typeof RadioProperties.logic>;

export type SelectPropertiesType = z.infer<typeof SelectProperties.display> &
  z.infer<typeof SelectProperties.data> &
  z.infer<typeof SelectProperties.validation> &
  z.infer<typeof SelectProperties.logic>;

export type ButtonPropertiesType = z.infer<typeof ButtonProperties.display> &
  z.infer<typeof ButtonProperties.logic>;

export type DateTimePropertiesType = z.infer<typeof DateTimeProperties.display> &
  z.infer<typeof DateTimeProperties.data> &
  z.infer<typeof DateTimeProperties.validation> &
  z.infer<typeof DateTimeProperties.logic>;

export type FileUploadPropertiesType = z.infer<typeof FileUploadProperties.display> &
  z.infer<typeof FileUploadProperties.data> &
  z.infer<typeof FileUploadProperties.validation> &
  z.infer<typeof FileUploadProperties.logic>;

export type SignaturePropertiesType = z.infer<typeof SignatureProperties.display> &
  z.infer<typeof SignatureProperties.validation> &
  z.infer<typeof SignatureProperties.logic>;

export type OTPPropertiesType = z.infer<typeof OTPProperties.display> &
  z.infer<typeof OTPProperties.data> &
  z.infer<typeof OTPProperties.validation> &
  z.infer<typeof OTPProperties.logic>;

export type TagsPropertiesType = z.infer<typeof TagsProperties.display> &
  z.infer<typeof TagsProperties.data> &
  z.infer<typeof TagsProperties.logic>;

export type ContainerPropertiesType = z.infer<typeof ContainerProperties.display> &
  z.infer<typeof ContainerProperties.data> &
  z.infer<typeof ContainerProperties.logic>;

export type TablePropertiesType = z.infer<typeof TableProperties.display> &
  z.infer<typeof TableProperties.data> &
  z.infer<typeof TableProperties.validation> &
  z.infer<typeof TableProperties.logic>;

export type TabsPropertiesType = z.infer<typeof TabsProperties.display> &
  z.infer<typeof TabsProperties.data> &
  z.infer<typeof TabsProperties.logic>;

export type AccordionPropertiesType = z.infer<typeof AccordionProperties.display> &
  z.infer<typeof AccordionProperties.data> &
  z.infer<typeof AccordionProperties.logic>;

// Component property map type
export type ComponentProperties = {
  text: TextFieldPropertiesType;
  checkbox: CheckboxPropertiesType;
  radio: RadioPropertiesType;
  select: SelectPropertiesType;
  button: ButtonPropertiesType;
  datetime: DateTimePropertiesType;
  fileupload: FileUploadPropertiesType;
  signature: SignaturePropertiesType;
  otp: OTPPropertiesType;
  tags: TagsPropertiesType;
  container: ContainerPropertiesType;
  table: TablePropertiesType;
  tabs: TabsPropertiesType;
  accordion: AccordionPropertiesType;
};