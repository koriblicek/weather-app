import { FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { useState } from 'react';
import { TemperatureUnits, TemperatureUnitsType } from 'src/types';

export interface ICalculatorPanelProps {
}

const MIN_C = 26.7;
const MIN_F = 80;
export function CalculatorPanel({ }: ICalculatorPanelProps) {
    const [temperatureUnit, setTemperatureUnit] = useState<TemperatureUnitsType>("celsius");
    const [temperature, setTemperature] = useState<number>(50);
    const [relativeHumidity, setRelativeHumidity] = useState<number>(100);

    function handleUnitChange(e: SelectChangeEvent) {
        setTemperatureUnit(e.target.value as TemperatureUnitsType);
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

    function calculateIndex() {

    }

    return (
        <Grid container spacing={1}>
            <Grid item xs>
                <TextField
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
                                    {unit[1]}
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
                    onChange={(e) => setRelativeHumidity(Number(e.target.value))}
                />
            </Grid>
        </Grid>
    );
}
