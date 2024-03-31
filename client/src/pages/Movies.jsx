import React, {useState} from 'react'
import SearchBar from '../components/SearchBar';
import { useSelector } from 'react-redux';
import ContentCard from '../components/ContentCard';

const Movies = () => {
  const {contentData} = useSelector((state) => state.content);
  const [searchQuery, setSearchQuery] = useState("");

  const handleQueryChange = (query) => {
    setSearchQuery(query)
  }

  const movieData = contentData?.filter((movie) => {
    return movie.title.toLowerCase().includes(searchQuery.toLowerCase());
  })

  
  return (
    <div className=' p-4 w-full flex flex-col items-center'>
      <SearchBar onSearchChange = {handleQueryChange} placeholder = {"movies"}/>
    
    <h1 className='text-white text-2xl mb-4'>Movies</h1>

    <div className='grid grid-cols-2 md:flex md:flex-wrap justify-center md:gap-4 gap-16'>
    {
      movieData?.map((movie) => {
        return (
          <ContentCard key = {movie.id} movieId = {movie.id} name = {movie.title} date = {movie.release_date} imgUrl = {movie.backdrop_path} type="movie" link = {`/movies/${movie.id}`}/>
        )
      })
    }
    </div>
    </div>
  )
}

export default Movies