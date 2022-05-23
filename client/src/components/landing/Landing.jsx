import React from 'react';
import { Link } from 'react-router-dom';
import './landing.css';
import logo from '../../images/logo-white.png';


const Landing = () => {
  return ( 
      <div className={"container"}>
              <img src={logo} alt="logo" />
          <div className={"btnLanding"}>
              <Link to= '/home'>
                  <button className={"btn"}>Welcome!</button>
              </Link>
          </div>
      </div>
   );
}

export default Landing;