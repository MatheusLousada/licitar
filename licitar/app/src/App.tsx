import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { Home } from './pages/Home';
import { RequireAuth } from './contexts/Auth/RequireAuth';
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from './contexts/Auth/AuthContext';
import Register from './pages/Register';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import { Auctions } from './pages/Auctions';
import { Auction } from './pages/Auction';
import { io, Socket } from 'socket.io-client';
import { WebsocketContext } from './contexts/Websockets/WebsocketContex';
import { useNavigate } from 'react-router-dom';

function App() {
  const auth = useContext(AuthContext);
  const [socket, setSocket] = useState<Socket<any, any> | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.user) {
      const token = localStorage.getItem('authToken');
      const newSocket = io('http://localhost:3001/events', {
        auth: {
          Authorization: `Bearer ${token}`
        }
      });

      setSocket(newSocket);

      return () => {
        newSocket.close();
      };
    }
  }, [auth.user]);

  const handleLogout = async () => {
    await auth.signout();
    navigate('/login');
  };

  return (
    <div className="App">
      <header>
        <Navbar
          handleLogout={handleLogout}
          isAuthenticated={auth.user ? true : false}
          user={auth.user}
        />
      </header>
      <Routes>
        {auth.user ? (
          <Route path="/" element={<Navigate to="/auctions" />} />
        ) : (
          <Route path="/" element={<Home />} />
        )}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/auctions"
          element={
            <RequireAuth>
              <WebsocketContext.Provider value={{ socket, setSocket }}>
                <Auctions />
              </WebsocketContext.Provider>
            </RequireAuth>
          }
        />
        <Route
          path="/auctions/:roomKey"
          element={
            <RequireAuth>
              <WebsocketContext.Provider value={{ socket, setSocket }}>
                <Auction />
              </WebsocketContext.Provider>
            </RequireAuth>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
