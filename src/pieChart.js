import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const PieChart = ({ data }) => {
  const chartContainerRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    if (chartContainerRef.current) {
        console.log(data)
      const labels = Object.keys(data);
      const values = Object.values(data);

      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy(); // Destroy previous chart instance
      }

      const ctx = chartContainerRef.current.getContext('2d');
      chartInstanceRef.current = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: labels,
          datasets: [
            {
              data: values,
              backgroundColor: ['blue', 'green', 'red', 'orange', 'purple'], // Customize the colors as per your preference
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
        },
      });
    }
  }, [data]);

  return <canvas ref={chartContainerRef}></canvas>;
};

export default PieChart;