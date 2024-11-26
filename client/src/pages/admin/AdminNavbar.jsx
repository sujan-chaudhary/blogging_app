import React from 'react'
import {Link} from 'react-router-dom';

const AdminNavbar = () => {
  return (
    <div>
        <ul>
            <li>
                <Link to='/admin/create_post'>Create post</Link>
            </li>
            <li>
                <Link to='/admin/message'>Messages</Link>
            </li>
            <li>
                <Link to='/admin/create_admin'>Create admin</Link>
            </li>
            <li>
                <Link to='/admin/settings'>Settings</Link>
            </li>
            <li>
                <Link to='/admin/logout'>Logout</Link>
            </li>
        </ul>
    </div>
  )
}

export default AdminNavbar