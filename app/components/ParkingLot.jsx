import React from 'react'

export default function ParkingLot() {
  return (
    <div className='shadow-lg bg-white rounded-box m-5'>
    <div className='p-10'>
      <h4 className='text-2xl font-medium'>Computer Engineering</h4>
      <progress className="progress progress-success w-56 h-4 mt-5 mb-2" value={5} max="25"></progress>
      <p className='text-lg'>5/25</p>
    </div>
    </div>

  )
}
