import React from 'react'
import './ShowCard.css'
function ShowCard(props) {
  return (
    <div  className='p-3 mt-2 '>
        <span className='d-flex flex-column text-align-center'>
      <img src={props.img} className='make-width'/>
      <h6 className='text d-flex flex-wrap'>{props.text}</h6>
      </span>
    </div>
  )
}

export default ShowCard
