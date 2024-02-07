import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import { ChangeEvent, Fragment, useEffect, useState } from 'react';
import useGetAxiosFunction from 'src/hooks/useGetAxiosFunction';
import { GEOCODING_API_URL, GeocodingSearchType, GeocodingType } from 'src/types';

export interface ILocationSelectorProps {
    initialValue: GeocodingType;
    updateLocation: (location: GeocodingType) => void;
}

export function LocationSelector({ updateLocation, initialValue }: ILocationSelectorProps) {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState<GeocodingType | null>(initialValue);
    const [options, setOptions] = useState<readonly GeocodingType[]>([]);

    const { isLoading, response, axiosFetch } = useGetAxiosFunction<GeocodingSearchType>();

    function onChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        axiosFetch(GEOCODING_API_URL, { params: { name: e.target.value, count: 10, language: 'en' } });
    }

    useEffect(() => {
        if (response) {
            if (response.results !== undefined) {
                setOptions(response.results);
            }
        }
    }, [response]);

    return (
        <Autocomplete
            id="location-autocomplete-id"
            fullWidth
            value={value}
            size='medium'
            open={open}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
            }}
            onChange={(_, newValue) => {
                if (newValue !== null) {
                    setValue(newValue);
                    setOptions([]);
                    updateLocation(newValue);
                }
            }}
            isOptionEqualToValue={() => {
                return true;
            }}
            getOptionLabel={(option) => option.id + ": " + option.name + " (" + option.country + ")"}
            options={options}
            loading={isLoading}
            renderInput={(params) => (
                <TextField
                    {...params}
                    onChange={(e) => onChange(e)}
                    label="Enter Location"
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <Fragment>
                                {isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </Fragment>
                        ),
                    }}
                />
            )}
        />
    );
}
