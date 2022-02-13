import React, { useState } from "react";
import { FlexCol, FlexRow } from "../../util/FlexBox";
import { FavoritesCategoryConfig } from "./FavoritesCategoryConfig";
import { FavoriteCategory } from "./FavoritesTypes";

import SettingsIcon from '@mui/icons-material/Settings';
import { UserData } from "../../service/TwitchClientTypes";

export interface FavoriteCategoryBannerProps {
    category: FavoriteCategory
    following: UserData[]

    onAddStreamer: (streamer: UserData) => void
    onConfigChange: (config: FavoriteCategory) => void
}

export const FavoriteCategoryBanner = (props: FavoriteCategoryBannerProps) => {
    const { category, following, onAddStreamer, onConfigChange } = props;

    const [showSettings, setShowSettings] = useState(false);

    return (
        <FlexCol>
            <FlexRow style={{backgroundColor: category.color}} >
                <div className="favorite-category-name">{category.label}</div>
                <SettingsIcon
                    style={{ color: "lightgrey", cursor: "pointer" }}
                    onClick={() => setShowSettings(!showSettings)}
                />
            </FlexRow>
            <FlexRow marginBottom={"10px"}>
                {showSettings &&
                    <FavoritesCategoryConfig
                        category={category}
                        following={following}
                        onAddStreamer={onAddStreamer}
                        onConfigChange={onConfigChange}
                    />
                }
            </FlexRow>
        </FlexCol>
    );
}