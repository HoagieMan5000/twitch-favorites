import { Button, Divider } from "@mui/material";
import React from "react";
import { StreamData, UserFollows } from "../../service/TwitchClientTypes";
import { FlexCol, FlexRow } from "../../util/FlexBox";
import { TwitchStream } from "../streamlist/TwitchStream";
import { FavoriteCategory, FavoritesData } from "./FavoritesTypes";

export interface FavoritesCategoryProps {
    favorites: FavoritesData
    category: FavoriteCategory
    streams: StreamData[]
    following: UserFollows[]

    onFavoritesChange: (value: FavoritesData) => void
}

export const FavoritesCategory = (props: FavoritesCategoryProps) => {
    const { category, streams, following, favorites } = props;

    const favoritesInCategory = favorites.favorites.filter(favorite => favorite.categoryIds.has(category.id));
    const liveStreamsInCategory = streams.filter(stream => !!favoritesInCategory.find(fav => fav.channelId === stream.user_id));

    function onAddStreamer(channelId: string) {
        let existingFavorite = favorites.favorites.find(fav => fav.channelId === channelId);
        if (!existingFavorite) {
            // existingFavorite
        }

        if (existingFavorite && !existingFavorite?.categoryIds.has(category.id)) {
            existingFavorite?.categoryIds.add(category.id);
            props.onFavoritesChange(favorites)
        } else {
            console.log(`Channel ${channelId} is already is the ${category.label} category`)
        }
    }

    return <FlexCol>
        <FlexRow>
            <div className="favorite-category">{category.label}</div>
            <Button onClick={() => onAddStreamer("118391771")}>Add Streamer</Button>
        </FlexRow>
        <FlexCol>
            {liveStreamsInCategory.map(liveStream => (
                <TwitchStream
                    stream={liveStream}
                />
            ))}
        </FlexCol>
        <Divider />
    </FlexCol>
}