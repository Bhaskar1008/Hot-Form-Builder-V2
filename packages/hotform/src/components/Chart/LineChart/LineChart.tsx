import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { FormComponent } from '../../../types/form';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface LineChartProps {
  component: FormComponent;
}

const LineChart: React.FC<LineChartProps> = ({ component }) => {
  const defaultData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Sample Data',
        data: [65, 59, 80, 81, 56, 55],
        fill: false,
        borderColor: '#36A2EB',
        tension: 0.1,
      },
    ],
  };

  const data = component.settings?.data || defaultData;

  return (
    <div className="p-4">
      <h3 className="text-lg font-medium mb-4">{component.label}</h3>
      <div className="relative h-64">
        <Line
          data={data}
          options={{
            responsive: true,
            maintainAspectRatio: false,
          }}
        />
      </div>
    </div>
  );
};

export default LineChart;