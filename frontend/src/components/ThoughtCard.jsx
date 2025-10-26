import React from 'react'
import Like from './Like'

const ThoughtCard = ({content , id}) => {
  return (
    <div >
    <div className='md:p-4 m-auto p-2 font-oswald bg-orange-200 w-[250px] h-[180px] md:w-[300px] md:h-[350px] flex flex-col  justify-between flex-wrap items-center'>
        <p className='m-auto font-bold md:text-0.5xl text-0.2xl justify-normal '>{content}</p>
    </div>
    <Like postid={id}/>
    </div>
    
  )
}

export default ThoughtCard