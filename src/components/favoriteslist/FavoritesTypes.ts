export const defaultFavoritesData: FavoritesData  = {
    favorites: [
        {
            channelName: "marinemammalrescue",
            channelId: "538506717",
            categoryIds: new Set<string>([
                "3",
            ])
        },
        {
            channelName: "roxygunnproject",
            channelId: "563474463",
            categoryIds: new Set<string>([
                "2"
            ])
        }
    ],
    categories: {
        "1": {
            id: "1",
            label: "Modding",
        },
        "2": {
            id: "2",
            label: "Music",
        },
        "3": {
            id: "3",
            label: "Other",
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
    categoryIds: Set<string>
}

export interface FavoriteCategory {
    id: string
    label: string
}