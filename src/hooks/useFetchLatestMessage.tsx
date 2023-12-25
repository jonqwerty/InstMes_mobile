import {useContext, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';

import {RootState, useAppDispatch} from '../store/store';
import {appActionCreator} from '../store/actions';
import {
  IGetMessagesResponse,
  IUserChatsResponse,
} from '../store/app/appReducer';
import {SocketContext} from '../context/SocketContext';

export const useFetchLatestMessage = (chat: IUserChatsResponse) => {
  const dispatch = useAppDispatch();
  const {messages, newMessage} = useSelector((state: RootState) => state.app);
  const {notifications} = useContext(SocketContext);

  const [latestMessage, setLatestMessage] =
    useState<IGetMessagesResponse | null>(null);

  useEffect(() => {
    (async () => {
      const resp = await dispatch(appActionCreator.getMessages(chat?._id));

      if (appActionCreator.getMessages.fulfilled.match(resp)) {
        setLatestMessage(resp.payload[resp.payload?.length - 1]);
      }
    })();
  }, [newMessage, notifications]);

  return {latestMessage};
};
