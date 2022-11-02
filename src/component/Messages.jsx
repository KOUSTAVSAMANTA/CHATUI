import React, { useContext, useState } from 'react'
import { ChatContext } from '../Context/Chatcontext';
import Message from "./Message"
// import state from './Input'

const Messages = () => {
 
  // const msg = localStorage.getItem('msg')

  const {data} = useContext(ChatContext);
  // const state ={
  //   chat:[{from:'cb',msag:"hi"},{from:'cb',msag:"How can i help you?"},{from:'cb',msag:'1) create an Account' },{from:'cb',msag:"2) see Account details"},{from:'cb',msag:"3) make a payment  "}],
  //   msg:data['msg']
  // }
  const state =data['msg'][data['user']]
  console.log('state',data['user'])
  // console.log(state['chat']);
  return (
    <div className='messages'>
      {/* <Message /> */}
      {state['chat'].map(ms=>(
        <Message mesage={ms} val={20}/>
      ))}
      {/* console.log(ms['from']) */}
    </div>
  )
}

export default Messages 