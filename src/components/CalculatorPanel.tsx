import { FormControl, Grid, InputAdornment, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { RelativeHumidityResult, TemperatureUnits, TemperatureUnitsType } from 'src/types';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import { RelativeHumidityResults } from './RelativeHumidityResults';
import { getC, getF } from 'src/utils';

const MIN_C = 26.7;
const MIN_F = 80;
export function CalculatorPanel() {
    const [temperatureUnit, setTemperatureUnit] = useState<TemperatureUnitsType>("fahrenheit");
    const [temperature, setTemperature] = useState<number>(80);
    const [relativeHumidity, setRelativeHumidity] = useState<number>(100);
    const [result, setResult] = useState<RelativeHumidityResult | null>(null);

    function handleUnitChange(e: SelectChangeEvent) {
        const newUnit = e.target.value as TemperatureUnitsType;
        switch (newUnit) {
            case "celsius":
                setTemperature((prevValue) => {
                    return Math.max(getC(prevValue), MIN_C);
                });
                break;
            case "fahrenheit":
                setTemperature((prevValue) => {
                    return Math.max(getF(prevValue), MIN_F);
                });
                break;
        }
        setTemperatureUnit(newUnit);
    }

    function normalize() {
        switch (temperatureUnit) {
            case "celsius":
                setTemperature(temperature < MIN_C ? MIN_C : temperature);
                break;
            case "fahrenheit":
                setTemperature(temperature < MIN_F ? MIN_F : temperature);
                break;
        }
    }

    useEffect(() => {
        calculateIndex(temperature, temperatureUnit, relativeHumidity);
    }, [temperature, temperatureUnit, relativeHumidity]);

    function calculateIndex(t: number, tu: TemperatureUnitsType, rh: number) {
        t = (tu === "celsius") ? getF(t) : t;
        if (t < MIN_F) {
            setResult(null);
            return;
        }
        const value = -42.379 + (2.04901523 * t) + (10.14333127 * rh)
            - (0.22475541 * t * rh) - (6.83783 * Math.pow(10, -3) * Math.pow(t, 2))
            - (5.481717 * Math.pow(10, -2) * Math.pow(rh, 2)) + (1.22874 * Math.pow(10, -3) * Math.pow(t, 2) * rh)
            + (8.5282 * Math.pow(10, -4) * t * Math.pow(rh, 2)) - (1.99 * Math.pow(10, -6) * Math.pow(t, 2) * Math.pow(rh, 2));
        setResult({ value: value, unit: tu, date: Date.now() });
        // if (resultsRef.current) {
        //     resultsRef.current.updateResults();
        // }
    }


    return (
        <Grid container spacing={1} alignContent='center'>
            <Grid item xs>
                <TextField
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <DeviceThermostatIcon />
                            </InputAdornment>
                        ),
                    }}
                    fullWidth
                    size="small"
                    label='Air Temperature'
                    value={temperature}
                    type="number"
                    onChange={(e) => setTemperature(Number(e.target.value))}
                    onBlur={normalize}
                />
            </Grid>
            <Grid item xs>
                <FormControl fullWidth size='small'>
                    <InputLabel id="temperature-unit-label">Temperature Unit</InputLabel>
                    <Select
                        labelId="temperature-unit-label"
                        id="temperature-unit"
                        value={temperatureUnit}
                        label="Temperature Unit"
                        onChange={(e) => handleUnitChange(e)}
                    >
                        {TemperatureUnits.map(unit => {
                            return (
                                <MenuItem
                                    key={unit[0]}
                                    value={unit[0]}
                                >
                                    {`${unit[1]} (${unit[2]})`}
                                </MenuItem>
                            );
                        })}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs>
                <TextField
                    fullWidth
                    size="small"
                    label='Relative humidity %'
                    value={relativeHumidity}
                    type="number"
                    InputProps={{
                        inputProps: { min: 0, max: 100 },
                        startAdornment: (
                            <InputAdornment position="start">
                                <WaterDropIcon />
                            </InputAdornment>
                        ),
                    }}
                    onChange={(e) => setRelativeHumidity(Number(e.target.value))}
                />
            </Grid>
            <Grid item xs={12}>
                <RelativeHumidityResults result={result} />
            </Grid>
        </Grid>
    );
}
