import React,{useContext} from 'react'
import Messages from './Messages'
import Input from './Input'
import { ChatContext } from '../Context/Chatcontext';


const Chat = () => {
  const {data} = useContext(ChatContext);
  // console.log('selected',data)
  const service = localStorage.getItem("Selected")
  return (
    <div className='chat'>
      <div className="chatInfo">
        <span>{data.user}</span>
        <div className="chatIcons">
          <img src="" alt="" />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  )
}

export default Chat