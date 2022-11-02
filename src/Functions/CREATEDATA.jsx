// import axios from 'axios';

import axios from "axios"
import { useState } from "react";


var dit=""


const CREATEDATA = (userName,Email,DOB,Address,phone,age,AccType,AccBal,Image) => {

  // const [complete,setComplet]=useState('');

  // localStorage.setItem("ACCID",accid)
  const dict = {
    "name":userName,
    "type":AccType,
    "DOB":DOB,
    "ab":AccBal,
    "addr":Address,
    "email":Email,
    "ph":phone,
    "age":age,
    "img":Image
  }
  // return("done")
  axios.post( "https://5e0d-223-223-150-158.ngrok.io/"+ "createdata",{'msg':dict })
  .then(res=>{
    if (res !== null){
      localStorage.setItem("ACCID",res.data)
      dit="done"
      // return("console.log(done)")
      // return("done")
      // setComplet(true)
    }

  })
  .catch(err=>{
    console.log(err);
  });

  return(
    dit
  )
}

export default CREATEDATA