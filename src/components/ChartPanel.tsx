import { Alert } from '@mui/material';
import { OpenMeteoDataStructureType } from 'src/types';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export interface IChartPanelProps {
    data: OpenMeteoDataStructureType | null;
}

export function ChartPanel({ data }: IChartPanelProps) {

    if (data === null) {
        return (
            <Alert severity="info">NO DATA</Alert>
        );
    }

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: false,
                text: 'Temperature (2 m)',
            },
        },
    };

    const labels = data.hourly.time.map((time) => {
        return time.split("T").join(" ");
    });

    const data1 = {
        labels,
        datasets: [
            {
                label: `Temperature (2m) ${data.hourly_units!.temperature_2m}`,
                data: data.hourly!.temperature_2m,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ]
    };

    return (
        <Line options={options} data={data1} />
    );
}

