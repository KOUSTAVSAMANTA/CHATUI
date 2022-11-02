import React from 'react'
// import Home2 from './cam/home'
import { WebcamCapture } from './cam/webcam'
import { useNavigate,Link } from 'react-router-dom'
import axios from 'axios'

const Login = () => {

  
  const naviget = useNavigate()
  localStorage.setItem('name',null)
  localStorage.setItem('ACCID',null)
  localStorage.setItem('image',null)

  const handleSubmit = (e) =>{

    

    e.preventDefault()
    const userName = e.target[1].value;
    const ACCID = e.target[2].value;
    const Image = localStorage.getItem('image')

    axios.post( 'https://api.elastabot.ml/AUTH',{'imgname':Image })
    .then(res=>{
        console.log(res.data, userName.toLowerCase())
        if ((res.data).toLowerCase() === userName.toLowerCase()){
          localStorage.setItem('name',res.data)
          localStorage.setItem('ACCID',ACCID)
          naviget('/')
        }
    })
    .catch(err=>{
      console.log(err)
    })

    console.log(userName,ACCID)


  }


  return (
    <div className='formContainer'>
        <div className='formWrapper'>
            <span className='logo'>Welcome</span>
            <span className='title'>Login</span>
            <form onSubmit={handleSubmit}>
                <WebcamCapture />
                <input text="Name" placeholder='User Name'/>
                <input text="AccNo" placeholder='Account Number'/>
                <button>Sign in</button>
            </form>
            <p>You do'nt have an account? <Link to="/register">Register</Link></p>
        </div>
    </div>
  )
} 

export default Login