import { Button, TextField } from "@mui/material";
import React, { useContext, useState } from "react"
import { defaultFavoritesState, FavoritesState } from "../../state/FavoritesState";
import { FavoritesStateContext } from "../../state/FavoritesStateContextProvider";
import { TwitchDataStateContext } from "../../state/TwitchDataStateContextProvider";

import { v4 as uuidv4 } from 'uuid';
import ChromeStorage from "../../util/chrome/ChromeStorage";
import { FlexRow } from "../../util/FlexBox";
import { FavoritesProvider } from "../../state/FavoritesProvider";

export interface CategoryAdderProps {

}

export const CategoryAdder = (props: CategoryAdderProps) => {
    const [newCategoryName, setNewCategoryName] = useState<string>("");

    const twitchContext = useContext(TwitchDataStateContext);
    const favoritesContext = useContext(FavoritesStateContext);

    const userId = twitchContext.twitchDataState.userData?.id;

    return <>
        <FlexRow marginBottom={2}>
            <TextField
                size="small"
                label="Category Name"
                value={newCategoryName}
                onChange={(ev: any) => setNewCategoryName(ev.target.value)}
            />
            <Button onClick={() => {
                if (userId && newCategoryName) {
                    const categoryId = uuidv4()
                    const newState: FavoritesState = {
                        ...(favoritesContext.state ?? defaultFavoritesState),
                        categories: {
                            ...favoritesContext.state?.categories,
                            [categoryId]: {
                                id: categoryId,
                                label: newCategoryName,
                                color: "white"
                            }
                        }
                    }
                    FavoritesProvider.setFavorites(userId, newState);
                    favoritesContext.setState(newState)
                }
            }}>
                Add Category
            </Button>
        </FlexRow>
    </>
}