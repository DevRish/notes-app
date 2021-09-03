import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import "./../Styles/SignIn.css";

const SignIn = (props) => {
    const [sign,setSign] = useState(true);
    const [fail,setFail] = useState('');
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    let history = useHistory();
    const signIn = async () => {
        if((username==='')||(password==='')) setFail('empty');
        else
        {
            const response = await fetch('/signin', {
                method: 'post',
                body: JSON.stringify({ username: username, password: password }),
                headers: {
                    'Content-Type' : 'application/json'
                }
            });
            const resjson = await response.json();
            const message = await resjson.message;
            const token = await resjson.token;
            setFail(message);
            setUsername('');
            setPassword('');
            if(message==='success') 
            {
                props.setLoggedStatus(true);
                props.setCurrUser(username);
                props.setToken(token);
                history.push('/profile'); // redirecting to profile
            }
        }
    };
    const signUp = async () => {
        if((username==='')||(password==='')) setFail('empty');
        else
        {
            const response = await fetch('/signup', {
                method: 'post',
                body: JSON.stringify({ username: username, password: password }),
                headers: {
                    'Content-Type' : 'application/json'
                }
            });
            const resjson = await response.json();
            const message = await resjson.message;
            const token = await resjson.token;
            setFail(message);
            setUsername('');
            setPassword('');
            if(message==='success') 
            {
                props.setLoggedStatus(true);
                props.setCurrUser(username);
                props.setToken(token);
                history.push('/profile'); // redirecting to profile
            }
        }
    };
    return(
        <div className="outer">
            <div className="container">
                <h2>{ sign ? "SignIn" : "SignUp" }</h2>
                <div className="signIn inner">
                    { 
                        sign ? 
                        <p> Sign In to your account. </p> :
                        <p> Welcome! Create a new account. </p> 
                    }
                    {
                        (sign && (fail==='NA') ) ?
                        <p> Account doesnot exist. </p> : 
                        ((fail==='wrong') ? <p> Wrong Password </p> : "")
                    }
                    {
                        ((!sign) && (fail==='exists')) ? 
                        <p> Sorry, this username is taken. </p> : ""
                    }
                    {
                        (fail==='empty') ?
                        <p> Please enter both fields to proceed. </p> : ""
                    }
                    <div id="form">
                        <div>
                            <h5>Enter Username </h5><br/>
                            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                        </div>
                        <div>
                            <h5>Enter Password </h5><br/>
                            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        { 
                            sign ? 
                            <button className="btn" onClick={signIn}>SignIn</button> :
                            <button className="btn" onClick={signUp}>SignUp</button>
                        }
                    </div>
                    {
                        sign ? 
                        <button className="UpInSwitch" onClick={() => { 
                            setSign(!sign); setUsername(''); setPassword(''); 
                        }}>Don't have an account? SignUp.</button> :
                        <button className="UpInSwitch" onClick={() => {
                            setSign(!sign); setUsername(''); setPassword('');
                        }}>Already have an account? SignIn.</button>
                    }
                </div>
            </div>
        </div>
    );
}

export default SignIn;