import { Fragment, useState } from "react";
import { FilterDialog } from "./components/FilterDialog";
import { SearchParameters } from "./types";
import { AppBar, Box, Button, Card, Paper, Tab, Tabs } from "@mui/material";
import { Data } from "./components/Data";
import { convertDate } from "./utils";
import TuneIcon from '@mui/icons-material/Tune';
import TableRowsIcon from '@mui/icons-material/TableRows';
import CalculateIcon from '@mui/icons-material/Calculate';
import ShowChartIcon from '@mui/icons-material/ShowChart';

const initialSearchParameters = {
  latitude: 51.50853,
  longitude: -0.12574,
  temperature_unit: "celsius",
  hourly: ['temperature_2m', 'weather_code', 'surface_pressure'],
  start_date: convertDate(new Date(Date.now() - 1000 * 60 * 60 * 24 * 2)),
  end_date: convertDate(new Date(Date.now() + 1000 * 60 * 60 * 24 * 2))
} as SearchParameters;

function App() {
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState<boolean>(false);
  const [tabValue, setTabValue] = useState<number>(0);
  const [searchParams, setSearchParams] = useState<SearchParameters>(initialSearchParameters);

  function handleNewFilter(filterData: SearchParameters) {
    setSearchParams({ ...filterData });
    closeFilterDialog();
  }

  function closeFilterDialog() {
    setIsFilterDialogOpen(false);
  }

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Fragment>
      <Paper sx={{ maxWidth: '640px' }}>
        <Tabs
          // variant="fullWidth"
          value={tabValue}
          centered
          onChange={(event: React.SyntheticEvent, newValue: number) => {
            setTabValue(newValue);
          }}
        >
          <Tab icon={<TableRowsIcon />} label="Weather data table" wrapped />
          <Tab icon={<ShowChartIcon />} label="Weather chart" wrapped />
          <Tab icon={<CalculateIcon />} label="Heat index calculator" wrapped />
        </Tabs>
      </Paper>
      <Button
        onClick={() => setIsFilterDialogOpen(true)}
        variant="outlined"
        startIcon={<TuneIcon />}
      >
        Filter
      </Button>
      <Data searchParameters={searchParams} />
      <FilterDialog
        open={isFilterDialogOpen}
        initialSearchParameters={searchParams}
        onClose={closeFilterDialog}
        onConfirm={handleNewFilter}
      />
    </Fragment>
  );
}

export default App;
