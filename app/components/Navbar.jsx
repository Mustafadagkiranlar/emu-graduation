import React from 'react'

export default function Navbar() {
  return (
    <div className="navbar bg-[#023E83] my-3 rounded-box">
        <div className="flex-1">
          <a className="btn btn-ghost normal-case text-xl text-white">
            EMU Parkinglot
          </a>
        </div>
        <div className="flex-1">
          <img src="/emu-logo.png" className="flex-none w-20 h-20" />
        </div>

        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src="/person.svg" />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
  )
}
