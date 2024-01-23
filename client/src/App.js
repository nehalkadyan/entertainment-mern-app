import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Movies from "./pages/Movies";
import Register from "./pages/Register";
import SingleMoviePage from "./pages/SingleMoviePage";
import SingleShowsPage from "./pages/SingleShowsPage";
import TvShows from "./pages/TvShows";
import UserFavorites from "./pages/UserFavorites";
import {useSelector} from "react-redux";

function App() {
  
  // accessing currentUser from redux store
  const {currentUser} = useSelector((state) => state.user);

  return (
    <div className="md:flex bg-slate-900 ">
    <Router>
      <div className={`${currentUser === null ? "hidden" : ""}`}>
      <Sidebar  />
      </div>
       <Routes>
       <Route
          path="/"
          element={
            currentUser !== null ? <Navigate to="/homepage" /> : <Navigate to="/login" />
          }
        />
         <Route path="/login" element = { 
          currentUser ? <Navigate to = "/homepage"/> : 
          <Login />}/>
         <Route path="/register" element = {
         currentUser ? <Navigate to = "/homepage"/> : 
         <Register/>}/>
         <Route path="/homepage" element = {<Homepage />}/>
         <Route path="/movies" element = {<Movies />}/>
         <Route path="/tvshows" element = {<TvShows />}/>
         <Route path="/movies/:id" element = {<SingleMoviePage />}/>
         <Route path="/tvshows/:id" element = {<SingleShowsPage />}/>
         <Route path="/favorites" element = {<UserFavorites/>}/>
       </Routes>
    </Router>
    </div>
  );
}

export default App;
