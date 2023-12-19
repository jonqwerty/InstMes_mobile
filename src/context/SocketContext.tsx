import {ReactNode, createContext, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {Socket, io} from 'socket.io-client';
import {RootState} from '../store/store';

interface Props {
  children?: ReactNode;
}

export interface ISocketContext {
  socket: object | null;
  onlineUsers: {sockedId: string | null; iserId: string}[] | [];
}

export const SocketContext = createContext<ISocketContext>({
  socket: null,
  onlineUsers: [],
});

export const SocketContextProvider = ({children}: Props) => {
  const {authUser} = useSelector((state: RootState) => state.app);

  const [socket, setSocket] = useState<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  console.log('socket', socket);
  console.log('onlineUsers', onlineUsers);
  useEffect(() => {
    const newSocket: Socket = io('http://192.168.0.5:3000');
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [authUser]);

  useEffect(() => {
    if (socket === null) return;
    socket.emit('addNewUser', authUser?._id);
    socket.on('getOnlineUsers', res => {
      setOnlineUsers(res);
    });
  }, [socket]);
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
