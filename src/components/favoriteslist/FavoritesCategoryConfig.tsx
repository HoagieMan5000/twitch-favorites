import { Category } from "@mui/icons-material";
import { Autocomplete, Button, TextField } from "@mui/material";
import React, { useState } from "react"
import { SketchPicker } from "react-color";
import { UserData } from "../../service/TwitchClientTypes";
import { FlexCol, FlexRow } from "../../util/FlexBox";
import { FavoriteCategory } from "./FavoritesTypes";
import { StreamerSearchItem } from "./StreamerSearchItem";

export interface FavoritesCategoryConfigProps {
    category: FavoriteCategory
    following: UserData[]

    onAddStreamer: (streamer: UserData) => void
    onConfigChange: (config: FavoriteCategory) => void
}

export const FavoritesCategoryConfig = (props: FavoritesCategoryConfigProps) => {
    const { category, following, onAddStreamer, onConfigChange } = props;

    const [selectedStreamer, setSelectedStreamer] = useState<string | undefined | null>(undefined);

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
        <FlexRow>
            <SketchPicker
                color={category.color}
                onChangeComplete={(newColor: {hex: string}) => onConfigChange({
                    ...category,
                    color: newColor.hex
                })}
            />
        </FlexRow>
    </FlexCol>
}