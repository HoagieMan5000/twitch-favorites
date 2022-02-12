import { Autocomplete, Button, CircularProgress, Divider, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import { useUserData } from "../../hooks/UserData";
import { StreamData, UserData, UserFollows } from "../../service/TwitchClientTypes";
import { AppStateContext } from "../../state/AppStateContextProvider";
import { FlexCol, FlexRow } from "../../util/FlexBox";
import { StreamerAvatar } from "../StreamerAvatar";
import { TwitchStream } from "../streamlist/TwitchStream";
import { FavoriteCategory, FavoritesData, StreamFavoritesData } from "./FavoritesTypes";
import { StreamerSearchItem } from "./StreamerSearchItem";

export interface FavoritesCategoryProps {
    favorites: FavoritesData
    category: FavoriteCategory
    streams: StreamData[]
    following: UserData[]

    onFavoritesChange: (value: FavoritesData) => void
}

export const FavoritesCategory = (props: FavoritesCategoryProps) => {
    const { category, streams, following, favorites } = props;

    const { appState } = useContext(AppStateContext);

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

    function onRemoveStreamer(id: string) {
        let existingFavorite = favorites.favorites.find(fav => fav.channelId === id);
        if (existingFavorite) {
            existingFavorite.categoryIds = existingFavorite?.categoryIds.filter(e => e !== category.id);
            props.onFavoritesChange({
                ...favorites,
            });
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
                    renderOption={(props, option) => <StreamerSearchItem optionProps={props} option={option} following={following} />}
                    onChange={(event: any, newValue: string | null) => setSelectedStreamer(newValue)}
                />
                <Button onClick={() => {
                    const streamer = following.find(f => f.login === selectedStreamer);
                    if (streamer) {
                        onAddStreamer(streamer)
                    }
                }}
                >Add Streamer</Button>
            </FlexRow>
        </FlexCol>
        <FlexCol>
            {!appState.isLoading ? liveStreamsInCategory.map(liveStream => (
                <TwitchStream
                    userData={following.find(f => f.id === liveStream.user_id)}
                    stream={liveStream}
                    onRemove={onRemoveStreamer}
                />
            )): []}
            {appState.isLoading && <CircularProgress />}
        </FlexCol>
        <Divider />
    </FlexCol >
}