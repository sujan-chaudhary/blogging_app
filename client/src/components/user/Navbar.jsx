import React from 'react'
import {Link} from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='flex justify-between'>
      <h1>Logo</h1>
        <ul className='flex gap-10'>
            <li><Link to='/home'>Home</Link></li>
            <li><Link to='/categories'>Categories</Link></li>
            <li><Link to='/courses'>Books</Link></li>
            <li><Link to='/about'>About</Link></li>
            <li><Link to='/contact'>Contact Us</Link></li>
            <li><Link to='/signup'>Signup</Link></li>
            <li><Link to='/login'>Login</Link></li>
        </ul>
    </div>
  )
}

export default Navbar