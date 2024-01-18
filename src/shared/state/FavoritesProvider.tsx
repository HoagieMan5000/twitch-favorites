import CachedDataProvider from "../util/CachedDataProvider";
import { FavoritesData } from "../components/favoriteslist/FavoritesTypes";
import { filterOutFavoritesNoCategory } from "./FavoritesState";

export class FavoritesProvider {
    public static async getFavorites(userId: string): Promise<FavoritesData> {
        const favorites = await CachedDataProvider.getFavorites(userId);
        favorites.favorites = filterOutFavoritesNoCategory(favorites.favorites);
        return favorites;
    }

    public static async setFavorites(userId: string, favorites: FavoritesData): Promise<void> {
        const newFavorites = {
            ...favorites,
            favorites: filterOutFavoritesNoCategory(favorites.favorites)
        };
        return await CachedDataProvider.setFavorites(userId, newFavorites);
    }
}