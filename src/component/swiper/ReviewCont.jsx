import React from 'react'
import './Swiper.css'
function ReviewCont(props) {
  return (
    <div>
       <div className='quotes'>
      {props.content}
    </div>
    </div>
  )
}

export default ReviewCont
