import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { FormComponent } from '../../../types/form';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface BarChartProps {
  component: FormComponent;
}

const BarChart: React.FC<BarChartProps> = ({ component }) => {
  const defaultData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Sample Data',
        data: [65, 59, 80, 81, 56, 55],
        backgroundColor: '#36A2EB',
      },
    ],
  };

  const data = component.settings?.data || defaultData;

  return (
    <div className="p-4">
      <h3 className="text-lg font-medium mb-4">{component.label}</h3>
      <div className="relative h-64">
        <Bar
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

export default BarChart;