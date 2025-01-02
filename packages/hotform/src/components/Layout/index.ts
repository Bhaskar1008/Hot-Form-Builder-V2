import type { LayoutComponentProps } from '../../types/form';
import Container from './Container/Container';
import Table from './Table/Table';
import Tabs from './Tabs/Tabs';
import Collapse from './Collapse/Collapse';

export type ContainerComponent = React.FC<LayoutComponentProps>;
export type TableComponent = React.FC<LayoutComponentProps>;
export type TabsComponent = React.FC<LayoutComponentProps>;
export type CollapseComponent = React.FC<LayoutComponentProps>;

export const LayoutComponents: Record<string, React.FC<LayoutComponentProps>> = {
  container: Container,
  table: Table,
  tabs: Tabs,
  collapse: Collapse
};

export { Container, Table, Tabs, Collapse };