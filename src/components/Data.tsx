import { useEffect } from 'react';
import useGetAxiosFunction from 'src/hooks/useGetAxiosFunction';
import { OPEN_METEO_API_URL, OpenMeteoDataStructureType, SearchParameters } from 'src/types';

export interface IDataProps {
    searchParameters: SearchParameters;
}

export function Data({ searchParameters }: IDataProps) {

    const { isLoading, response, error, axiosFetch } = useGetAxiosFunction<OpenMeteoDataStructureType>();

    useEffect(() => {
        axiosFetch(OPEN_METEO_API_URL, { params: searchParameters });
    }, [searchParameters]);

    useEffect(() => {
        if (response) {
            console.log(response);

        }
    }, [response]);

    return (
        <div>

        </div>
    );
}

