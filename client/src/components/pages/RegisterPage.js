import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript'

import '../../App.css'

const SignUpPage = ({setAuth}) => {

    const [inputs, setInputs] = useState({ user_name:"", user_email:"", user_password:"" })

    const {user_name, user_email, user_password} = inputs;

    const onChange = (e) => {
        setInputs({...inputs, [e.target.name] : e.target.value});
    };

    const onSubmitForm = async (e) => {
        e.preventDefault()

        try {

            const body = {user_name, user_email, user_password}

            const response = await fetch("/auth/register", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });

            const parseRes = await response.json()

            localStorage.setItem("token", parseRes.token)

            setAuth(true);


        } catch (err) {
            console.error(err.messsage);
        }
    }

    return (
        <div className="registerPageBody text-center m-5-auto">
            <h2>Join us</h2>
            
            <form onSubmit={onSubmitForm}>
                <p>
                    <label>Username</label><br/>
                    <input type="text" name="user_name" required value={user_name} onChange ={e => onChange(e)} />
                </p>
                <p>
                    <label>Email address</label><br/>
                    <input type="email" name="user_email" required value={user_email} onChange ={e => onChange(e)} />
                </p>
                <p>
                    <label>Password</label><br/>
                    <input type="password" name="user_password" required value={user_password} onChange ={e => onChange(e)}/>
                </p>
                
                <p>
                    <button id="sub_btn" type="submit">Register</button>
                </p>
            </form>
            <Link to="/login">Login here</Link>
            <footer>
                <p><Link to="/">Back to Homepage</Link>.</p>
            </footer>
        </div>
    )

}

export default SignUpPage;