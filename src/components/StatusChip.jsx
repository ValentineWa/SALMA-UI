import { Box, Stack, Typography } from "@mui/material";

const StatusChip = ({ label, color }) => {
    return (
        <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            justifyContent="flex-end"
        >
            <Box
                sx={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    backgroundColor: color,
                }}
            />

            <Typography
                variant="body2"
                fontWeight={600}
                sx={{
                    color,
                }}
            >
                {label}
            </Typography>
        </Stack>
    );
};

export default StatusChip;