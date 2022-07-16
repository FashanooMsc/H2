import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'





import LoginPage from './components/pages/LoginPage'
import RegisterPage from './components/pages/RegisterPage'
import ForgetPasswordPage from './components/pages/ForgetPasswordPage'
import HomePage from './components/pages/HomePage'
import './App.css'
import MemoryGame from './components/pages/MemoryGame'


//components
import SignInPage from './components/pages/LoginPage'
import SignUpPage from './components/pages/RegisterPage'
import LandingPage from './components/pages/LandingPage'
import MenuPage from './components/pages/MenuPage'
import Dashboard from './components/pages/Dashboard'



export default function App() {

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const setAuth = boolean => {
        setIsAuthenticated(boolean);
    }

    async function isAuth() {
        try {
            const response = await fetch("http://localhost:5000/auth/isverify", {
                method: "GET",
                headers: { token: localStorage.token }
            });

            window.location = "/"
            
            const parseRes = await response.json()

            parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false)

        } catch (err) {
            console.error(err.message);
        }

    }

    useEffect(() => {
        isAuth()

    })


    return (
        <Router>
            <div>
                <Switch>
                    <Route exact path="/" render={props => <LandingPage {...props} />} />
                    <Route path="/login" render={props => !isAuthenticated ? <SignInPage {...props} setAuth={setAuth} /> : < Redirect to="/dashboard" />} />
                    <Route path="/register" render={props => !isAuthenticated ? <SignUpPage {...props} setAuth={setAuth} /> : < Redirect to="/login" />} />
                    <Route path="/dashboard" render={props => isAuthenticated ? <Dashboard {...props} setAuth={setAuth} /> : < Redirect to="/login" />} />

                </Switch>
                <Footer />
            </div>
        </Router>
    )
}

const Footer = () => {
    return (
        <p className=" footer text-center" style={FooterStyle}>Designed & coded by Sanjiv & Fashanoo</p>
    )
}

const FooterStyle = {
    background: "#222",
    fontSize: ".8rem",
    color: "#fff",
    position: "absolute",
    bottom: 0,
    padding: "1rem",
    margin: 0,
    width: "100%",
    opacity: ".5",
}

//<Route path="/menu" render={props => isAuthenticated ? <MenuPage {...props} setAuth={setAuth}  /> : < Redirect to="/login"/>} />