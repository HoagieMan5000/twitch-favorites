import { FavoritesData } from "../components/favoriteslist/FavoritesTypes";

export type FavoritesState = FavoritesData
export const defaultFavoritesState: FavoritesState = {
    categories: {},
    favorites: []
}