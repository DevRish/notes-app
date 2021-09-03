import React from 'react';
import { Link } from 'react-router-dom';
import "./../Styles/Profile.css";

const Profile = (props) => {
    function logout(){
        props.setLoggedStatus(false);
        props.setCurrUser('');
    }
    return(
        <div className="outer">
            <div className="container">
                <h2>Profile</h2>
                <div className="profile inner">
                    {
                        (props.curruser==='') ? 
                        <p>Please signin to view your profile.</p> :
                        <>
                            <p>Welcome {props.curruser}</p>
                            <Link to="/sign" className="btn" onClick={logout}>LogOut</Link>
                        </>
                    } 
                </div>
            </div>
        </div>
    );
}

export default Profile;