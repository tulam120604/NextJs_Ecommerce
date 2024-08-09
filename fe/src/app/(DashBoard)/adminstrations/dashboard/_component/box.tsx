import React from 'react'

const Box = ({dataProps} : any) => {
  return (
    <div className='flex flex-col gap-y-4'>
        <span>{dataProps?.text}</span>
        <strong className='text-xl'>{dataProps?.number}</strong>
    </div>
  )
}

export default Box