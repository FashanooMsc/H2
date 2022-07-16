import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import '../../App.css'


const SignInPage = ({ setAuth }) => {

    const [inputs, setInputs] = useState({user_email: "", user_password: ""})

    const { user_email, user_password} = inputs

    const onChange = (e) => {
        setInputs({...inputs, [e.target.name]: e.target.value});
    };

    const onSubmitForm = async (e) => {
            e.preventDefault()

            try{
                const body = {user_email, user_password}

                //proxy

                const response = await fetch("/auth/login", {
                    method: "POST", 
                    headers: {"Content-Type": "application/json"}, 
                    body: JSON.stringify(body)

                });

                const parseRes = await response.json();

                localStorage.setItem("token", parseRes.token);

                if(parseRes.token){
                setAuth(true);} else{
                    setAuth(false);
                }

                //console.log(parseRes);
                
            } catch(err) {
                console.error(err.message)
            }

    }

    return (
        <div >
            <h2>Sign in to us</h2>
               <form onSubmit={onSubmitForm}>
               <p>
                    <label>Email address</label><br/>
                    <input type="email" name="user_email" value={user_email} onChange={e => onChange(e)} />
                </p>
                <p>
                    <label>Password</label><br/>
                    <input type="password" name="user_password" value={user_password} onChange={e => onChange(e)} />
                </p>


                <p>
                <button type="submit">Login</button>
                </p>
                </form>
        <Link to="/register">Register here</Link>
        </div>
    );
};

export default SignInPage;
