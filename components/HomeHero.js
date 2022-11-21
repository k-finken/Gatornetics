import React, { useState } from "react";
import { Chart, ChartJS, ArcElement, Tooltip, Legend, Title, PieController } from 'chart.js';
import { Doughnut, Pie } from 'react-chartjs-2';
import Link from "next/link";
import { prisma, PrismaClient } from '@prisma/client';

Chart.register(ArcElement, Title, Legend, Tooltip, PieController);
const fetcher = (...args) => fetch(...args).then(res => res.json())

function Index({foundPlayer}) {
    const [show, setShow] = useState(false);

    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: "bottom"
          },
          tooltip: {
            callbacks: {
              label: function (tooltipItem) {
                const value = tooltipItem.dataset.data[tooltipItem.dataIndex];
    
                return ` ${value}%`;
              }
            }
          },
          datalabels: {
            display: true
          },
          title: {
            display : true,
            text: "National Champs",
            color: 'white',
            font: {
                size: 34,
                family: "system-ui",
                weight: "800"
            }
          }
        }
      };

    const dataPie = {
        labels: ["Ohio State", "Georgia"],
        datasets: [
            {
                data: [55, 45],
                backgroundColor: [
                    "rgb(102, 102, 102)",
                    "rgb(186, 12, 47)",
                ],
                hoverOffset: 2,
            },
        ],
    };
    


    return (
        <section className="">
            <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
                <div className="ml-10 mr-auto place-self-center lg:col-span-7">
                    <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white text-gray-200">Welcome to Gatornetics</h1>
                    <p className="max-w-2xl mb-6 font-light text-gray-200 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">From data visualization to in-depth machine learning models we provide all the tools you need.</p>
                    <p href="#" className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg transition focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
                        Get started
                        <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    </p>
                    <Link href="/signUp">
                        <a className="animate-bounce inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-200 border hover:text-gray-700 transition border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">Signup</a>
                    </Link>
                </div>
                <div className="mr-10 hidden lg:mt-0 lg:col-span-5 lg:flex"> 
                    <Pie data={dataPie} options={options}></Pie>
                </div>
            </div>
            <div className="shadow-lg rounded-lg overflow-hidden">
            </div>
        </section>
    );
}

export default Index;