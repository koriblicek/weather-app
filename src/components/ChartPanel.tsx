import { Alert, FormControl, InputLabel, MenuItem, Select, Stack } from '@mui/material';
import { HourlyWeatherVariablesType, OpenMeteoDataStructureType } from 'src/types';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Fragment, useEffect, useState } from 'react';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export interface IChartPanelProps {
    data: OpenMeteoDataStructureType | null;
}


const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        }
    },
};

export function ChartPanel({ data }: IChartPanelProps) {

    const [selectedLine, setSelectedLine] = useState<HourlyWeatherVariablesType>("temperature_2m");

    if (data === null) {
        return (
            <Alert severity="info">NO DATA</Alert>
        );
    }

    const included = Object.keys(data.hourly).includes(selectedLine);

    const labels = data.hourly.time.map((time) => {
        return time.split("T").join(" ");
    });

    const data1 = {
        labels,
        datasets: [
            {
                label: `${included ? selectedLine : "temperature_2m"} (${data.hourly_units[included ? selectedLine : "temperature_2m"]})`,
                data: data.hourly[included ? selectedLine : "temperature_2m"],
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ]
    };

    return (
        <Fragment>
            <Stack gap={2}>
                <Line options={options} data={data1} />
                <FormControl fullWidth size='medium'>
                    <InputLabel id="hourly-weather-select-label">Hourly weather variable:</InputLabel>
                    <Select
                        labelId="hourly-weather-select-label"
                        id="hourly-weather-select"
                        value={included ? selectedLine : "temperature_2m"}
                        label="Hourly weather variable:"
                        onChange={(e) => {
                            setSelectedLine(e.target.value as HourlyWeatherVariablesType);
                        }}

                    >
                        {Object.keys(data.hourly).filter((key) => key !== "time").map(unit => {
                            return (
                                <MenuItem
                                    key={unit}
                                    value={unit}
                                >
                                    {`${unit}`}
                                </MenuItem>
                            );
                        })}
                    </Select>
                </FormControl>
            </Stack>
        </Fragment>
    );
}

