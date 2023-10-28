import React from 'react'
const header = ({ category, title }) => {
  
  return (
    <div className='md-10'>
      <p className='text-gray-400'>
        {category}
      </p>
      <p className='text-2xl font-semibold text-slate-800'>{title}</p>
    </div>
  )
}
export default header;