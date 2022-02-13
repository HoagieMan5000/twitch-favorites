export const defaultCategoryColor = "#616161";

export const defaultFavoritesData: FavoritesData  = {
    favorites: [
        {
            channelName: "marinemammalrescue",
            channelId: "538506717",
            categoryIds: ["3"]
        },
        {
            channelName: "roxygunnproject",
            channelId: "563474463",
            categoryIds: ["2"],
        }
    ],
    categories: {
        "1": {
            id: "1",
            label: "Modding",
            color: defaultCategoryColor
        },
        "2": {
            id: "2",
            label: "Music",
            color: defaultCategoryColor
        },
        "3": {
            id: "3",
            label: "Other",
            color: defaultCategoryColor
        },
    }
}

export interface FavoritesData {
    favorites: StreamFavoritesData[]
    categories: Record<string, FavoriteCategory>
}

export interface StreamFavoritesData {
    channelId: string
    channelName: string
    categoryIds: string[]
}

export interface FavoriteCategory {
    id: string
    label: string
    color: string
}