import * as React from "react";
import { useContext, useState } from "react";
import Grid from "@mui/material/Grid";
import { FavoritesStateContext } from "../state/FavoritesStateContextProvider";
import { PopHeader } from "./PopHeader";
import { FavoritesListContainer } from "./favoriteslist/FavoritesListContainer";
import { TwitchDataStateContext } from "../state/TwitchDataStateContextProvider";
import ChromeStorage from "../util/chrome/ChromeStorage";
import { FavoritesState } from "../state/FavoritesState";
import { FlexRow } from "../util/FlexBox";
import { CategoryAdder } from "./favoriteslist/CategoryAdder";


const MainApp = () => {

    const twitchContext = useContext(TwitchDataStateContext);
    const favoritesContext = useContext(FavoritesStateContext);

    const userId = twitchContext.twitchDataState.userData?.id;
    const favoritesState = favoritesContext.state;

    return (
        <div>
            <PopHeader />
            <div className="App">
                <Grid container>
                    <Grid item xs={12}>
                        <CategoryAdder />
                    </Grid>
                    <Grid item xs={12}>
                        {
                            !!favoritesState && (<FavoritesListContainer
                                favorites={favoritesState}
                                onFavoritesChange={(newValue) => {
                                    if (userId) {
                                        const newState: FavoritesState = {
                                            ...favoritesContext.state,
                                            ...newValue
                                        }
                                        new ChromeStorage().setSync({
                                            [userId]: {
                                                ...newState
                                            }
                                        });
                                        favoritesContext.setState(newState)
                                    }
                                }}
                            />)}
                    </Grid>
                </Grid>
            </div >
        </div>
    )
};

export default MainApp;
