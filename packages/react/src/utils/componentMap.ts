import { TextField } from '../components/BasicComponents/TextField';
import { Checkbox } from '../components/BasicComponents/Checkbox';
import { Radio } from '../components/BasicComponents/Radio';
import { Select } from '../components/BasicComponents/Select';
import { Container } from '../components/LayoutComponents/Container';
import { Table } from '../components/LayoutComponents/Table';
import { Tabs } from '../components/LayoutComponents/Tabs';
import { Collapse } from '../components/LayoutComponents/Collapse';

export const componentMap: Record<string, React.FC<any>> = {
  // Basic Components
  text: TextField,
  checkbox: Checkbox,
  radio: Radio,
  select: Select,

  // Layout Components
  container: Container,
  table: Table,
  tabs: Tabs,
  collapse: Collapse,
};