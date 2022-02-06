import React from "react"
import { StreamData, UserFollows } from "../../service/TwitchClientTypes";
import { FlexCol } from "../../util/FlexBox";
import { TwitchStream } from "../streamlist/TwitchStream";
import { FavoriteCategory, FavoriteData } from "./FavoriteData";

export interface FavoriteCategoryListProps {
    category: FavoriteCategory;
    favorites: FavoriteData
    following: UserFollows[]
    streams: StreamData[]
}

export const FavoriteCategoryList = (props: FavoriteCategoryListProps) => {
    const { category, favorites, following, streams } = props;

    const liveCategoryFavorites = favorites.favorites.filter(favorite => favorite.categoryIds.has(category.id));
    const liveCategoryStreams = liveCategoryFavorites.map(favorite => streams.find(stream => stream.id === favorite.channelId)).filter(s => !!s);

    return (
        <FlexCol>
            <div>{category.label}</div>
            <FlexCol>
                {liveCategoryStreams.map(stream => (
                    <TwitchStream stream={stream as StreamData} />
                ))}
            </FlexCol>
        </FlexCol>
    );
}