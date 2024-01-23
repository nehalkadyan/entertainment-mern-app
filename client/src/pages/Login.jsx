import React, { useState, useEffect } from "react";
import { MdMovieFilter } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  contentLoadingStart,
  contentLoadingSuccess,
  contentLoadingFailure,
  showsLoadingSuccess,
} from "../redux/content/contentSlice";
import { signInSuccessful } from "../redux/user/userSlice";

const Login = () => {
  const navigate = useNavigate();
  // creating state for loading
  const [loading, setLoading] = useState(false);
  // creating state for error
  const [error, setError] = useState(null);

  // creating formData state
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const apiKey = "b11cf309b4861cd41806e2a4c0b43fcd";

  // function to fetch movies
  const fetchMovies = async () => {
    dispatch(contentLoadingStart());
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`
      );
      const data = await res.json();
      return data.results;
    } catch (err) {
      dispatch(contentLoadingFailure(err.message));
    }
  };

  // function to fetch shows
  const fetchShows = async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}`
    );
    const data = await res.json();
    return data.results;
  };

  useEffect(() => {
    const fetchData = async () => {
      const movieData = await fetchMovies();
      const showData = await fetchShows();
      dispatch(contentLoadingSuccess(movieData));
      dispatch(showsLoadingSuccess(showData));
    };
    fetchData();
  }, []);

  // handling formData changes
  const handleFormdataChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  // function for logging user in
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      dispatch(signInSuccessful(data));
      setLoading(false);
      navigate("/homepage");
    } catch (err) {
      setError(true);
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex justify-center flex-col items-center bg-slate-950">
      <div className="text-6xl -mt-20 p-12 text-red-700">
        <MdMovieFilter />
      </div>

      <div className="bg-slate-700 w-3/4 md:w-2/5 lg:w-1/4 flex flex-col rounded-lg p-8 gap-4">
        <h1 className="text-white text-3xl">Sign In</h1>
        <form onSubmit={handleLogin} className="flex flex-col gap-4 w-full">
          <input
            id="email"
            onChange={handleFormdataChange}
            className="bg-transparent outline-none p-2 border-b-2 border-slate-400 text-white"
            type="email"
            placeholder="Email address"
          />
          <input
            id="password"
            onChange={handleFormdataChange}
            className="bg-transparent outline-none p-2 border-b-2 border-slate-400 text-white"
            type="password"
            placeholder="Password"
          />
          <button className="bg-red-700 text-white rounded border-none p-2">
            {loading ? "Loading" : "Login to your account"}
          </button>
        </form>
        <p className="text-center text-white">
          Don't have an account?
          <Link to="/register" className="ml-2 text-red-700 font-medium">
            Sign Up
          </Link>
        </p>
        {error && <p>{error}</p>}
      </div>
    </div>
  );
};

export default Login;
