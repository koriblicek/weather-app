import { Backdrop, CircularProgress } from '@mui/material';

export interface ILoadingBackdropProps {
    isLoading: boolean;
    onCancel: () => void;
}

export function LoadingBackdrop({ isLoading, onCancel }: ILoadingBackdropProps) {
    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isLoading}
            onClick={onCancel}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    );
}

