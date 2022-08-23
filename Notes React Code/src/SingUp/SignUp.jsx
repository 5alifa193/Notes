import axios from 'axios';
import { func, valid  } from 'joi';
import Joi from 'joi';
import React ,{useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {

  
  const [error , setError]=useState([]);
  const [msg , setMessage] = useState('');
  const [user , setUser] = useState({
    first_name:"",
    last_name:"",
    email:"",
    password:"",
    age:""
   }
   );



function userData(eve){
  let userData = {...user};
  userData[eve.target.id] = eve.target.value;
  setUser(userData);
}
const navigate = useNavigate();
function navigateToLogin(){
 navigate('/login');
}


async function sendData(eve){
  eve.preventDefault();
  setValidation();
  if(setValidation()===true){
  let myResponce =await axios.post('https://route-egypt-api.herokuapp.com/signup',user);

  if(myResponce.data.message==='success'){
    setMessage('success');
}else if(myResponce.data.message===('citizen validation failed: email: email already registered')){
  setMessage('email is already registered');
}
if(myResponce.data.message==='success'){
  navigateToLogin();
}
}
}

function setValidation(){
const validation = Joi.object({
  first_name:Joi.string().min(2).max(15).required(),
  last_name:Joi.string().min(2).max(15).required(),
  email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
  password:Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,30}$')).required(),
  age:Joi.string().min(1).max(2).required(),
 });

 let valid= validation.validate(user,{abortEarly:false});
 if(valid.error!==undefined){
  setError(valid.error.details);
  return false;
 }else{
  setError([]);
  return true;
 }
 
}


  return (
    <>
    <div className='container'>
      <div className='vh-100 d-flex col-md-12'>
      <form type='submit' className='w-50 m-auto' action="">
        <div>
      <div className='error rounded-1 mb-3'>
        {error.map((error,i)=>{return <p key={i}>{error.message.includes('pattern')?'password must be atleast 8 characters':error.message}</p>})}
        </div>
        </div>
                <div className="row gy-3">
                <div className='col-md-6'>
                <input className="form-control" type="text" placeholder='First Name' id='first_name' onChange={(eve)=>{userData(eve)}}/>
                </div>
                <div className='col-md-6'>
                <input className="form-control" type="text" placeholder='Last Name' id='last_name' onChange={(eve)=>{userData(eve)}}/>
                </div>
                <div className='col-md-12'>
                  <input className='form-control' type="text" name=""  placeholder='Email' id='email' onChange={(eve)=>{userData(eve)}}/>
                </div>
                <div className='col-md-12'>
                  <input className='form-control' type="number" name=""  placeholder='Age' id='age' onChange={(eve)=>{userData(eve)}}/>
                </div>
                <div className='col-md-12'>
                  <input className='form-control' type="password" name=""  placeholder='Password' id='password' onChange={(eve)=>{userData(eve)}}/>
                </div>
                {/* <div className='col-md-12'>
                  <input className='form-control' type="password" name="" placeholder='Re-Password'/>
                </div> */}
                <div className='text-info'>{msg}</div>
                <div className='col-md-12'>
                  <button type='submit'  className='my-btn w-100 p-2 btn btn-outline-info' onClick={(eve)=>{sendData(eve)}}>Sign Up</button>
                </div>
            </div>
          </form>
          
          </div>
            </div>
    </>
  )
}