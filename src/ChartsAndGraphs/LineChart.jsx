// import React from 'react';
import { Line } from "react-chartjs-2";
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

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  
  const LineChart = ({ revenueData, expensesData }) => {
    const monthLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const data = {
      labels: monthLabels,
      datasets: [
        {
          label: 'Revenue',
          data: monthLabels.map((month) => {
            const monthData = revenueData?.find(item => item._id === month);
            return monthData ? monthData.totalAmount : 0;
          }),
          fill: false,
          borderColor: '#000000',
          backgroundColor: 'red',
          borderWidth: 2,
          pointBackgroundColor: '#000000',
          pointBorderColor: '#000000',
          tension: 0.1,
        },
        {
          label: 'Expenses',
          data: monthLabels.map((month) => {
            const monthData = expensesData?.find(item => item._id === month);
            return monthData ? monthData.totalAmount : 0;
          }),
          fill: false,
          borderColor: 'pink',
          backgroundColor: '#ffffff',
          borderWidth: 2,
          pointBackgroundColor: '#FF0000',
          pointBorderColor: '#FF0000',
          tension: 0.1,
        }
      ]
    };

    const options = {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'Monthly Revenue vs Expenses',
          color: 'brown',
        },
        legend: {
          labels: {
            color: '#000000',
          },
        },
      },
      maintainAspectRatio: false,
      scales: {
        x: {
          grid: {
            color: '#blue',
          },
          ticks: {
            color: 'black',
          },
        },
        y: {
          grid: {
            color: 'orange',
          },
          ticks: {
            color: 'black',
          },
        },
      },
    };

    return (
      <div style={{ width: '700px', height: '350px', backgroundColor: 'lightgray' }}>
        <h2 style={{ color: 'blue' }}>Revenue vs Expenses Chart</h2>
        <Line data={data} options={options} />
      </div>
    );
  };

  import PropTypes from 'prop-types';

  LineChart.propTypes = {
    revenueData: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string,
        totalAmount: PropTypes.number
      })
    ),
    expensesData: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string,
        totalAmount: PropTypes.number
      })
    )
  };
  export default LineChart;
  
 