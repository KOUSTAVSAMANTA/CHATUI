import React from 'react'
import { useNavigate } from 'react-router-dom'


localStorage.setItem('name',"")
localStorage.setItem('image',"")
localStorage.setItem("Selected",'')
localStorage.setItem('ACCID','')


const Navbar = () => {

  const nav= useNavigate()
  const signOut = () =>{
    // console.log("logout")
    nav("/login")

  }
  const name = localStorage.getItem('ACCID')

  if(name==='' || name === null){
    var _z = "Login"
  }
  else{
    var _z = "Logout"
  }

  console.log(name===null)
  
  return (
    <div className='navbar'>
      <span className='logo'>Welcome</span>
      <div className="user">
        <img src={localStorage.getItem('image')} alt="" /> {/*  user Image when logged in */}
        <span>{name}</span> {/*  user name when logged in */}
        <button onClick={() => signOut()}>{_z}</button>{/*  user logout when logged in */}
      </div>
    </div>
  )
}

export default Navbar