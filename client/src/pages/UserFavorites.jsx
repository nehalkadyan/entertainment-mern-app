import React, { useState } from "react";
import { useSelector } from "react-redux";
import ContentCard from "../components/ContentCard";
import SearchBar from "../components/SearchBar";

const UserFavorites = () => {
  // setting the state
  const [searchQuery, setSearchQuery] = useState("");
  // accessing data from redux store
  const { bookmarkedMovies } = useSelector((state) => state.bookmarks);
  const { bookmarkedShows } = useSelector((state) => state.bookmarks);
  // initializing fav movies on the basis of search input
  const favMovies = bookmarkedMovies?.filter((movie) =>
    movie.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  // initializing fav shows on the basis of search input
  const favShows = bookmarkedShows?.filter((show) =>
    show.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // function to handle search query
  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="w-full h-full sm:flex sm:flex-col items-center p-4">
      <SearchBar
        onSearchChange={handleSearchChange}
        placeholder={"movies or tv series"}
      />
      <h1 className="text-3xl text-white my-4">Bookmarked Movies</h1>
      <div className="grid grid-cols-2 md:flex md:flex-wrap justify-center md:gap-4 gap-16 ">
        {favMovies?.map((movie) => (
          <ContentCard
            key={movie.id}
            movieId={movie.id}
            name={movie.name}
            date={movie.date}
            imgUrl={movie.imgUrl}
            type="movie"
            link={`/movies/${movie.id}`}
          />
        ))}
      </div>

      <h1 className="text-3xl text-white my-4">Bookmarked Shows</h1>
      <div className="grid grid-cols-2 md:flex md:flex-wrap justify-center md:gap-4 gap-16">
        {favShows?.map((show) => (
          <ContentCard
            key={show.id}
            movieId={show.id}
            name={show.name}
            date={show.date}
            imgUrl={show.imgUrl}
            type="show"
            link={`/tvshows/${show.id}`}
          />
        ))}
      </div>
    </div>
  );
};

export default UserFavorites;
