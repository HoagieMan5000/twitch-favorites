import { Autocomplete, Button, TextField } from "@mui/material";
import React, { useState } from "react"
import { ChromePicker, ColorResult } from "react-color";
import { UserData } from "../../service/TwitchClientTypes";
import { FlexCol, FlexRow } from "../../util/FlexBox";
import { ColorSelector } from "../ColorSelector";
import { FavoriteCategory } from "./FavoritesTypes";
import { StreamerSearchItem } from "./StreamerSearchItem";

export interface FavoritesCategoryConfigProps {
    following: UserData[]
    category: FavoriteCategory

    onAddStreamer: (streamer: UserData) => void
    onChangeColor: (newColor: string) => void
}

export const FavoritesCategoryConfig = (props: FavoritesCategoryConfigProps) => {
    const { following, category, onAddStreamer } = props;

    const [selectedStreamer, setSelectedStreamer] = useState<string | undefined | null>(undefined);

    console.log({ following });

    return <FlexCol>
        <FlexRow marginBottom={"10px"}>
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
        <ColorSelector
            color={category.color}
            onChange={(newColor: string) => props.onChangeColor(newColor)}
        />
    </FlexCol>
}