import { z } from 'zod';

export const baseDisplayProperties = {
  label: z.string(),
  customClass: z.string().optional(),
  hideLabel: z.boolean().optional(),
  disabled: z.boolean().optional(),
};

export const baseDataProperties = {
  persistent: z.boolean().optional(),
  protected: z.boolean().optional(),
  tableView: z.boolean().optional(),
  modalEdit: z.boolean().optional(),
};

export const baseValidationProperties = {
  required: z.boolean().optional(),
  validateOn: z.enum(['change', 'blur']).optional(),
};

export const baseLogicProperties = {
  conditional: z.object({
    show: z.boolean().optional(),
    when: z.string().optional(),
    eq: z.string().optional(),
  }).optional(),
  customConditional: z.string().optional(),
};

export interface ComponentProperties {
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
  collapse: CollapsePropertiesType;
}
