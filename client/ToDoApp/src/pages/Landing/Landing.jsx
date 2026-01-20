import React from 'react'
import Navbar from '../../components/Navbar'
import { Link } from 'react-router'
import landing from '../../assets/landing.webp'
import styles from './Landing.module.css'
import '../../App.css';


function Landing() {
  return (
    <div>
      <Navbar active={"home"}/>
      <div className={styles.landing_wrapper}>
        <div className={styles.landing_text}>
          <h1>Schedule Your Daily Task with <span className='primaryText'>DoDo!</span></h1>
          <div className='btnWrapper'>
            <Link to='/register' className='primaryBtn'>Register</Link>
            <Link to='/login' className='secondaryBtn'>Login</Link>
          </div>
        </div>
        <div className={styles.landing_img}>
          <img src={landing} alt="Landing" />
        </div>
      </div>
    </div>
  )
}

export default Landing