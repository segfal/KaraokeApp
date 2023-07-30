import React,{useState,useEffect,useContext} from 'react';
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";
import { setUserThunk } from '../redux/User/User.action';
import { useDispatch } from 'react-redux';
import {S3Client, PutObjectCommand} from '@aws-sdk/client-s3';
import data from '../creds.json';
import { AuthContext } from '../App';

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");

    const [selectedFile, setSelectedFile] = useState(null); //Set it to null so that it is not a string
    const [image, setImage] = useState(null); //Set it to null so that it is not a string
    const [fileName, setFileName] = useState("");

    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const s3 = new S3Client({
        region: data.region,
        credentials: {
            accessKeyId: data.accessKeyId,
            secretAccessKey: data.secretAccessKey
        }
    });


    const handleSubmit = (e) =>{
        e.preventDefault();
        axios.post(`https://karaoke-backend-exp-production.up.railway.app/auth/signup`,{email: email,password: password, firstName: firstname, lastName: lastname , profilePic: fileName})
        .then((user)=>{
            console.log("SUBMIT RES FOR USER: ", user);
            dispatch(setUserThunk({firstName: user.data.firstName, lastName: user.data.lastName, email: user.data.email, id: user.data.id,profilePic: user.data.profilePic}));
            setIsAuthenticated(true);
            navigate(`/profile/${user.data.id}`);
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    const handleFileChange = (e) =>{
        e.preventDefault();
        setSelectedFile(e.target.files[0]);
        
    }
    const handleUpload = (e) =>{
        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = () =>{
            const img = new Image(); // image object so we can get the width and height
            img.src = reader.result;
            const max_width = 150;
            const max_height = 150;
            img.onload = () =>{ //when the image is loaded, we can resize it
                let width = img.width;
                let height = img.height;
                if(width > height){
                    if(width > max_width){
                        height *= max_width / width;
                        width = max_width;
                    }
                }else{
                    if(height > max_height){
                        width *= max_height / height;
                        height = max_height;
                    }
                }
                const canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext("2d");
                ctx.drawImage(img,0,0,width,height);
                const dataurl = canvas.toDataURL("image/png");
                setImage(dataurl);
            }
        }


        //if image is huge, we can compress it here
        //upload to s3
        setFileName(`https://karaoke-pfps.s3.amazonaws.com/`+selectedFile.name); //This is the url to the image
        const uploadParams = {
            Bucket: data.bucketName,
            Key: selectedFile.name,
            Body: selectedFile,
            ContentType: selectedFile.type,
            ACL: 'public-read'
        };
        const command = new PutObjectCommand(uploadParams);
        s3.send(command)
        .then((data)=>{
            console.log("DATA: ", data);
        })
        .catch((err)=>{
            console.log("ERROR: ", err);
        })
        



    }

    useEffect(() => {
        console.log("IMAGE: ", image);
        //if image is huge, we can compress it here
    }, [image])

    return (
        <div className='bg-lightGreen font-montserrat h-[calc(100vh-208px)] pt-16 flex flex-col items-center justify-center'>
            <h1 className='text-4xl pb-12 font-extra-extrabold'>Welcome to the Serenade community!</h1>
            <div className='flex flex-col justify-center items-center font-montserrat rounded-lg py-6 shadow px-10 mx-auto bg-mainGreen w-2/3'>
                <h1 className='font-semi-bold text-mainWhite text-lg'>Create a new account</h1>
                <form onSubmit={handleSubmit}  className="flex flex-col items-center justify-center">
                    <div className='flex items-center justify-center mb-4'>
                        <div className="flex flex-col">
                            <input type="text" onChange={(e)=>{setFirstname(e.target.value)}} placeholder="First name" name="firstname" className="rounded p-2 mt-4 w-64"></input>
                            <input type="text" onChange={(e)=>{setLastname(e.target.value)}} placeholder="Last name" name="lastname" className="rounded p-2 mt-4 w-64"></input>
                            <input type="email" onChange={(e)=>{setEmail(e.target.value)}} placeholder="Email" name="email" className="rounded p-2 mt-4 w-64"></input>
                            <input type="password" onChange={(e)=>{setPassword(e.target.value)}} placeholder="Password" name="password" className="rounded p-2 mt-4 w-64"></input>
                        </div>
                        <div className='flex flex-col items-center justify-center ml-8'>
                            <div className='bg-bgGreen rounded p-2 mb-2 w-64 flex flex-col items-center justify-center mt-4'>
                                 <label className='text-gray-600'>Profile Picture</label>
                                <input type="file" onChange={handleFileChange} name="image" className='w-64 flex text-center p-2'></input>
                                <button type="button" onClick={handleUpload} className="underline">Upload to view a preview</button>
                                {image && (
                                    <div className="w-24 h-24 rounded-full overflow-hidden m-2">
                                        <img src={image} alt="Preview" className="object-cover w-full h-full" />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="text-right font-extra-extrabold bg-mainYellow rounded-md hover:bg-mainWhite transition-colors duration-200 ease-in-out p-2">SIGN UP</button>
                </form>

                <Link to="/login" className="text-mainWhite hover:text-gray-500 hover:underline transition-all text-sm mt-4">Log in to an existing account</Link>
            </div>
        </div>
    )
}

export default Signup;