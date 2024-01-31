import React from 'react';
import { Line } from "react-chartjs-2";
// eslint-disable-next-line 
import { Chart as ChartJs } from 'chart.js/auto';
export default function LineChart(props) {


    const ChartData = {
        labels: props.labels,
        datasets: [
            {
                label: "Total Articles ",
                data: props.values,
                fill: false,
                borderColor: "#2C73D2",
                tension: 0.2,
                backgroundColor: ['#FF7B95', '#9BDEAC', '#C54765', '#C2FCF2', '#9BDEAC', '#F7EBF0'],
                pointRadius: 7,
                pointHoverRadius: 10
            }
        ]
    }

    return (
        <Line
        data={ChartData} options={
            {
                responsive: true,
                
                indexAxis: 'x',
                scales: {
                    x: {
                        ticks: {
                            font: {
                                size: 16,

                            }
                        }
                    },
                    y: {
                        type: 'logarithmic',
                        ticks: {
                            font: {
                                size: 18,
                                weight: "bold",
                            },
                        }
                    }

                },
                plugins: {

                    legend: {
                        display: false
                    }
                },
                animation: {
                    duration: 3000,
                    easing: 'easeOutBounce',
                },
            }
        }
    />
    )
}
