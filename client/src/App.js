import { BrowserRouter, Routes,Route } from "react-router-dom";
import axios from 'axios';
import "./App.scss";
import NavMenu from "./Components/NavMenu";
import HomePage from "./Components/HomePage";
import RandomPage from "./Components/RandomPage";
import Search from "./Components/Search";
import { useEffect, useState } from "react";

const App = () => {

  useEffect(() => {
    fetchToken();

    const tokenRefreshInterval = setInterval(() => {
      fetchToken();
    }, 3599000);

    return () => clearInterval(tokenRefreshInterval);
  }, []);

  const fetchToken = async () => {
    try {
     await axios.get('/api/refreshToken'); 
    } catch (error) {
      console.error('Error refreshing token:', error.message);
    }
  };


  return (
    <div className="App">
      <BrowserRouter>
        <div className="app-row row">
          <NavMenu />
          <main className="col-sm-10 col-xs-12">
            <Routes>
              <Route exact path="/" element={<HomePage />} />
              <Route exact path="/spotify" element={<HomePage />} />
              <Route exact path="/search" element={
              <Search/>} />
              <Route exact path="/random" element={<RandomPage />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
