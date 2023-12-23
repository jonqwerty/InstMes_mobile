import {ReactNode, createContext, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {Socket, io} from 'socket.io-client';

import {RootState, useAppDispatch} from '../store/store';
import {appActionCreator} from '../store/actions';

interface Props {
  children?: ReactNode;
}

export interface ISocketContext {
  socket: object | null;
  onlineUsers: {sockedId: string | null; userId: string}[] | [];
}

export const SocketContext = createContext<ISocketContext>({
  socket: null,
  onlineUsers: [],
});

export const SocketContextProvider = ({children}: Props) => {
  const dispatch = useAppDispatch();
  const {authUser, newMessage, currentChat, messages} = useSelector(
    (state: RootState) => state.app,
  );

  const [socket, setSocket] = useState<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    const newSocket: Socket = io('http://192.168.0.5:3000');
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [authUser]);

  // add online users
  useEffect(() => {
    if (socket === null) return;
    socket.emit('addNewUser', authUser?._id);
    socket.on('getOnlineUsers', res => {
      setOnlineUsers(res);
    });
    return () => {
      socket.off('getOnlineUsers');
    };
  }, [socket]);

  // send message
  useEffect(() => {
    if (socket === null) return;

    const recipientId = currentChat?.members?.find(id => id !== authUser?._id);

    socket.emit('sendMessage', {...newMessage, recipientId});
  }, [newMessage]);

  // receive message
  useEffect(() => {
    if (socket === null) return;

    socket.on('getMessage', res => {
      if (currentChat?._id !== res.chatId) {
        return;
      }
      dispatch(appActionCreator.getMessages(currentChat?._id as string));
    });

    return () => {
      socket.off('getMessage');
    };
  }, [socket, currentChat]);

  return (
    <SocketContext.Provider
      value={{
        socket,
        onlineUsers,
      }}>
      {children}
    </SocketContext.Provider>
  );
};
