import type { ComponentProps } from '../../types/form';
import DateTime from './DateTime/DateTime';
import FileUpload from './FileUpload/FileUpload';
import Signature from './Signature/Signature';
import OTP from './OTP/OTP';
import Tags from './Tags/Tags';

export type DateTimeComponent = React.FC<ComponentProps>;
export type FileUploadComponent = React.FC<ComponentProps>;
export type SignatureComponent = React.FC<ComponentProps>;
export type OTPComponent = React.FC<ComponentProps>;
export type TagsComponent = React.FC<ComponentProps>;

export const AdvancedComponents: Record<string, React.FC<ComponentProps>> = {
  datetime: DateTime,
  fileupload: FileUpload,
  signature: Signature,
  otp: OTP,
  tags: Tags
};

export { DateTime, FileUpload, Signature, OTP, Tags };