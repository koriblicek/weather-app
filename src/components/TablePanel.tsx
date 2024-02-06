import { Alert, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
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

    function createData(name: string, calories: number, fat: number, carbs: number, protein: number) {
        return { name, calories, fat, carbs, protein };
    }

    const rows = [
        createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
        createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
        createData('Eclair', 262, 16.0, 24, 6.0),
        createData('Cupcake', 305, 3.7, 67, 4.3),
        createData('Gingerbread', 356, 16.0, 49, 3.9),
    ];
    data.hourly["time"];
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
