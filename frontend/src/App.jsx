import React, { useState, useContext } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/NavBar';
import Home from './components/Home';
import './App.css';
import Room from './components/Karaoke/Room/Room';
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';
import { SocketProvider } from './context';
import './index.css';
import Footer from './components/Footer';

const AuthContext = React.createContext();

function App() {
  const [userId, setUserId] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // const ProtectedRoute = ({ path, element }) => {
  //   return isAuthenticated ? (
  //     <Route path={path} element={element} />
  //   ) : (
  //     <Navigate to="/" replace state={{ from: path }} /> // Redirect to login page if not authenticated and prevent accessing browser history when not authenticated
  //   );
  // };

  return (
    <div>
      <title className="text-mainWhite">Serenade</title>
    <SocketProvider>
      <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
        {' '}
        {/* allows all components to access isAuthenticated and setIsAuthenticated */}
        <Router>
          {/* <div className="flex flex-col min-h-screen bg-bgGreen"> */}
          <Navbar userId={userId} />
          {/* <div className='flex-grow'> */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/karaoke/:id" element={<Room />} />
            <Route path="/login" element={<Login setUserId={setUserId} />} />
            <Route path="/signup" element={<Signup />} />

            <Route
              path="/profile/:id"
              element={
                isAuthenticated ? <Profile /> : <Navigate to="/" replace />
              }
            />
          </Routes>
          {/* </div> */}
          {/* </div> */}
          <Footer />
        </Router>
      </AuthContext.Provider>
    </SocketProvider>
    </div>
  );
}

export default App;

export { AuthContext };
