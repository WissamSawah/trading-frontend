import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

import Start from './components/Home/Home';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import Trading from './components/Trading/Trading';
import Navbar from './components/Navbar/Navbar';



function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        if (localStorage.getItem("user")) {
            setIsLoggedIn(true)
        }
    }, [isLoggedIn])

    return (
        <Router>
            <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
                <Route exact path="/" component={Start} />
                <Route path="/register" component={Register} />
                <Route
                    path="/Login"
                    render={(props) => <Login {...props} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}
                />
                <Route path="/Trading" component={Trading} />
                    <br>
                    </br>
                    <br>
                    </br>
            <footer bg="light" variant="light" className="footer">
                <p className="footerText">Copyright © 2020 <b className="navbar-brand">StockTrading</b></p>
            </footer>
        </Router>
    );
}

export default App;
