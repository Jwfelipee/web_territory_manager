import { memo } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface DoughnutChartProps {
  values: number[];
}

const DoughnutChartComponent = ({ values }: DoughnutChartProps) => {
  if (!values) return null;
  return (
    <Doughnut
      data={{
        labels: [],
        datasets: [
          {
            data: values,
            backgroundColor: ["#CBE6BA", "#9EE073"],
            borderWidth: 0,
          },
        ],
      }}
    />
  );
};

export const DoughnutChart = memo(DoughnutChartComponent);
