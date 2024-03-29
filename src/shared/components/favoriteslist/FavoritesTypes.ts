export const defaultFavoritesData: FavoritesData  = {
    favorites: [
    ],
    categories: {
        "1": {
            id: "1",
            label: "Modding",
            color: "light-grey"
        },
        "2": {
            id: "2",
            label: "Music",
            color: "white"
        },
        "3": {
            id: "3",
            label: "Other",
            color: "white"
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