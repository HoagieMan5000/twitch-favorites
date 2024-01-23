import { FavoritesData, StreamFavoritesData } from "../components/favoriteslist/FavoritesTypes";

export type FavoritesState = FavoritesData
export const defaultFavoritesState: FavoritesState = {
    categories: {},
    favorites: []
}

export function filterOutFavoritesNoCategory(favorites: StreamFavoritesData[]) {
    return favorites.filter(favorite => !!favorite.categoryIds && favorite.categoryIds.length > 0)
}