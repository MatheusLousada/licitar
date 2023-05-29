import React, { createContext } from 'react';
import { Socket } from 'socket.io-client';

export type WebsocketContextType = {
  socket: Socket<any, any> | null;
  setSocket: React.Dispatch<React.SetStateAction<Socket<any, any> | null>>;
};

export const WebsocketContext = createContext<WebsocketContextType>({
  socket: null,
  setSocket: () => {}
});
