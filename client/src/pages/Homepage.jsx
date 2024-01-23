import React, { useState } from "react";
import TrendingCards from "../components/TrendingCards";
import ContentCard from "../components/ContentCard";
import SearchBar from "../components/SearchBar";
import { useSelector } from "react-redux";

const Homepage = () => {
  // state for storing search query
  const [searchQuery, setSearchQuery] = useState("");

  // acccessing loading from redux store
  const { loading } = useSelector((state) => state.content);
  // accessing showsData from redux store
  const { showsData } = useSelector((state) => state.content);

  // accessing contentData from redux store
  const { contentData } = useSelector((state) => state.content);

  // function to handle search query state
  const handleSearchQuery = (query) => {
    setSearchQuery(query);
  };

  // setting trendingMovies according to the search input user enters
  const trendingMovies = contentData?.filter((movie) => {
    return (
      movie.popularity < 650 &&
      movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // setting recommendedMovies according to the search input user enters
  const recommendedMovies = contentData?.filter((movie) => {
    return (
      movie.popularity > 600 &&
      movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="w-full md:w-[93%] justify-center  bg-slate-900">
      <div className="p-4  flex flex-col justify-center items-center">
        {/* Search bar component */}
        <SearchBar
          onSearchChange={handleSearchQuery}
          placeholder={"movies or TV series"}
        />
        <h1 className="text-3xl text-white mb-4">Trending</h1>

        {/* mapping trendingMovies array */}
        <div className="flex gap-4 flex-wrap w-full justify-around">
          {trendingMovies?.map((movie) => {
            const title = movie.title;
            const imgUrl = movie.poster_path;
            const date = movie.release_date;
            return (
              <TrendingCards
                key={movie.id}
                movieId={movie.id}
                name={title}
                date={date}
                imgUrl={imgUrl}
              />
            );
          })}
        </div>

        <h1 className="text-3xl text-white mt-4 mb-5 text-start">
          Recommended for you
        </h1>

        {/* mapping recommendedMovies array */}

        <div className="grid grid-cols-2 md:flex md:flex-wrap md:gap-4 gap-16 justify-center">
          {recommendedMovies?.map((movie) => {
            return (
              <ContentCard
                key={movie.id}
                movieId={movie.id}
                name={movie.title}
                date={movie.release_date}
                imgUrl={movie.poster_path}
                type="movie"
                link={`/movies/${movie.id}`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
