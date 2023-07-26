import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";
import { setUserThunk } from '../redux/User/User.action';
import { useDispatch } from 'react-redux';
import {S3Client, PutObjectCommand} from '@aws-sdk/client-s3';
import data from '../creds.json';

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [selectedFile, setSelectedFile] = useState(null); //Set it to null so that it is not a string
    const [image, setImage] = useState(null); //Set it to null so that it is not a string
    const [fileName, setFileName] = useState("");
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
        axios.post(`http://localhost:4100/auth/signup`,{email: email,password: password, firstName: firstname, lastName: lastname})
        .then((user)=>{
            console.log("SUBMIT RES FOR USER: ", user);
            dispatch(setUserThunk({firstName: user.data.firstName, lastName: user.data.lastName, email: user.data.email, id: user.data.id}));
            navigate(`/profile/${user.data.id}}`);
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    const handleFileChange = (e) =>{
        setSelectedFile(e.target.files[0]);
    }
    const handleUpload = (e) =>{
        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = () =>{
            const img = new Image();
            img.src = reader.result;
            const max_width = 150;
            const max_height = 150;
            img.onload = () =>{
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
        setFileName(selectedFile.name);
        const uploadParams = {
            Bucket: data.bucketName,
            Key: selectedFile.name,
            Body: selectedFile,
            ContentType: selectedFile.type
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
        <div>
            <h1>SIGN UP</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" onChange={(e)=>{setFirstname(e.target.value)}} placeholder="First name" name="firstname"></input>
                <input type="text" onChange={(e)=>{setLastname(e.target.value)}} placeholder="Last name" name="lastname"></input>
                <input type="email" onChange={(e)=>{setEmail(e.target.value)}} placeholder="Email" name="email"></input>
                <input type="password" onChange={(e)=>{setPassword(e.target.value)}} placeholder="Password" name="password"></input>
                <input type="file" onChange={handleFileChange} name="image"></input>
                {image && <img src={image} alt="preview"></img>}
                <button onClick={handleUpload}>Upload</button>
                <button type="submit">Sign up</button>
            </form>

            <p>OR</p>

            <Link to="/login">Log in to an existing account</Link>
        </div>
    )
}

export default Signup;