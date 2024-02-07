import { Alert, Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import { OpenMeteoDataStructureType } from 'src/types';

export interface ITablePanelProps {
    data: OpenMeteoDataStructureType | null;
}

export function TablePanel({ data }: ITablePanelProps) {
    if (data === null) {
        return (
            <Alert severity="info">NO DATA</Alert>
        );
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableBody>
                    {Object.keys(data.hourly).map((key, index) => (
                        <TableRow
                            key={key}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {key} ({Object.values(data.hourly_units)[index]})
                            </TableCell>
                            {Object.values(data.hourly)[index].map((value, jndex) => {
                                return (
                                    <TableCell key={jndex}>{key === "time" && (typeof value === "string") ? value.split("T").join(" ") : value}</TableCell>
                                );
                            })}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
