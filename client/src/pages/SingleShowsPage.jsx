import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import RatingComponent from "../components/RatingComponent";
import { GiBreakingChain } from "react-icons/gi";

const SingleShowsPage = () => {
  // accessing showsData array from the redux store
  const { showsData } = useSelector((state) => state.content);

  // fetching id from the params
  const { id } = useParams();

  // getting the tv show from showsData array on the basis of id
  const tvShow = showsData?.find((show) => show.id === parseInt(id));

  // accessing properties from tvshow object
  const { poster_path } = tvShow;
  const { name } = tvShow;
  const { overview } = tvShow;
  const { first_air_date } = tvShow;
  const { vote_average } = tvShow;
  const rating = Math.floor(vote_average / 2);
  const { original_language } = tvShow;
  const imgUrl = `https://image.tmdb.org/t/p/w500${poster_path}`;

  return (
    <div className="flex p-12 h-screen  flex-col md:flex-row items-center gap-6 md:p-4 md:gap-4">
      <div className="w-3/4">
        <img className="object-cover" src={imgUrl} alt="shows" />
      </div>
      <div className="w-full">
        <h1 className="text-white text-4xl">{name}</h1>
        <p className="text-neutral-400">{overview}</p>
        <div className="flex items-center gap-3">
          <h1 className="text-white text-2xl font-medium my-3">{rating}.0</h1>
          <RatingComponent rating={rating} />
        </div>

        <div className="flex items-center gap-12">
          <div>
            <p className="text-neutral-500 font-medium">Language</p>
            <p className="text-lg text-white">
              {original_language === "en" ? "English" : ""}
            </p>
          </div>

          <div>
            <p className="text-neutral-500 font-medium">First Air</p>
            <p className="text-lg text-white">{first_air_date}</p>
          </div>
        </div>

        <div className="cursor-pointer mb-4 flex w-3/5 md:w-2/5 justify-center rounded-lg items-center gap-4 px-8 py-4 md:p-4 bg-slate-500 mt-12">
          <p className="text-white font-medium">Website</p>
          <div>
            <GiBreakingChain className="text-white font-medium" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleShowsPage;
