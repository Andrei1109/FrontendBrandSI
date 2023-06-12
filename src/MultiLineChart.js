import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const MultiLineChart = ({ data }) => {
  const chartContainerRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    if (chartContainerRef.current) {
      const colors = ['blue', 'green', 'red'];

      const datasets = Object.keys(data).map((key, index) => {
        let borderColor, backgroundColor;
        if (key === 'Facebook Page') {
          borderColor = 'blue';
          backgroundColor = 'rgba(0, 0, 255, 0.2)';
        } else if (key === 'total') {
          borderColor = 'grey';
          backgroundColor = 'rgba(0, 255, 0, 0.2)';
        } else {
          borderColor = colors[index % colors.length];
          backgroundColor = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.2)`;
        }

        return {
          label: key,
          data: data[key].map(item => item.value),
          borderColor,
          backgroundColor,
        };
      });

      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy(); // Destroy previous chart instance
      }

      const ctx = chartContainerRef.current.getContext('2d');
      chartInstanceRef.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: data.facebook_page.map(item => item.date),
          datasets: datasets,
        },
        options: {
          scales: {
            x: {
              type: 'category',
            },
            y: {
              type: 'linear',
            },
          },
        },
      });
    }
  }, [data]);

  return <canvas ref={chartContainerRef}></canvas>;
};

export default MultiLineChart;
