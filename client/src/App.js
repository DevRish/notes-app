import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Notes from './Components/Notes';
import About from './Components/About';
import SignIn from './Components/SignIn';
import Profile from './Components/Profile';
import "./App.css"

const App = () => {
    const [loggedStatus,setLoggedStatus] = useState(false);
    const [curruser,setCurrUser] = useState('');
    const [token,setToken] = useState('');
    return(
        <>
        <BrowserRouter>
        <Route path="/">
            <Navbar loggedStatus={loggedStatus} />
        </Route>
        <Switch>
        <Route path="/" exact >
            <Notes curruser={curruser} loggedStatus={loggedStatus} token={token} />
        </Route>
        <Route path="/about" component={About} />
        <Route path="/sign">
            <SignIn setLoggedStatus={setLoggedStatus} setCurrUser={setCurrUser} setToken={setToken} />
        </Route>
        <Route path="/profile">
            <Profile curruser={curruser} setLoggedStatus={setLoggedStatus} setCurrUser={setCurrUser} />
        </Route>
        </Switch>
        </BrowserRouter>
        </>
    );
}

export default App;