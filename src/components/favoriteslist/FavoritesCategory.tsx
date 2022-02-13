import { CircularProgress, Divider } from "@mui/material";
import React, { useContext } from "react";
import { StreamData, UserData } from "../../service/TwitchClientTypes";
import { AppStateContext } from "../../state/AppStateContextProvider";
import { FlexCol } from "../../util/FlexBox";
import { TwitchStream } from "../streamlist/TwitchStream";
import { FavoriteCategory, FavoritesData, StreamFavoritesData } from "./FavoritesTypes";

import { FavoritesOfflineList } from "./FavoritesOfflineList";
import { FavoriteCategoryBanner } from "./FavoriteCategoryBanner";

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
        <FavoriteCategoryBanner
            category={category}
            following={following}
            onAddStreamer={onAddStreamer}
            onConfigChange={(config: FavoriteCategory) => {
                props.onFavoritesChange({
                    ...favorites,
                    categories: {
                        ...favorites.categories,
                        [config.id]: config
                    }
                })
            }
            }
        />
        <FlexCol style={{ margin: 5 }}>
            {!appState.isLoading ? liveStreamsInCategory.map(liveStream => (
                <TwitchStream
                    userData={following.find(f => f.id === liveStream.user_id)}
                    stream={liveStream}
                    onRemove={onRemoveStreamer}
                />
            )) : []}
            {appState.isLoading && <CircularProgress />}
        </FlexCol>
        <FavoritesOfflineList
            favorites={favorites}
            category={category}
            streams={streams}
            following={following}

            onRemove={onRemoveStreamer}
        />
        <Divider />
    </FlexCol >
}