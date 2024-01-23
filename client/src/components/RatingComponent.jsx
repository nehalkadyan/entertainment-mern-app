import React from 'react'

const RatingComponent = ({rating}) => {

    const maxRating = 5;
    const stars = Array.from({length : maxRating}, (_, index) => {
        if(index < rating){
          return "⭐"
        };
    })

  return (
    <div>
      {
        stars.map((star, index) => (
          <span className='text-2xl'>
            {star}
          </span>
        ))
      }
    </div>
  )
}

export default RatingComponent