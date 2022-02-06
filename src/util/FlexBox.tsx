import Box, { BoxProps } from "@mui/material/Box";
import React, { ReactChild } from "react"

export interface FlexBoxProps extends BoxProps {
    inline?: boolean
    children: ReactChild | ReactChild[] | undefined
}

export const FlexRow = (props: FlexBoxProps) => {
    return (
        <Box {...props}
            display="flex"
            flexDirection="row"
        >
            {props.children}
        </Box>
    );
}

export const FlexCol = (props: FlexBoxProps) => {
    return (
        <Box {...props}
            display="flex"
            flexDirection="column"
        >
            {props.children}
        </Box>
    );
}