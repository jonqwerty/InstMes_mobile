import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState,
} from 'react';
import {useSelector} from 'react-redux';
import {Socket, io} from 'socket.io-client';

import {RootState, useAppDispatch} from '../store/store';
import {appActionCreator} from '../store/actions';
import {
  IAuthUser,
  INotificationItem,
  IUserChatsResponse,
} from '../store/app/appReducer';

interface Props {
  children?: ReactNode;
}

export interface ISocketContext {
  socket: object | null;
  onlineUsers: {sockedId: string | null; userId: string}[] | [];
  notifications: {
    senderId: string;
    isRead: boolean;
    date: Date;
  }[];
  markAllNotificationsAsRead: (not: INotificationItem[]) => void;
  markNotificationAsRead: (
    n: INotificationItem,
    userChats: IUserChatsResponse[],
    user: IAuthUser,
    notifications: INotificationItem[],
  ) => void;
}

export const SocketContext = createContext<ISocketContext>({
  socket: null,
  onlineUsers: [],
  notifications: [],
  markAllNotificationsAsRead: () => {},
  markNotificationAsRead: () => {},
});

export const SocketContextProvider = ({children}: Props) => {
  const dispatch = useAppDispatch();
  const {authUser, newMessage, currentChat} = useSelector(
    (state: RootState) => state.app,
  );

  const [socket, setSocket] = useState<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [notifications, setNotifications] = useState<
    {
      senderId: string;
      isRead: boolean;
      date: Date;
    }[]
  >([]);

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

  // receive message and notification
  useEffect(() => {
    if (socket === null) return;

    socket.on('getMessage', res => {
      if (currentChat?._id !== res.chatId) {
        return;
      }
      dispatch(appActionCreator.getMessages(currentChat?._id as string));
    });

    socket.on(
      'getNotification',
      (res: {senderId: string; isRead: boolean; date: Date}) => {
        const isChatOpen = currentChat?.members.some(id => id === res.senderId);

        if (isChatOpen) {
          setNotifications(prev => [{...res, isRead: true}, ...prev]);
        } else {
          setNotifications(prev => [res, ...prev]);
        }
      },
    );

    return () => {
      socket.off('getMessage');
      socket.off('getNotification');
    };
  }, [socket, currentChat]);

  const markAllNotificationsAsRead = useCallback(
    (notifications: INotificationItem[]) => {
      const mNotifications = notifications.map(n => {
        return {...n, isRead: true};
      });
      setNotifications(mNotifications);
    },
    [],
  );

  const markNotificationAsRead = useCallback(
    (
      n: INotificationItem,
      userChats: IUserChatsResponse[],
      user: IAuthUser,
      notifications: INotificationItem[],
    ) => {
      // find chat to open

      const desiredChat = userChats.find(chat => {
        const chatMembers = [user._id, n.senderId];
        const isDesiredChat = chat.members.every(member => {
          return chatMembers.includes(member);
        });
        return isDesiredChat;
      });

      // mark notification as read
      const mNotifications = notifications.map(el => {
        if (n.senderId === el.senderId) {
          return {...n, isRead: true};
        } else {
          return el;
        }
      });

      if (desiredChat) {
        dispatch(appActionCreator.setCurrentChat(desiredChat));
      }
      setNotifications(mNotifications);
    },
    [],
  );

  return (
    <SocketContext.Provider
      value={{
        socket,
        onlineUsers,
        notifications,
        markAllNotificationsAsRead,
        markNotificationAsRead,
      }}>
      {children}
    </SocketContext.Provider>
  );
};
