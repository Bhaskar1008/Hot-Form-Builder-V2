import TextField from '../components/BasicComponents/TextField/TextField';
import Checkbox from '../components/BasicComponents/Checkbox/Checkbox';
import Radio from '../components/BasicComponents/Radio/Radio';
import Select from '../components/BasicComponents/Select/Select';
import Button from '../components/BasicComponents/Button/Button';
import DateTime from '../components/AdvancedComponents/DateTime/DateTime';
import FileUpload from '../components/AdvancedComponents/FileUpload/FileUpload';
import Signature from '../components/AdvancedComponents/Signature/Signature';
import OTP from '../components/AdvancedComponents/OTP/OTP';
import Tags from '../components/AdvancedComponents/Tags/Tags';
import Container from '../components/LayoutComponents/Container/Container';
import Table from '../components/LayoutComponents/Table/Table';
import Tabs from '../components/LayoutComponents/Tabs/Tabs';
import Collapse from '../components/LayoutComponents/Collapse/Collapse';
import { Wizard } from '../components/PremiumComponents';

export const componentMap: Record<string, React.FC<any>> = {
  // Basic Components
  text: TextField,
  checkbox: Checkbox,
  radio: Radio,
  select: Select,
  button: Button,

  // Advanced Components
  datetime: DateTime,
  fileupload: FileUpload,
  signature: Signature,
  otp: OTP,
  tags: Tags,

  // Premium Components
  wizard: Wizard,

  // Layout Components
  container: Container,
  table: Table,
  tabs: Tabs,
  collapse: Collapse,
};