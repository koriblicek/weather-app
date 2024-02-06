import { Autocomplete, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, InputLabel, MenuItem, Select, TextField, useMediaQuery, useTheme } from '@mui/material';
import { useState } from 'react';
import { HourlWeatherVariables, SearchParameters, TemperatureUnits, TemperatureUnitsType } from 'src/types';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export interface IFilterDialogProps {
    open: boolean;
    initialSearchParameters: SearchParameters;
    onClose: () => void;
    onConfirm: (data: SearchParameters) => void;
}

export function FilterDialog({ open, initialSearchParameters, onClose, onConfirm }: IFilterDialogProps) {

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const [filterData, setFilterData] = useState<SearchParameters>(initialSearchParameters);

    const handleClose = () => {
        onConfirm(filterData);
    };

    return (
        <Dialog
            fullWidth
            fullScreen={fullScreen}
            open={open}
            // onClose={onClose}
            maxWidth='sm'
        >
            <DialogTitle>
                Specify search parameters
            </DialogTitle>
            <DialogContent dividers>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <FormControl fullWidth size='medium'>
                            <InputLabel id="temperature-unit-label">Temperature Unit</InputLabel>
                            <Select
                                labelId="temperature-unit-label"
                                id="temperature-unit"
                                value={filterData.temperature_unit}
                                label="Temperature Unit"
                                onChange={(e) => {
                                    setFilterData((prevData) => ({ ...prevData, temperature_unit: e.target.value as TemperatureUnitsType }));
                                }}

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
                    <Grid item xs={12}>
                        <Autocomplete
                            fullWidth
                            size='medium'
                            multiple
                            id="weather-variables"
                            options={HourlWeatherVariables}
                            value={filterData.hourly}
                            disableCloseOnSelect
                            getOptionLabel={(option) => option}
                            onChange={(_, values) => {
                                setFilterData((prevData) => ({ ...prevData, hourly: values }));
                            }}
                            renderOption={(props, option, { selected }) => (
                                <li {...props}>
                                    <Checkbox
                                        icon={icon}
                                        checkedIcon={checkedIcon}
                                        style={{ marginRight: 8 }}
                                        checked={selected}
                                    />
                                    {option}
                                </li>
                            )}
                            renderInput={(params) => (
                                <TextField {...params} label="Hourly Weather Variables" placeholder="" />
                            )}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label='Start Date'
                            value={filterData.start_date}
                            type="date"
                            onChange={(e) => {
                                setFilterData((prevData) => ({ ...prevData, start_date: e.target.value }));
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label='End Date'
                            value={filterData.end_date}
                            type="date"
                            onChange={(e) => {
                                setFilterData((prevData) => ({ ...prevData, end_date: e.target.value }));
                            }}
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={onClose}
                    color="inherit"
                >
                    Cancel
                </Button>
                <Button
                    onClick={handleClose}
                    autoFocus>
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
}
