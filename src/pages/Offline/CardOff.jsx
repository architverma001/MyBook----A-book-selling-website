import React, { useEffect, useState } from 'react'
import './Offline.css'

function CardOff(props) {
  
  return (
    <div className='d-flex flex-column justify-content-center card '>
      <img src={props.Url} className="wdt-mng mb-2 " />
      <div className='d-flex flex-wrap maxi mt-3 mngmt'>
       <h6> <strong>Address:</strong> {props.Address}</h6>
      </div>
    </div>
  )
}

export default CardOff
