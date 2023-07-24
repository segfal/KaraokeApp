import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) =>{
        e.preventDefault();
        axios.post(`http://localhost:4100/auth/login`,{email: email, password: password})
        .then((res)=>{
            console.log("SUBMIT RES: ", res);
            navigate(`/profile/${res.data.firstName}}`);
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