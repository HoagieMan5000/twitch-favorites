import { GetLiveStreamsResponse } from '@root/src/shared/messaging/GetLiveStreams';
import CachedDataProvider from '@root/src/shared/util/CachedDataProvider';

export function initStreamInfoProvider() {
  chrome.runtime.onMessage.addListener(function (
    request: any,
    sender: chrome.runtime.MessageSender,
    sendResponse: (response: any) => void,
  ) {
    console.log("HAI RECEIVED MESSAGE");
    console.log({ request, sender, sendResponse });
    if (request.type === 'getLiveStreams') {
      getStreamInfo().then(streamInfo => {
        console.log({ streamInfo });
        const response: GetLiveStreamsResponse = {
          type: 'getLiveStreamsResponse',
          streams: streamInfo.streamsData,
          userData: streamInfo.favUserData,
        };
        console.log({ response });
        sendResponse(response);
      });
    }
    return true;
  });
}

export async function getStreamInfo() {
  const user = await CachedDataProvider.getUserData();
  const allStreamData = await CachedDataProvider.getStreamData();
  const favorites = await CachedDataProvider.getFavorites(user.id);
  const userData = await CachedDataProvider.getFollowingUserData();
  console.log({ user, allStreamData, favorites });
  const streamsData = allStreamData?.filter(streamData => {
    return favorites?.favorites?.find((fav: any) => fav.channelId === streamData.user_id);
  });
  const favUserData = userData?.filter((user) => {
    return favorites?.favorites?.find((fav: any) => fav.channelId === user.id);
  });
  return { streamsData, favUserData};
}
