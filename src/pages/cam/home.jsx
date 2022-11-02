import React from 'react'
import { useState } from 'react';
import './home.css'
import {WebcamCapture } from './webcam';
import axios from 'axios'

// import {useNavigate} from 'react-router-dom'

const Home2 = () => {
    const [name,setName] = useState('');
    const [accno,setAccno] = useState('');
    // const navigate = useNavigate();
    // console.log("zzzzzzzzzzzzzzzzzzzzzzzzzz"+img)
    const submitForm = (event) =>{
        event.preventDefault();
        
        let img = localStorage.getItem('image')
        axios.post( 'http://43.204.70.134/AUTH',{'imgname':img })
        .then(res=>{
            console.log(res.data, name.toLowerCase())
            if ((res.data).toLowerCase() === name.toLowerCase()){
                localStorage.setItem("auth","True")
                localStorage.setItem("accno", accno)
                localStorage.setItem("name", name)
                // navigate("/home")
            }
            else if (res.data ==="not matched"){
                axios.post( 'http://43.204.70.134/upload',{'imgname':name+".png", 'img':img})
                .then(resr=>{
                    console.log(resr)
                })
                .catch(err=>{
                    console.log(err)

                });
                
                localStorage.setItem("auth","True")
                localStorage.setItem("accno", accno)
                localStorage.setItem("name", name)

                console.log(res.data, name.toLowerCase())
                // navigate("/home")
                // alert("Not matched ");
            }
            else{
                alert("Not matched ");
            }
        //     //let ch = this.state.chat;
        //     // ch.push({from:'our',msag:this.state.msg});
        //     //ch.push({from:'cb',msag:res.data});
        //     //this.setState({chat:ch,msg:''});
        //     // console.log(this.state);
        })
        .catch(err=>{
            console.log(err);
        });
        // alert("Foem submitted");
        setName('');
        setAccno('');

    }
    
    return (
        <div className='home-container'>
            <div className='container'>
                <div className='text'>
                    <h1>Fill up THE form</h1>
                    <form className='form'>

                        <WebcamCapture />

                        <input type="email" placeholder='Name' onChange={(e) => setName(e.target.value)} />

                        <input type="text" placeholder='Account Number' onChange={(e) => setAccno(e.target.value)} />
                        
                        <button type='submit' id="login-button" onClick={(e) => submitForm(e)}>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Home2