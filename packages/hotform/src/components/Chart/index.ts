import type { ChartComponentProps } from '../../types/form';
import PieChart from './PieChart/PieChart';
import DoughnutChart from './DoughnutChart/DoughnutChart';
import BarChart from './BarChart/BarChart';
import LineChart from './LineChart/LineChart';

export type PieChartComponent = React.FC<ChartComponentProps>;
export type DoughnutChartComponent = React.FC<ChartComponentProps>;
export type BarChartComponent = React.FC<ChartComponentProps>;
export type LineChartComponent = React.FC<ChartComponentProps>;

export const ChartComponents: Record<string, React.FC<ChartComponentProps>> = {
  'pie-chart': PieChart,
  'doughnut-chart': DoughnutChart,
  'bar-chart': BarChart,
  'line-chart': LineChart
};

export { PieChart, DoughnutChart, BarChart, LineChart };