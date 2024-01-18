import React, { useContext } from "react";
import { FavoritesStateContext } from "../../state/FavoritesStateContextProvider";
import { TwitchDataStateContext } from "../../state/TwitchDataStateContextProvider";
import { FlexCol } from "../../util/FlexBox";
import { FavoritesCategory } from "./FavoritesCategory";
import { FavoriteCategory, FavoritesData } from "./FavoritesTypes";

export interface FavoritesListContainerProps {
    favorites: FavoritesData
    onFavoritesChange: (value: FavoritesData) => void
}

export const FavoritesListContainer = (props: FavoritesListContainerProps) => {
    const { favorites } = props;

    const { twitchDataState: { following, streams } } = useContext(TwitchDataStateContext);
    const favoritesContext = useContext(FavoritesStateContext);

    console.log({following, streams, favorites});
    return <FlexCol>
        {Object.keys(favorites.categories).map(categoryId => (
            <FavoritesCategory
                favorites={favorites}
                category={favorites.categories[categoryId]}
                streams={streams ?? []}
                following={following ?? []}

                onFavoritesChange={props.onFavoritesChange}
                onCategoryDataChange={(newCategory: FavoriteCategory) => {
                    props.onFavoritesChange({
                        ...favorites,
                        categories: {
                            ...favorites.categories,
                            [newCategory.id]: newCategory
                        }
                    })
                }}
                onCategoryRemove={() => {
                    const newState = {
                        ...favoritesContext.state
                    } as FavoritesData;
                    delete newState.categories?.[categoryId]
                    props.onFavoritesChange(newState);
                }}
            />
        ))}
    </FlexCol>
}