import { GetLiveStreamsRequest, GetLiveStreamsResponse } from '@root/src/shared/messaging/GetLiveStreams';
import { MessageClient } from '@root/src/shared/messaging/MessageClient';
import { StreamData } from '@root/src/shared/service/TwitchClientTypes';
import { useState, useEffect } from 'react';

interface PropsType {}

export const FavoritesListContainer = (props: PropsType) => {
  const [streamData, setStreamData] = useState<StreamData[]>([]);
  const [streamListenerAdded, setStreamListenerAdded] = useState(false);

  useEffect(() => {
    console.log('adding stream listener');
    chrome.runtime.onMessage.addListener(function (
      request: {
        type: string;
        [key: string]: any;
      },
      sender: chrome.runtime.MessageSender,
      sendResponse: (response: any) => void,
    ) {
      console.log({ request, sender });
      if (request.type === 'getLiveStreamsResponse') {
        const liveStreamsRequest = request as GetLiveStreamsResponse;
        const streams = liveStreamsRequest.streams;
        setStreamData(streams);
      }
    });
    setStreamListenerAdded(true);
  }, []);

  useEffect(() => {
    async function requestStreams() {
      if (streamListenerAdded) {
        const streams = await MessageClient.requestStreams();
        setStreamData(streams);
      }
    }
    requestStreams();
  }, [streamListenerAdded]);

  return (
    <div className="">
      <h2 className="favorites-title">FAVORITES</h2>
      {streamData.map(stream => (
        <div>{stream.user_name}</div>
      ))}
    </div>
  );
};
