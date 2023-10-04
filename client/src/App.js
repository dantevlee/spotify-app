import { BrowserRouter, Routes,Route } from "react-router-dom";
import axios from 'axios';
import "./App.scss";
import NavMenu from "./Components/NavMenu";
import HomePage from "./Components/HomePage";
import RandomPage from "./Components/RandomPage";
import Search from "./Components/Search";
import { useEffect } from "react";

const App = () => {

  useEffect(() => {
    axios.get(`api/token`)
      .then((res) => {
        const token = res.data.token;
        axios.get('api/search', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((searchRes) => {
          console.log(searchRes.data);
        }).catch((searchError) => {
          console.error("Error in /search request:", searchError);
        });
      })
      .catch((error) => {
        console.error("Error getting token:", error);
        console.log(error.response.data); // Log the detailed error message
      });
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <div className="app-row row">
          <NavMenu />
          <main className="col-sm-10 col-xs-12">
            <Routes>
              <Route exact path="/" element={<HomePage />} />
              <Route exact path="/spotify" element={<HomePage />} />
              <Route exact path="/search" element={<Search />} />
              <Route exact path="/library" element={<RandomPage />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
