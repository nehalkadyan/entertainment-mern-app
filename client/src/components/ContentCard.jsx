import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaRegBookmark } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import { toggleBookmark } from "../redux/bookmark/bookmarkSlice";

const ContentCard = ({ movieId, name, date, imgUrl, type, link }) => {
  const dispatch = useDispatch();
  // extracting the year from yy-mm-date format
  const year = date.split("-")[0];
  // setting full url for the image
  const fullImgUrl = `https://image.tmdb.org/t/p/w500${imgUrl}`;

  const words = name.split(" ");
  const title = words.slice(0, 3).join(" ");
  const displayTitle = words.length > 4 ? `${title}...` : title;

  const isBookmarked = useSelector(
    (state) =>
      state.bookmarks.bookmarkedMovies?.some(
        (bookmark) => bookmark.id === movieId
      ) ||
      state.bookmarks.bookmarkedShows?.some(
        (bookmark) => bookmark.id === movieId
      )
  );

  // function for handling bookmark
  const handleBookmark = () => {
    dispatch(
      toggleBookmark({ item: { id: movieId, name, date, imgUrl }, type: type })
    );
  };

  return (
    <div className="relative cursor-pointer flex flex-col w-[140px] h-auto md:w-[250px] md:h-[200px] rounded-lg bg-slate-900">
      <div
        onClick={handleBookmark}
        className="rounded-full cursor-pointer bg-gray-500 absolute z-10  right-2 top-2 p-2  bg-opacity-50 text-white"
      >
        {isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
      </div>

      <Link to={link}>
        <div className="flex flex-col w-[100%] h-auto md:w-[250px] md:h-[200px]">
          <div className="w-full overflow-hidden rounded-lg">
            <img
              className="rounded-lg w-full object-cover h-full transition-transform transform-gpu hover:scale-110"
              src={fullImgUrl}
              alt="movie_card"
            />
          </div>

          <div className="flex flex-col p-2">
            <div className="flex text-sm text-white items-center gap-4">
              <p>{year}</p>
              {type === "show" ? <p>Tv Series</p> : <p>Movie</p>}
            </div>

            <div className="text-white">{displayTitle}</div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ContentCard;
