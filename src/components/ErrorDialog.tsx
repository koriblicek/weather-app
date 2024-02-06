import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from '@mui/material';
import { IGetErrorObj } from 'src/hooks/useGetAxiosFunction';

export interface IErrorDialogProps {
    error: IGetErrorObj | null;
    onClose: () => void;
}

export function ErrorDialog({ error, onClose }: IErrorDialogProps) {
    return (
        <Dialog
            open={error !== null}
        >
            <DialogTitle>
                Data loading error!
            </DialogTitle>
            <DialogContent>
                <Typography>{error && error.code}</Typography>
                <Typography>{error && error.message}</Typography>
                <Typography>{error && error.url}</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} autoFocus>
                    OK
                </Button>
            </DialogActions>
        </Dialog>
    );
}
