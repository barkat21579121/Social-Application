import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useState, useEffect } from "react";
import Login from "./pages/Loginpage/Login"
import Signup from './pages/SignUp/Signup';
import Home from './pages/Home/Home';
import Post from './pages/Post/Post';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loginToken = localStorage.getItem("JWT TOKEN");
    setIsLoggedIn(!!loginToken);
  }, [isLoggedIn]);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {isLoggedIn &&
            <>
              <Route path='/Home' element={<Home />} />

              <Route path='/NewsFeed' element={<Post />} /></>

          }
          <Route path='/' element={<Login />} />
          <Route path='/signUp' element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
