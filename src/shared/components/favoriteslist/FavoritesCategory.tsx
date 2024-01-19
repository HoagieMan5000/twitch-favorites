import { CircularProgress, Divider, TextField } from '@mui/material';
import React, { useContext, useState } from 'react';
import { StreamData, UserData, UserFollows } from '../../service/TwitchClientTypes';
import { AppStateContext } from '../../state/AppStateContextProvider';
import { FlexCol, FlexRow } from '../../util/FlexBox';
import { TwitchStream } from '../streamlist/TwitchStream';
import { FavoritesCategoryConfig } from './FavoritesCategoryConfig';
import { FavoriteCategory, FavoritesData, StreamFavoritesData } from './FavoritesTypes';

import SettingsIcon from '@mui/icons-material/Settings';
import { FavoritesOfflineList } from './FavoritesOfflineList';
import { CategoryActionMenu } from './CategoryActionMenu';

export interface FavoritesCategoryProps {
  favorites: FavoritesData;
  category: FavoriteCategory;
  streams: StreamData[];
  following: UserData[];

  onFavoritesChange: (value: FavoritesData) => void;
  onCategoryDataChange: (value: FavoriteCategory) => void;
  onCategoryRemove: () => void;
}

export const FavoritesCategory = (props: FavoritesCategoryProps) => {
  const { category, streams, following, favorites } = props;

  const { appState } = useContext(AppStateContext);

  const [showSettings, setShowSettings] = useState(false);

  const favoritesInCategory = favorites.favorites.filter(favorite => favorite.categoryIds.includes(category.id));
  const liveStreamsInCategory = streams.filter(
    stream => !!favoritesInCategory.find(fav => fav.channelId === stream.user_id),
  );

  function onAddStreamer(streamer: UserData) {
    let existingFavorite = favorites.favorites.find(fav => fav.channelId === streamer.id);
    if (!existingFavorite) {
      existingFavorite = {
        channelId: streamer.id,
        channelName: streamer.display_name,
        categoryIds: [category.id],
      } as StreamFavoritesData;
      favorites.favorites.push(existingFavorite);
      props.onFavoritesChange({ ...favorites });
    } else {
      if (existingFavorite && !existingFavorite?.categoryIds.includes(category.id)) {
        existingFavorite?.categoryIds.push(category.id);
        props.onFavoritesChange({ ...favorites });
      } else {
        console.log(`Channel ${streamer.id} is already is the ${category.label} category`);
      }
    }
  }

  function onChangeColor(newColor: string) {
    props.onCategoryDataChange({
      ...props.category,
      color: newColor,
    });
  }

  function onRemoveStreamer(id: string) {
    let existingFavorite = favorites.favorites.find(fav => fav.channelId === id);
    if (existingFavorite) {
      existingFavorite.categoryIds = existingFavorite?.categoryIds.filter(e => e !== category.id);
      if (existingFavorite.categoryIds.length === 0) {
        favorites.favorites = favorites.favorites.filter(fav => fav.channelId !== id);
      }
      props.onFavoritesChange({
        ...favorites,
      });
    }
  }

  return (
    <FlexCol className="favorite-category-container">
      <FlexCol>
        <FlexRow style={{ backgroundColor: category.color ?? 'white' }} justifyContent="space-between">
          <FlexRow>
            <div className="favorite-category-name">{category.label}</div>
            <SettingsIcon
              style={{ color: 'lightgrey', cursor: 'pointer' }}
              onClick={() => setShowSettings(!showSettings)}
            />
          </FlexRow>
          <FlexRow>
            <CategoryActionMenu
              onRemove={() => {
                props.onCategoryRemove();
              }}
            />
          </FlexRow>
        </FlexRow>
        <FlexRow marginBottom={'10px'}>
          {showSettings && (
            <FavoritesCategoryConfig
              following={following}
              category={category}
              onChangeColor={onChangeColor}
              onAddStreamer={onAddStreamer}
            />
          )}
        </FlexRow>
      </FlexCol>
      <FlexCol>
        {!appState.isLoading
          ? liveStreamsInCategory.map(liveStream => (
              <TwitchStream
                userData={following.find(f => f.id === liveStream.user_id)}
                stream={liveStream}
                onRemove={onRemoveStreamer}
              />
            ))
          : []}
        {appState.isLoading && <CircularProgress />}
      </FlexCol>
      <FavoritesOfflineList
        favorites={favorites}
        category={category}
        streams={streams}
        following={following}
        onRemove={onRemoveStreamer}
      />
      <Divider />
    </FlexCol>
  );
};
