import React from 'react'
import './card.css'

function Card(props) {
  const{income,amount}=props
  return (
    <div className='customCard'>
        <p className='income'>{income}</p>
        <p className='cost'>{amount}</p>
    </div>
  )
}

export default Card