import React from 'react'
// import Home2 from './cam/home'
// import Add from '../img/add.png'
import axios from 'axios'
import { WebcamCapture } from './cam/webcam'
// import CREATEDATA from '../Functions/CREATEDATA'
import { useNavigate ,Link} from 'react-router-dom'



const Register = () => {

  // const [complete,setComplet]= React.useState('');

  const naviget = useNavigate()
  localStorage.setItem('name',null)
  localStorage.setItem('ACCID',null)
  localStorage.setItem('image',null)

  const handleSubmit = (e) =>{

    e.preventDefault()
    const userName = e.target[1].value;
    const Email = e.target[2].value;
    const DOB = e.target[3].value;
    const Address = e.target[4].value;
    const phone = e.target[5].value;
    const age = e.target[6].value;
    const AccType = e.target[7].value;
    const AccBal = e.target[8].value;
    // const Accno = e.target[3].value;
    const Image = localStorage.getItem('image');
    // let charr = CREATEDATA(userName,Email,DOB,Address,phone,age,AccType,AccBal,Image)
    const dict = {
      "name":userName,
      "type":AccType,
      "DOB":DOB,
      "ab":AccBal,
      "addr":Address,
      "email":Email,
      "ph":phone,
      "age":age,
      // "img":Image
    }
    // return("done")
    axios.post( "https://api.elastabot.ml/"+ "createdata",{'msg':dict })
    .then(res=>{
      // let img = localStorage.getItem('image')
      axios.post( 'https://api.elastabot.ml/upload',{'imgname':userName+".png", 'img':Image})
      .then(res2=>{
        console.log(res2)
      })
      .catch(err=>{
        console.log(err);
      })
      if (res !== null){
        localStorage.setItem("ACCID",res.data) 
        localStorage.setItem("name",userName) 
        // localStorage.setItem("ACCID",res.data) 
         naviget("/")
      }
  
    })
    .catch(err=>{
      console.log(err);
    });
    // console.log(charr,localStorage.getItem('ACCid'),CREATEDATA(userName,Email,DOB,Address,phone,age,AccType,AccBal,Image))
    // if (localStorage.getItem('ACCid') === "data"){
    
    // }
    // console.log(Image)
  }


  return (
    <div className='formContainer'>
        <div className='formWrapper'>
            <span className='logo'>Welcome</span>
            <span className='title'>Register</span>
            <form onSubmit={handleSubmit}>
                <WebcamCapture />
                <input text="Name" placeholder='User Name'/>
                <input text="Email" placeholder='Email id'/>
                <input text="DOB" placeholder='Date of Birth'/>
                <input text="Address" placeholder='Address'/>
                <input text="phone" placeholder='Mobile Number'/>
                <input text="age" placeholder='Age'/>
                <input text="AccType" placeholder='Account Type'/>
                <input text="AccBal" placeholder='Account Balance'/>
                {/* <input text="AccNo" placeholder='Account Number'/> */}
                <button>Sign up</button>
            </form>
            <p>You do have an account? <Link to="/login">Login</Link></p>
        </div>
    </div>
  )
} 

export default Register