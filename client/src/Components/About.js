import React from 'react';
import "./../Styles/About.css";

const About = () => {
    return(
        <div className="outer">
            <div className="container">
                <h2>About</h2>
                <div className="aboutUs inner">
                    <div className="image"></div>
                    <div className="desc">
                        <p>
                            <b>
                            Hii!! Glad to see you here. This is my first complete MERN stack project.<br/>
                            I used express as a backend server. MongoDB connections were managed with the mongoose module.<br/>
                            And the frontend was made with ReactJS. I learnt a lot while making this.<br/>
                            </b>
                        </p>
                        <span className="social">
                            <b>Connect with me: </b>
                            <a href="https://github.com/DevRish"><i className="fab fa-github"></i></a>
                            <a href="https://www.linkedin.com/in/rishav-chattopadhya-833850204/"><i className="fab fa-linkedin"></i></a>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;