import React, {useState} from 'react'
import { IoSearch } from "react-icons/io5";


const SearchBar = ({onSearchChange, placeholder}) => {

  const [searchInput, setSearchInput] = useState("");

  const handleSearchChange = (e) => {
    const newInput = e.target.value
    setSearchInput(newInput)
    onSearchChange(searchInput);
  }

  console.log(searchInput)

  return (
    <div className='w-full flex items-center bg-slate-900 gap-4 py-4'>
      <div className='text-2xl text-white'>
        <IoSearch />
      </div>

      <input value={searchInput} onChange={handleSearchChange} className='bg-slate-900 outline-none w-full text-white' type = "text" placeholder= {`Search for ${placeholder}`}/>
    </div>
  )
}

export default SearchBar