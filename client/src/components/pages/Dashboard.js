import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'



const Dashboard = ({ setAuth }) => {

    const [name, setName] = useState("");

    async function getName() {
        try {
            const response = await fetch("/dashboard/", {
                method: "GET",
                headers: { token: localStorage.token }
            });

            window.location = "/"
            const parseRes = await response.json()

            console.log(parseRes);
            setName(parseRes.user_name);


        } catch (err) {
            console.error(err.message)
        }
    }

const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
}

    useEffect(() => {
        getName();
    },[]);

    return (
        <div className="loginPageBody text-center m-5-auto">
            <h2>Dashboard of {name}</h2>

            <button onClick ={e => logout(e)} >Logout</button>

        </div>
    )
}


export default Dashboard;