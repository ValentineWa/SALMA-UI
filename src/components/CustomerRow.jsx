import React from "react";

import {
    Avatar,
    Box,
    Divider,
    IconButton,
    Stack,
    Typography,
} from "@mui/material";

import MoreVertIcon from "@mui/icons-material/MoreVert";

const CustomerRow = ({
                         avatar,
                         name,
                         company,
                         divider = true,
                     }) => {
    return (
        <>
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                py={2}
            >
                <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                >
                    <Avatar
                        src={avatar}
                        alt={name}
                        sx={{
                            width: 50,
                            height: 50,
                        }}
                    />

                    <Box>
                        <Typography
                            fontWeight={700}
                        >
                            {name}
                        </Typography>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            {company}
                        </Typography>
                    </Box>
                </Stack>

                <IconButton>
                    <MoreVertIcon />
                </IconButton>
            </Box>

            {divider && <Divider />}
        </>
    );
};

export default CustomerRow;