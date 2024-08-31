import React from 'react'

function Loader({ color }) {
  if (color) return <div className='loaderContainer rotaryColor'></div>
  return <div className='loaderContainer rotary'></div>
  // return <div>Loading...</div>
}

export default Loader
