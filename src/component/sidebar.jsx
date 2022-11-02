import React from 'react'
import Navbar from "../component/Navbar"
import Search from "../component/Search"
import Chats from "../component/Chats"

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <Navbar />
      <Search />
      <Chats />
      {/* sidebar */}
    </div>
  )
}

export default Sidebar