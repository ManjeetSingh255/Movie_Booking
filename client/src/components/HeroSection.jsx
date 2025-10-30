
import React from 'react'
import assets from '../assets/assets'
import { ArrowRight, Calendar, Clock } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const HeroSection = () => {

    const navigate = useNavigate();
  return (
    <div
      className='flex flex-col items-start justify-center text-center gap-4 px-6 md:px-16 lg:px-36 bg-cover bg-center h-screen'
      style={{ backgroundImage: `url("/backgroundImage.png")` }}
    >
      <img src={assets.marvelLogo} alt="Marvel Logo" className="max-h-11 lg:h-11 mt-20" />
      
      <h1 className='text-5xl md:text-[70px] md:leading-[80px] font-semibold max-w-[1100px]'>
        Guardian <br /> of the Galaxy
      </h1>

      <div className='flex items-center gap-4 text-gray-300'>
        <span>Action | Adventure | Sci-Fi</span>
        
        <div className='flex items-center gap-1'>
          <Calendar className='w-4.5 h-4.5' /> 2018
        </div>

        <div className='flex items-center gap-1'>
          <Clock className='w-4.5 h-4.5' /> 2h 5m
        </div>
      </div>
       
      <p className="text-gray-300 text-base md:text-lg max-w-2xl mt-6">
  Join Star-Lord, Gamora, Drax, Rocket, and Groot as they navigate a universe filled 
  with danger, humor, and epic battles. "Guardians of the Galaxy" combines action, 
  adventure, and a heartwarming story of friendship across the stars.
</p>

<button onClick = {()=>navigate('/movies')}className='flex items-center gap-1 px-6 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer'>
    Explore Movies
    <ArrowRight className = 'h-5 w-5 '/>
</button>

    </div>
  )
}

export default HeroSection
