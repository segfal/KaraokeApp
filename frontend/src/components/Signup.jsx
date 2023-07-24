import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");

    const handleSubmit = (e) =>{
        e.preventDefault();
        axios.post(`http://localhost:4100/auth/signup`,{email: email,password: password, firstName: firstname, lastName: lastname})
        .then((res)=>{
            console.log(res);
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    return (
        <div>
            <h1>SIGN UP</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" onChange={(e)=>{setFirstname(e.target.value)}} placeholder="First name" name="firstname"></input>
                <input type="text" onChange={(e)=>{setLastname(e.target.value)}} placeholder="Last name" name="lastname"></input>
                <input type="email" onChange={(e)=>{setEmail(e.target.value)}} placeholder="Email" name="email"></input>
                <input type="password" onChange={(e)=>{setPassword(e.target.value)}} placeholder="Password" name="password"></input>
                <button type="submit">Sign up</button>
            </form>

            <p>OR</p>

            <Link to="/login">Log in to an existing account</Link>
        </div>
    )
}

export default Signup;