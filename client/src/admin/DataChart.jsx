import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DataChart = () => {

    const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    const getRandomColor = () => `rgba(${rand(0, 255)}, ${rand(0, 255)}, ${rand(0, 255)}, 0.8)`

    const data = {
        labels: ['January 2024', 'February 2024', 'March 2024', 'April 2024', 'May 2024', 'June 2024', 'July 2024', 'August 2024', 'September 2024', 'October 2024', 'November 2024'],
        datasets: [
          {
            label: 'Year 2024',
            data: [101, 90, 120, 170, 155, 80, 160, 100, 50, 190, 210, 150],
            backgroundColor: Array.from({ length: 12 }, () => getRandomColor()),
          },
        ],
      };

      const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Monthly Data Comparison',
          },
        },
      };

  return (
    <div>
      <Bar data={data} options={options} />
    </div>
  )
}

export default DataChart
