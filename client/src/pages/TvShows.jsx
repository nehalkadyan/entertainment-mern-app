import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import { useSelector } from "react-redux";
import ContentCard from "../components/ContentCard";

const TvShows = () => {
  const { showsData } = useSelector((state) => state.content);
  const [searchQuery, setSearchQuery] = useState("");

  const handleQueryChange = (query) => {
    setSearchQuery(query);
  };
  
  const showData = showsData?.filter((movie) => {
    return movie.name.toLowerCase().includes(searchQuery.toLowerCase());
  });
  
  return (
    <div className="p-4 w-full flex flex-col items-center">
      <SearchBar onSearchChange={handleQueryChange} placeholder={"tv series"} />

      <h1 className="text-white text-2xl mb-4">TV Shows</h1>

      <div className="grid grid-cols-2  md:flex md:flex-wrap justify-center gap-16 md:gap-4">
        {showData?.map((show) => {
          return (
            <ContentCard
              key={show.id}
              movieId={show.id}
              name={show.name}
              date={show.first_air_date}
              imgUrl={show.backdrop_path}
              type="show"
              link={`/tvshows/${show.id}`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TvShows;
