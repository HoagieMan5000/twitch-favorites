import { Autocomplete, Button, TextField } from "@mui/material";
import React, { useState } from "react"
import { UserData } from "../../service/TwitchClientTypes";
import { FlexRow } from "../../util/FlexBox";
import { StreamerSearchItem } from "./StreamerSearchItem";

export interface FavoritesCategoryConfigProps {
    following: UserData[]

    onAddStreamer: (streamer: UserData) => void
}

export const FavoritesCategoryConfig = (props: FavoritesCategoryConfigProps) => {
    const { following, onAddStreamer } = props;

    const [selectedStreamer, setSelectedStreamer] = useState<string | undefined | null>(undefined);

    return <FlexRow marginBottom={"10px"}>
        <Autocomplete
            disablePortal
            id="followed-streamers-selector"
            size="small"
            options={following?.map(f => f.login)}
            sx={{ width: 260 }}
            renderInput={(params) => <TextField {...params} label="Add Streamer" />}
            renderOption={(props, option) => <StreamerSearchItem optionProps={props} option={option} following={following} />}
            onChange={(event: any, newValue: string | null) => setSelectedStreamer(newValue)}
        />
        <Button onClick={() => {
            const streamer = following?.find(f => f.login === selectedStreamer);
            if (streamer) {
                onAddStreamer(streamer)
            }
        }}
        >Add Streamer</Button>
    </FlexRow>
}