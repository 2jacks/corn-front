import React, {useEffect, useRef} from 'react';

import {
   Chart as ChartJS,
   CategoryScale,
   LinearScale,
   BarElement,
   Title,
   Tooltip,
   Legend,
} from 'chart.js';
import {Bar} from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const FitoscanChart = ({data}) => {
   const options = {
      plugins: {
         legend: {
            position: 'top',
         },
         title: {
            display: true,
            text: 'Результаты анализа проб растений на содержание микро- и макроэлементов',
         },
      },
   };
   const labels = ['N', 'P', 'K', 'S', 'Ca', 'Mg', 'B', 'Cu', 'Zn', 'Mn', 'Fe', 'Mo', 'Co', 'J'];

   const output = {
      labels: labels,
      datasets: [{
         data: data,
         label: 'Дефицит / Профицит, %',
         backgroundColor: [
            'rgba(24, 144, 255, 0.2)',
         ],
         borderColor: [
            '#1890ff',
         ],
         borderWidth: 1
      }],
   }

   useEffect(() => {
      console.log(data)
   }, [data])


   return (
     <Bar type={'bar'} data={output} options={options}/>
   );
};

export {FitoscanChart};
