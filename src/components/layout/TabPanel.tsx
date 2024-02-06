import { Box } from "@mui/material";
import { PropsWithChildren } from "react";

interface TabPanelProps {
    index: number;
    value: number;
}

export default function TabPanel({ index, value, children, ...other }: PropsWithChildren<TabPanelProps>) {

    return (
        <div
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            {...other}
        >
            {(value === index) && (
                <Box sx={{ p: 1 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}