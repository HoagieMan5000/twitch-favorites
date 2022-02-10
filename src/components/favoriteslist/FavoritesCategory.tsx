import { Autocomplete, Button, Divider, TextField } from "@mui/material";
import React, { useState } from "react";
import { StreamData, UserData, UserFollows } from "../../service/TwitchClientTypes";
import { FlexCol, FlexRow } from "../../util/FlexBox";
import { TwitchStream } from "../streamlist/TwitchStream";
import { FavoriteCategory, FavoritesData, StreamFavoritesData } from "./FavoritesTypes";

export interface FavoritesCategoryProps {
    favorites: FavoritesData
    category: FavoriteCategory
    streams: StreamData[]
    following: UserData[]

    onFavoritesChange: (value: FavoritesData) => void
}

export const FavoritesCategory = (props: FavoritesCategoryProps) => {
    const { category, streams, following, favorites } = props;

    const [selectedStreamer, setSelectedStreamer] = useState<string | undefined | null>(undefined);

    const favoritesInCategory = favorites.favorites.filter(favorite => favorite.categoryIds.includes(category.id));
    const liveStreamsInCategory = streams.filter(stream => !!favoritesInCategory.find(fav => fav.channelId === stream.user_id));

    function onAddStreamer(streamer: UserData) {
        let existingFavorite = favorites.favorites.find(fav => fav.channelId === streamer.id);
        if (!existingFavorite) {
            existingFavorite = {
                channelId: streamer.id,
                channelName: streamer.display_name,
                categoryIds: [category.id]
            } as StreamFavoritesData;
            favorites.favorites.push(existingFavorite);
            props.onFavoritesChange({ ...favorites })
        } else {
            if (existingFavorite && !existingFavorite?.categoryIds.includes(category.id)) {
                existingFavorite?.categoryIds.push(category.id);
                props.onFavoritesChange({ ...favorites })
            } else {
                console.log(`Channel ${streamer.id} is already is the ${category.label} category`)
            }
        }
    }

    return <FlexCol className="favorite-category-container">
        <FlexCol>
            <div className="favorite-category-name">{category.label}</div>
            <FlexRow marginBottom={"10px"}>
                <Autocomplete
                    disablePortal
                    id="followed-streamers-selector"
                    size="small"
                    options={following.map(f => f.login)}
                    sx={{ width: 260 }}
                    renderInput={(params) => <TextField {...params} label="Add Streamer" />}
                    onChange={(event: any, newValue: string | null) => setSelectedStreamer(newValue)}
                />
                <Button onClick={() => {
                    const streamer = following.find(f => f.login === selectedStreamer);
                    console.log({ streamer, following })
                    if (streamer) {
                        onAddStreamer(streamer)
                    }
                }}
                >Add Streamer</Button>
            </FlexRow>
        </FlexCol>
        <FlexCol>
            {liveStreamsInCategory.map(liveStream => (
                <TwitchStream
                    userData={following.find(f => f.id === liveStream.user_id)}
                    stream={liveStream}
                />
            ))}
        </FlexCol>
        <Divider />
    </FlexCol>
}