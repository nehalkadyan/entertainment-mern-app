import React from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleBookmark } from '../redux/bookmark/bookmarkSlice';
import { FaRegBookmark } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";

const TrendingCards = ({movieId, name, date, imgUrl}) => {

  const dispatch = useDispatch()

  const isBookmarked = useSelector((state) => 
  state.bookmarks.bookmarkedMovies?.some((bookmark) => bookmark.id === movieId) ||
  state.bookmarks.bookmarkedShows?.some((bookmark) => bookmark.id === movieId)
);

  const handleBookmark = () => {
    dispatch(toggleBookmark({item : {id: movieId, name, date, imgUrl }, type : "movie"}))
  }


  const year = date.split("-")[0];
  const fullImgUrl = `https://image.tmdb.org/t/p/w500${imgUrl}`

  const cardStyle = {
    backgroundImage: `url(${fullImgUrl})`,
    backgroundSize: 'cover', // Use 'cover' or 'contain' based on your preference
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    transition: 'transform 0.3s ease',
    overflow : "hidden"

  };

  const onCardHover = (e) => {
    e.currentTarget.style.transform = 'scale(1.02)'; // Increase the scale on hover
  };

  const onCardLeave = (e) => {
    e.currentTarget.style.transform = 'scale(1)'; // Reset the scale on leave
  };

  
  return (
    <div className=' relative w-80 h-52' style={cardStyle} onMouseEnter={onCardHover}
    onMouseLeave={onCardLeave}>
        <div onClick={handleBookmark} className='text-white absolute right-4 top-4 bg-gray-100 rounded-full bg-opacity-50 p-2 cursor-pointer'>
        {
          isBookmarked ? (
            <FaBookmark />
          ) : (
           
            <FaRegBookmark />
          )
        }
        </div>

      <Link to = {`/movies/${movieId}`}>
        <div className='cursor-pointer hover:bg-gray-800 w-full hover:bg-opacity-50 absolute text-white bottom-6  flex flex-col gap-2'>
          <div className='flex items-center ml-8 gap-2'>
            <p>{year}</p>
            <p>Movie</p>
          </div>
          <div className='ml-8'>{name}</div>
        </div>
        </Link>
    </div>
  )
}

export default TrendingCards