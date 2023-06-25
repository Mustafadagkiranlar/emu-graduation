import React from 'react'
import Navbar from '../components/Navbar'
import Table from './Table'
import TopBar from './TopBar'

export default function page() {
  return (
    <div className='min-h-screen bg-base-200 flex flex-row'>

      <div className='basis-1/4'>
        <div className='bg-[#f5f5f5] p-5 rounded-box'>
          <h1 className='text-2xl font-bold border-b-2 text-center'>Dashboard</h1>
        </div>
      </div>

      <div className='basis-3/4'>
        {/* top bar */}
        <TopBar />
        {/* table */}
        <Table />
      </div>
    </div>
  )
}
