import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// pages and components
import Home from './pages/Home';
import Community from './pages/Community';
import Marketplace from './pages/Marketplace';
import Consultancy from './pages/Consultancy';
import Event from './pages/Event';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Chat from './pages/Chat'
import Profile from './pages/Profile'
import { useAuthContext } from './hooks/useAuthContext';
import SuccessStories from "./pages/SuccessStories"; 
import Houseplant from "./pages/Houseplant"; 


function App() {
  const { user } = useAuthContext(); // Check user authentication status

  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={user ? <Home /> : <Navigate to="/login" />}
            />
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
            <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />

            <Route path="/Community" element={<Community />} />
            <Route path="/Marketplace" element={<Marketplace />} />
            <Route path="/Consultancy" element={<Consultancy />} />
            <Route path="/Event" element={<Event />} />
            <Route path="/Chat" element={<Chat />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/SuccessStories" element={<SuccessStories />} />
            <Route path="/Houseplant" element={<Houseplant />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
