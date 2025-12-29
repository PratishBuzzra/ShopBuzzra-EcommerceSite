import React from 'react'
import {Link, NavLink} from "react-router-dom"

const ConstantHero = ({cName, imgSrc, imgcName, heroTitle, heroText, heroBtnText, heroBtncName, heroDesc }) => {
  return (
    <div className={cName}>
      <img src={imgSrc} alt={heroTitle} className={imgcName}/>
      <div className={heroDesc} >

        <h2 className='text-5xl text-white  font-bold pb-2'>{heroTitle}</h2>
        <p className='text-3xl text-white font-semibold pb-4'>{heroText}</p>
        <Link to = {'/shop'}>
        <button className={heroBtncName}>{heroBtnText}</button>
        </Link>
      </div>
      
    </div>
  )
}

export default ConstantHero
