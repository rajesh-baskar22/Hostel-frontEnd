// import React from "react";  
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Chart,
  } from "chart.js"; 
   
  //Registering the chart components
  Chart.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );







const BarChart = () => {
    const revenueData = [
      { _id: "Service Fee", totalAmount: 40 },
      { _id: "Laundry", totalAmount: 30 },
      { _id: "Room Booking", totalAmount: 800 },
      { _id: "Maintenance", totalAmount: 70 },
    ];
  
    const expensesData = [
      { _id: "Wi-Fi", totalAmount: 100 },
      { _id: "Security", totalAmount: 50 },
      { _id: "Cleaning", totalAmount: 80 },
      { _id: "Laundry", totalAmount: 25 },
      { _id: "Maintenance", totalAmount: 105 },
    ];
  
    // Combine labels and align revenue & expenses
    const allLabels = Array.from(
      new Set([...revenueData.map((item) => item._id), ...expensesData.map((item) => item._id)])
    );
  
    const revenueAmounts = allLabels.map(
      (label) => revenueData.find((item) => item._id === label)?.totalAmount || 0
    );
  
    const expensesAmounts = allLabels.map(
      (label) => expensesData.find((item) => item._id === label)?.totalAmount || 0
    );
  
    const data = {
      labels: allLabels,
      datasets: [
        {
          label: "Revenue",
          data: revenueAmounts,
          backgroundColor: "rgba(75, 192, 192, 0.7)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
        {
          label: "Expenses",
          data: expensesAmounts,
          backgroundColor: "rgba(255, 200, 132, 0.7)",
          borderColor: "rgba(255, 150, 132, 1)",
          borderWidth: 1,
        },
      ],
    };
  
    const options = {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: "Revenue vs Expenses",
        },
        legend: {
          position: "top",
          labels: {
            font: {
              size: 14,
            },
            usePointStyle: true,
            padding: 10,
          }
        },
      },
      scales: {
        y: {
          grid: {
            color: 'rgba(0, 0, 0, 0.1)'
          },
          ticks: {
            font: {
              size: 12
            }
          }
        },
        x: {
          grid: {
            color: 'rgba(0, 0, 0, 0.1)'
          },
          ticks: {
            font: {
              size: 12
            }
          }
        }
      }
    };
  
    return (
      <div style={{ width: "600px", margin: "0 auto" }}>
        <Bar data={data} options={options} />
      </div>
    );
  };
  
  export default BarChart;