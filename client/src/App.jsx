import React from 'react'
import Login from './pages/admin/Login.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'


// admin pages and components
import PrivateRoute from './pages/admin/PrivateRoute.jsx';
import Dashboard from './pages/admin/Dashboard.jsx';
import CreatePost from './pages/admin/CreatePost.jsx';
import CreateAdmin from './pages/admin/CreateAdmin.jsx';
import Logout from './pages/admin/Logout.jsx';

// components
import Navbar from './components/user/Navbar.jsx';
import Footer from './components/user/Footer.jsx';

// user pages
import Home from './pages/user/Home.jsx';
import Categories from './pages/user/Categories.jsx';
import About from './pages/user/About.jsx';
import Contact from './pages/user/Contact.jsx';
import Courses from './pages/user/Courses.jsx';
import UserSignup from './pages/user/Signup.jsx';
import UserLogin from './pages/user/Login.jsx';
const App = () => {
  return (

    <div className='px-96'>
      <div>
        <Router>
          <Navbar />
          <Routes>
            {/* admin routes */}
            <Route path='/admin/login' element={<Login />} />
            <Route path='/admin/dashboard' element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>} />
            <Route path='/admin/create_post' element={<CreatePost />} />
            <Route path='/admin/create_admin' element={<CreateAdmin />} />
            <Route path='/admin/logout' element={<Logout />} />

            {/* user routes */}
            <Route path='/home' element={<Home />} />
            <Route path='/categories' element={<Categories/>}/>
            <Route path='/about' element={<About/>}/>
            <Route path='/contact' element={<Contact/>}/>
            <Route path='/courses' element={<Courses/>}/>
            <Route path='/signup' element={<UserSignup/>}/>
            <Route path='/login' element={<UserLogin/>}/>
          </Routes>
          <Footer />
        </Router>
      </div>
    </div>
  )
}

export default App