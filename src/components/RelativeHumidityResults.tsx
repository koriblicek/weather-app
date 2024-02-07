import { Button, Card, CardActions, CardContent, CardHeader, Chip, Grid, Grow, Paper, Typography } from '@mui/material';
import { Fragment, useEffect, useMemo, useState } from 'react';
import { LS_KEY_HISTORY_HI, RelativeHumidityResult } from 'src/types';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

interface IRelativeHumidityResultsProps {
    result: RelativeHumidityResult | null;
}

export function RelativeHumidityResults({ result }: IRelativeHumidityResultsProps) {

    const [history, setHistory] = useState<RelativeHumidityResult[]>([]);

    useEffect(() => {
        const data = localStorage.getItem(LS_KEY_HISTORY_HI);
        if (data) {
            setHistory(JSON.parse(data));
        }
    }, []);

    function storeValue() {
        //remove latest values from history
        if (result) {
            const newHistory = [...history.filter((_, index) => index > (history.length - 5)), { ...result, date: Date.now() }];
            setHistory(newHistory);
            localStorage.setItem(LS_KEY_HISTORY_HI, JSON.stringify(newHistory));
        }
    }

    function deleteHistory() {
        setHistory([]);
        localStorage.removeItem(LS_KEY_HISTORY_HI);
    }

    const historyItems = useMemo(() => {
        return history.map((heatIndex, index) => {
            return (
                <Grid item key={`${index}${heatIndex}`}>
                    <Grow in={true}>
                        <Chip color="info" label={<><b>{heatIndex.value.toFixed(2)}°F</b> <br /> <i>{new Date(heatIndex.date).toLocaleString()}</i> </>} />
                    </Grow>
                </Grid>
            );

        });
    }, [history]);

    return (
        <Fragment>
            <Grid container spacing={1} gap={1}>
                <Grid item xs>
                    <Paper sx={{ p: 1 }}>
                        <Typography variant="body1">Heat index: {result ? result.value.toFixed(2) + "°F" : 'n/a'}</Typography>
                    </Paper>
                </Grid>
                <Grid item>
                    <Button
                        variant='contained'
                        disabled={!result}
                        startIcon={<SaveAltIcon fontSize='small' />}
                        onClick={storeValue}
                    >
                        Store value
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Card>
                        <CardHeader
                            title="Heat Index History">
                        </CardHeader>
                        <CardContent>
                            <Grid container spacing={1} alignItems='center'>
                                {(history.length === 0) ?
                                    <Grid item ><Chip label="no history" color="default" /></Grid>
                                    :
                                    historyItems
                                }
                            </Grid>
                        </CardContent>
                        <CardActions>
                            <Button
                                color='error'
                                disabled={history.length === 0}
                                onClick={deleteHistory}
                                startIcon={<DeleteOutlineIcon fontSize='small' />}
                            >
                                Delete history
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid >
        </Fragment >
    );
}
