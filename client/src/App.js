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
  
         <Route path="/" element = { 
          currentUser ? <Navigate to = "/homepage"/> : 
          <Login />}/>
        <Route path = "/" element = {<Login />}/>
         <Route path="/register" element = {
         currentUser ? <Navigate to = "/homepage"/> : 
         <Register/>}/>
         <Route path="/homepage" element = { 
          currentUser ? <Homepage /> : <Login />
         }/>
         <Route path="/movies"  element = {
           currentUser ? <Movies /> : <Login />
         }/>
         <Route path="/tvshows" element = {
          currentUser ? <TvShows /> : <Login />
         }/>
         <Route path="/movies/:id" element = {
          currentUser ? <SingleMoviePage /> : <Login />
         }/>
         <Route path="/tvshows/:id" element = {
          currentUser ? <SingleShowsPage /> : <Login />
         }/>
         <Route path="/favorites" element = {
          currentUser ? <UserFavorites/> : <Login />
         }/>
       </Routes>
    </Router>
    </div>
  );
}

export default App;
