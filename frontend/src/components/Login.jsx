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
        <div className='bg-lightGreen font-montserrat h-[calc(100vh-208px)] pt-16 flex flex-col items-center justify-center'>
            <h1 className='text-4xl pb-12 font-extra-extrabold'>Good to see you again ♫</h1>
            <div className='flex flex-col justify-center items-center font-montserrat rounded-lg py-6 shadow px-10 mx-auto bg-mainGreen w-1/3'>
                <h1 className='font-semi-bold text-mainWhite text-lg'>Log into an existing account</h1>
                {/* /auth/login */}
                <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center"> 
                    <input type="email" onChange={(e)=>{setEmail(e.target.value)}} placeholder="Email" name="email" className="rounded p-2 mt-4 w-64"></input>
                    <input type="password" onChange={(e)=>{setPassword(e.target.value)}} placeholder="Password" name="password" className="rounded p-2 my-4 w-64"></input>
                    <button type="submit" className="text-right font-extra-extrabold bg-mainYellow rounded-md hover:bg-mainWhite transition-colors duration-200 ease-in-out p-2">LOG IN</button>
                </form>
                {/* <p className='text-mainWhite'>OR</p> */}

                <Link to="/signup" className="text-mainWhite hover:text-gray-500 hover:underline transition-all text-sm mt-4">Create an account</Link>
                
            </div>
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