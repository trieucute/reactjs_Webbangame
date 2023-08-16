import React from 'react';
import './../../assets/css/fontawesome.css';
import './../../assets/css/templatemo-lugx-gaming.css';
import './../../assets/css/owl.css';
import './../../assets/css/animate.css';
import './../../vendor/bootstrap/css/bootstrap.min.css';
// import bannerGame from './../../assets/images/thewit.jpg';
import logo from './../../assets/images/logo3.png'
import {Link,Outlet,NavLink} from 'react-router-dom'
import { useState, useEffect } from 'react';
import Logout from './login/Logout';
import firebase from '../../firebase';
import useAuthState from 'react-firebase-hooks/auth'
const Homes = () => {
  // const [user,loading] = useAuthState(firebase.auth())
  const [isFixed, setIsFixed] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const navLinkStyle=({isActive})=>{
    return{
      color: isActive ? '#fff' : '#fff',
      backgroundColor:  isActive ?  'rgba(255, 255, 255, 0.10)': '',
    }
  }
    return (
        <div>
        
  {/* ***** Header Area Start ***** */}
  <header className={isFixed ? "menu fixed header-area header-sticky" : "menu header-area header-sticky"}> 
    <div className="container">
      <div className="row">
        <div className="col-12">
          <nav className="main-nav" >

         {/* ***** Logo Start ***** */}
   <a href="/" className="logo " style={{ width: '120px'}}>
              <img src={logo} alt="" style={{ width: '106px', height:'86px' ,marginLeft:"30px"}} />
              
            </a>
         
            {/* ***** Logo End ***** */}
    
         
            {/* ***** Menu Start ***** */}
            <ul className="nav">
              <li>
            
                <NavLink  style={navLinkStyle} to="/">Home</NavLink>
              </li>
              <li>
                
                <NavLink style={navLinkStyle} to="/shop"   >Our Shop</NavLink>
              </li>
              <li>
              <NavLink style={navLinkStyle} to="/about"   >About Us</NavLink>
              </li>
              <li>
              <NavLink style={navLinkStyle} to="/contact"   >Contact Us</NavLink>
              </li>
             

              <li>
               <Logout/>
               {/* {!user &&    
   <li>
      <a href="/signin">Sign In</a>
    </li>} */}
              </li>
            </ul>
            <a className="menu-trigger">
              <span>Menu</span>
            </a>
            {/* ***** Menu End ***** */}
          </nav>
        </div>
      </div>
    </div>
  </header>
  {/* ***** Header Area End ***** */}
  

  <>
  <Outlet/>
</>
<footer>
    <div className="container">
      <div className="col-lg-12">
        <p>
          Copyright © ps24977-Trần Bích Triệu
          &nbsp;&nbsp;{" "}
          
        </p>
      </div>
    </div>
  </footer>
        </div>
    );
};

export default Homes;