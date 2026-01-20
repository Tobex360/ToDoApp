import React, { useEffect, useState } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import logo from '../assets/react.svg'
import '../App.css'
import avatar from '../assets/login.jpg'
import { gettUserDetails } from '../util/GetUser'
import { Dropdown } from 'antd'


function Navbar({ active }) {
  const [user, setUser] = useState(null)
  const navigate =useNavigate();

  useEffect(() => {
    const userDetails = gettUserDetails();
      console.log('User details from storage:', userDetails); // 👈 ADD HERE

    setUser(userDetails);
  }, []);

  const handleLogout =()=>{
    localStorage.removeItem('user');
    navigate('/login');
    }

  const items = [{
    key: '1',
    label: (
      <span onClick={handleLogout}>Logout</span>
    ),
    },
  ];

  return (
    <header>
      <nav>
        <div className='logo_wrapper'>
          <img src={logo} alt="logo" />
          <h4>DoDo</h4>
        </div>

        <ul className='navigation-menu'>
          <li>
            <Link to="/" className={active === 'home' ? 'activeNav' : ''}>
              Home
            </Link>
          </li>

          {user && (
            <li>
              <Link to="/to-do-list" className={active === 'myTask' ? 'activeNav' : ''}>
                My Task
              </Link>
            </li>
          )}
          {user ?
            <Dropdown
            
              menu={{
                items,
              }}
              placement = "bottom"
              arrow>
                <div className='userInfoNav'>
                  <img src={avatar} alt="." />
                  <span>{user?.firstname ? `Hello, ${user?.firstname} ${user?.lastname}` : user?.username}</span>
                </div>

            </Dropdown>
          
        
        :

            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </>

            }</ul>
      </nav>
    </header>
  )
}

export default Navbar