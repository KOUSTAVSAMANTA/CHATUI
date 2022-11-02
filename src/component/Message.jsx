import React, { useEffect, useRef } from 'react'

const Message = ({mesage,val=10}) => {


  const ref = useRef()
  useEffect(() => {
    ref.current?.scrollIntoView({behavior:"smooth"})
  }, [mesage]);

  // console.log(mesage,val)

  // if mesage


  return (
    <div  ref={ref} className={`message ${mesage['from']!=='cb' && "owner"}`}>
      <div className="messageInfo">
        {/* <img src="" alt="" />  */}
        <span>just now</span>
      </div>
      <div className="messageContent">
        <p>{mesage.msag}</p>
      </div>
    </div>
  )
}

export default Message