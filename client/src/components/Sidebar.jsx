import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { logoutSuccessful } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { MdMovieFilter } from "react-icons/md";
import { BsFillGridFill } from "react-icons/bs";
import { MdLocalMovies } from "react-icons/md";
import { PiTelevisionFill } from "react-icons/pi";
import { FaBookmark } from "react-icons/fa";
import { IoExitOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  // accessing currentUser from redux store
  const { currentUser } = useSelector((state) => state.user);

  // function to get the first char from email
  const getFirstChar = () => {
    if (currentUser && currentUser.email) {
      return currentUser.email[0];
    }
    return "";
  };
  const [activeMenuItem, setActiveMenuItem] = useState(1);


  const handleActiveMenuItem = (index) => {
      setActiveMenuItem(index); 
  };

  // Function for logging user out
  const handleUserLogout = async () => {
    try {
      // calling the api endpoint
      const res = await fetch("https://entertainment-mern-app-3.onrender.com/api/auth/logout");
      const data = await res.json();
      if (res.ok) {
        // dispatching the action
        dispatch(logoutSuccessful());
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // If currentUser exists, set activeMenuItem to 1
    if (currentUser) {
      setActiveMenuItem(1);
    }
  }, [currentUser]);
  return (
    <div className="h-[50px] gap-4 md:rounded-lg flex md:w-[80px] w-full md:h-[80vh] bg-slate-800 md:flex-col items-center justify-around md:justify-center py-8 md:py-4 md:gap-12">
      <div className="md:text-5xl text-2xl text-red-800">
        <MdMovieFilter />
      </div>

      <div className="flex md:flex-col gap-8">
        <div
          onClick={() => handleActiveMenuItem(1)}
          className={`${
            activeMenuItem === 1 ? "text-white" : "text-slate-400"
          } md:text-2xl text-xl`}
        >
          <Link to="/homepage">
            <BsFillGridFill />
          </Link>
        </div>
        <div
          onClick={() => handleActiveMenuItem(2)}
          className={`${
            activeMenuItem === 2 ? "text-white" : "text-slate-400"
          } md:text-2xl text-xl`}
        >
          <Link to="/movies">
            <MdLocalMovies />
          </Link>
        </div>
        <div
          onClick={() => handleActiveMenuItem(3)}
          className={`${
            activeMenuItem === 3 ? "text-white" : "text-slate-400"
          } md:text-2xl text-xl`}
        >
          <Link to="/tvshows">
            <PiTelevisionFill />
          </Link>
        </div>
        <div
          onClick={() => handleActiveMenuItem(4)}
          className={`${
            activeMenuItem === 4 ? "text-white" : "text-slate-400"
          } md:text-2xl text-xl`}
        >
          <Link to="/favorites">
            <FaBookmark />
          </Link>
        </div>
      </div>

      <div className="md:text-2xl  flex justify-center items-center md:px-4 md:py-2 p-2 text-white rounded-full bg-red-700">
        {currentUser && <p className="text-center">{getFirstChar()}</p>}
      </div>

      <button
        onClick={handleUserLogout}
        className="text-white text-2xl md:text-3xl"
      >
        <IoExitOutline />
      </button>
    </div>
  );
};

export default Sidebar;
