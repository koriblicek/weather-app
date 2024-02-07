import { Fragment, useEffect, useState } from "react";
import { FilterDialog } from "./components/FilterDialog";
import { GeocodingType, OPEN_METEO_API_URL, OpenMeteoDataStructureType, SearchParameters } from "./types";
import { Box, Button, Grid, Paper, Stack, Tab, Tabs } from "@mui/material";
import { convertDate } from "./utils";
import TuneIcon from '@mui/icons-material/Tune';
import TableRowsIcon from '@mui/icons-material/TableRows';
import CalculateIcon from '@mui/icons-material/Calculate';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import TabPanel from "./components/layout/TabPanel";
import useGetAxiosFunction from "./hooks/useGetAxiosFunction";
import { LoadingBackdrop } from "./components/LoadingBackdrop";
import { ErrorDialog } from "./components/ErrorDialog";
import { ChartPanel } from "./components/ChartPanel";
import { TablePanel } from "./components/TablePanel";
import { CalculatorPanel } from "./components/CalculatorPanel";
import { LocationSelector } from "./components/LocationSelector";

const initialLocation = {
  "id": 2643743,
  "name": "London",
  "latitude": 51.50853,
  "longitude": -0.12574,
  "elevation": 25.0, "feature_code": "PPLC", "country_code": "GB", "admin1_id": 6269131, "admin2_id": 2648110, "timezone": "Europe/London", "population": 7556900, "country_id": 2635167, "country": "United Kingdom", "admin1": "England", "admin2": "Greater London"
};

const initialSearchParameters = {
  latitude: 51.50853,
  longitude: -0.12574,
  temperature_unit: "celsius",
  hourly: ['temperature_2m', 'weather_code', 'surface_pressure'],
  start_date: convertDate(new Date(Date.now() - 1000 * 60 * 60 * 24 * 2)),
  end_date: convertDate(new Date(Date.now() + 1000 * 60 * 60 * 24 * 2))
} as SearchParameters;

export default function App() {
  const [location, setLocation] = useState<GeocodingType>(initialLocation);
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState<boolean>(false);
  const [tabValue, setTabValue] = useState<number>(0);

  const [searchParams, setSearchParams] = useState<SearchParameters>(initialSearchParameters);
  const [data, setData] = useState<OpenMeteoDataStructureType | null>(null);

  const { isLoading, response, error, axiosFetch, cancelFetch } = useGetAxiosFunction<OpenMeteoDataStructureType>();

  //initialize load on filter change
  useEffect(() => {
    axiosFetch(OPEN_METEO_API_URL, { params: { ...searchParams, longitude: location.longitude, latitude: location.latitude } });
  }, [searchParams, axiosFetch, location]);

  useEffect(() => {
    if (response !== null) {
      setData(response);
    }
  }, [response]);

  function handleNewFilter(filterData: SearchParameters) {
    setSearchParams({ ...filterData });
    closeFilterDialog();
  }

  function closeFilterDialog() {
    setIsFilterDialogOpen(false);
  }

  return (
    <Fragment>
      <Paper>
        <Stack spacing={1}>
          <Tabs
            variant="fullWidth"
            value={tabValue}
            centered
            onChange={(_: React.SyntheticEvent, newValue: number) => {
              setTabValue(newValue);
            }}
          >
            <Tab icon={<TableRowsIcon />} label="Weather data table" wrapped />
            <Tab icon={<ShowChartIcon />} label="Weather chart" wrapped />
            <Tab icon={<CalculateIcon />} label="Heat index calculator" wrapped />
          </Tabs>
          <Box sx={{ display: tabValue !== 2 ? 'block' : 'none' }}>
            <Grid container gap={1}>
              <Grid item xs={12}>
                <LocationSelector updateLocation={setLocation} initialValue={initialLocation} />
              </Grid>
              <Grid item xs>
                <Button
                  fullWidth
                  size="large"
                  onClick={() => setIsFilterDialogOpen(true)}
                  variant="outlined"
                  startIcon={<TuneIcon />}
                  sx={{ borderRadius: 0 }}
                >
                  Specify weather conditions parameters
                </Button>
              </Grid>
            </Grid>
          </Box>
          <TabPanel value={tabValue} index={0}>
            <TablePanel data={data} />
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <ChartPanel data={data} />
          </TabPanel>
          <TabPanel value={tabValue} index={2}>
            <CalculatorPanel />
          </TabPanel>
        </Stack>
      </Paper>
      <FilterDialog
        open={isFilterDialogOpen}
        initialSearchParameters={searchParams}
        onClose={closeFilterDialog}
        onConfirm={handleNewFilter}
      />
      <ErrorDialog error={error} onClose={cancelFetch} />
      <LoadingBackdrop isLoading={isLoading} onCancel={cancelFetch} />
    </Fragment >
  );
}