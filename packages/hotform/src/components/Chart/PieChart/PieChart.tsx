import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { FormComponent } from '../../../types/form';

ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
  component: FormComponent;
}

const PieChart: React.FC<PieChartProps> = ({ component }) => {
  const defaultData = {
    labels: ['Red', 'Blue', 'Yellow'],
    datasets: [
      {
        data: [300, 50, 100],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  const data = component.settings?.data || defaultData;

  return (
    <div className="p-4">
      <h3 className="text-lg font-medium mb-4">{component.label}</h3>
      <div className="relative h-64">
        <Pie
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

export default PieChart;