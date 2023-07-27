import React,{useState,useEffect,useContext} from 'react';
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import { setUserThunk } from '../redux/User/User.action';
import { AuthContext } from '../App';

const Login = () => {
    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const data = useSelector((state) => state.user.singleUser);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = (e) =>{
        e.preventDefault();
        axios.post(`https://karaoke-backend-exp-production.up.railway.app/auth/login`,{email: email, password: password})
        .then((user)=>{
            console.log("SUBMIT RES FOR USER: ", user);
            dispatch(setUserThunk({firstName: user.data.firstName, lastName: user.data.lastName, email: user.data.email, id: user.data.id}));
            setIsAuthenticated(true);
            navigate(`/profile/${user.data.id}}`);
        })
        .catch((err)=>{
            console.log("SUBMIT LOGIN ERROR: ", err);
        })
    }

    return (
        <div>
            <h1>LOG IN</h1>
            {/* /auth/login */}
            <form onSubmit={handleSubmit}> 
                <input type="email" onChange={(e)=>{setEmail(e.target.value)}} placeholder="Email" name="email"></input>
                <input type="password" onChange={(e)=>{setPassword(e.target.value)}} placeholder="Password" name="password"></input>
                <button type="submit">Log in</button>
                {console.log("")}
            </form>
            <p>OR</p>

            <Link to="/signup">Create an account</Link>
            
        </div>
    )
}

export default Login;














// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate, Link } from "react-router-dom";

// const Login = () => {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         // Do the login request here using axios or any other method you prefer
//         // For example, using axios:
//         axios.post('/auth/login', {
//             email: email,
//             password: password
//         })
//         .then((response) => {
//             // Handle the login success if needed
//         })
//         .catch((error) => {
//             // Handle login error if needed
//         });
//     };

//     return (
//         <div>
//             <h1>LOG IN</h1>
//             {/* /auth/login */}
//             <form onSubmit={handleSubmit}> 
//                 <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email" name="email" />
//                 <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" name="password" />
//                 <button type="submit">Log in</button>
//             </form>
//             <p>OR</p>
//             <Link to="/signup">Create an account</Link>
//         </div>
//     );
// };

// export default Login;