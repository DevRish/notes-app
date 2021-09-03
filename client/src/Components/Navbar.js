import "./../Styles/Navbar.css";
import React, { useState } from 'react';
import { Link } from "react-router-dom";

const Navbar = (props) => {
    const [showMenu,setshowMenu] = useState(false); // for burger menu
    return(
        <nav>
            <div className="container">
                <div className="burger" onClick={() => setshowMenu(!showMenu)}><i className="fas fa-bars"></i></div>
                <h1>Notes App</h1>
                <ul id={ showMenu ? "show" : "hide" }>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li>
                        { 
                            props.loggedStatus ? 
                            <Link to="/profile" className="btn">Profile</Link> : 
                            <Link to="/sign" className="btn">Sign In</Link> 
                        }
                    </li>
                </ul>
            </div>
        </nav>
)};

export default Navbar;