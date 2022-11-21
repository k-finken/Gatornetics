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
import Layout from '../components/Layout'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Machinelearning({players}) {

  const dataGraph = {
    labels: ["Florida", "Texas A&M", "Ohio State", "Georgia"],
    datasets: [
      {
        label: "This years national champion",
        data: [85,5,5,5],
        backgroundColor: [
          "rgb(173, 216, 230)",
          "rgb(144, 238, 144)",
        ],
        hoverOffset: 2,
      },
    ],
  };


  return (
    <Layout>
      <div className='mt-10 w-full flex justify-center items-center'>
        <div className="w-full flex justify-center items-center mt-10">
        <Bar data={dataGraph}></Bar>
        </div>
      </div>
    </Layout>
  )
}
