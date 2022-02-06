export const defaultFavorites: FavoriteData = {
    favorites: [
        {
            channelId: "45425913373",
            channelName: "annelle",
            categoryIds: new Set<string>(["1", "2"])
        },
        {
            channelId: "408982109",
            channelName: "thesongery",
            categoryIds: new Set<string>(["1", "2"])
        }
    ],
    categories: {
        "1": {
            id: "1",
            label: "Mod"
        },
        "2": {
            id: "2",
            label: "Hangout"
        }
    }
}

export interface FavoriteCategory {
    id: string
    label: string
}

export interface FavoriteData {
    favorites: Favorite[]
    categories: Record<string, FavoriteCategory>
}

export interface Favorite {
    channelName: string
    channelId: string
    categoryIds: Set<string>
}