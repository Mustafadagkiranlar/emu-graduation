import React from 'react'
import ParkingLot from './ParkingLot'

export default function ParkingLotNumbers() {
  return (
    <div className='flex-1'>
      <div className=' m-5 rounded-box'>
        <h3 class="text-4xl font-bold text-center my-7">Available parkinglot</h3>
          <ParkingLot />
          <ParkingLot />
      </div>
    </div>
  )
}
