import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between bg-indigo-800 text-white py-2 '>
        <div className="logo">
            <span className='font-bold text-xl m-8'>itask</span>
        </div>
        <ul className='flex gap-8'>
            <li className='cursor-pointer hover:font-bold transition-all'>home</li>
            <li>Your Tasks</li>
        </ul>
    </nav>
  )
}

export default Navbar
