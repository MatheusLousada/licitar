import { useParams } from 'react-router-dom';
import React, { useContext, useEffect, useRef, useState } from "react";
import { WebsocketContext } from '../../contexts/Websockets/WebsocketContex';
import { Typography, Box, TextField, Button, List, ListItem, ListItemText, Grid } from '@mui/material';

type MessagePayload = {
  content: string;
  msg: string;
};

type User = {
  name: string;
};

export function Auction() {
  const { roomKey } = useParams();
  const websocketContext = useContext(WebsocketContext);
  const socket = websocketContext?.socket;
  const [inputMessageValue, setInputMessageValue] = useState('');
  const [inputBidValue, setInputBidValue] = useState('');
  const [messages, setMessages] = useState<MessagePayload[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const messagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (socket) {
      socket.on('onMessage', (newMessage: MessagePayload) => {
        setMessages((prev) => [...prev, newMessage]);
      });

      socket.on('onJoin', (user: string) => {
        setUsers((prev) => [...prev, { name: user }]);
      });

      socket.emit('joinRoom', { room: roomKey });
    }
  }, [socket, roomKey]);

  const handleBid = () => {
    if (socket) {
      socket.emit('newBid', inputBidValue);
      setInputBidValue('');
    }
  };

  const handleMessage = () => {
    if (socket) {
      socket.emit('newMessage', inputMessageValue);
      setInputMessageValue('');
    }
  };

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <Grid container spacing={2} style={{ height: "85vh", width: "100%", marginTop: '20px' }}>
      <Grid item xs={8}>
        <Box bgcolor="#f4f4f4" padding="16px" height="60vh" width="95%" marginLeft="20px">
        </Box>
      </Grid>
      <Grid item xs={4}>
        <Box padding="0px 15px" height="60vh">
          <Box display="flex" flexDirection="column" alignItems="flex-end" height="100%">

            <Typography variant="h6" component="div" align="right" textAlign="left">Mensagens:</Typography>
            <Box ref={messagesRef} style={{ overflowY: "auto", height: "calc(100% - 10px)", background: 'rgb(25 118 210 / 43%)', width:'100%', marginBottom:'20px' }}>
              {messages.length === 0 ? (
                <Typography>No messages</Typography>
              ) : (
                <List>
                  {messages.map((msg, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={msg.content} />
                    </ListItem>
                  ))}
                </List>
              )}
            </Box>

            <Typography variant="h6" component="div" align="right" textAlign="left">Usuários:</Typography>
            <Box style={{ overflowY: "auto", height: "calc(100% - 10px)",background: 'rgb(25 118 210 / 13%)', width:'100%' }}>
              {users.length === 0 ? (
                <Typography>No users</Typography>
              ) : (
                <List>
                  {users.map((user, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={user.name} />
                    </ListItem>
                  ))}
                </List>
              )}
            </Box>
            
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} display="flex" flexDirection="row" justifyContent="space-between">
        <Box display="flex" alignItems="center" justifyContent="center" padding="16px">
          <TextField
            type="number"
            value={inputBidValue}
            onChange={(e) => setInputBidValue(e.target.value)}
            style={{marginLeft: "5px", marginRight: "20px"}}
          />
          <Button variant="contained" onClick={handleBid}>Dar lance</Button>
        </Box>
        <Box display="flex" alignItems="center" justifyContent="center" padding="16px">
          <TextField
            type="text"
            value={inputMessageValue}
            onChange={(e) => setInputMessageValue(e.target.value)}
            style={{marginRight: "20px", width: "295px"}}
          />
          <Button variant="contained" onClick={handleMessage}>Enviar</Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Auction;
