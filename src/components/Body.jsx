import React, { useContext, useEffect, useState } from 'react'
import Chatroom from './pages/Chatroom'
import XhatContext from '../context/XhatContext'
import { SlLogin } from "react-icons/sl";

function Body() {
  const { isAuthenticated, selectedUser, setSelectedUser, users, onUserSelect } = useContext(XhatContext)
  

  const authenticatedBody = (
    <div className='mx-[50px] bg-stone-200 flex rounded-2xl '>
        <div className='border-l-[2px] border-slate-800 border-opacity-30 w-[30%] min-h-screen'>
            <h1 className='font-bold text-[20px] font-Arima text-center'>Chats</h1>
            <div>
              <h3>Select a user to chat with</h3>
              {users.map((user)=>(
                <p key={user._id} className='border-[1px] p-[10px] bg-slate-600 m-[10px]' onClick={()=> onUserSelect(user._id)}>{user.firstName}</p>
              ))}
            </div>
        </div>
        <div className='border-l-[2px] border-slate-800 border-opacity-30 w-[70%] font-Arima flex flex-col'>
            <h1 className='font-Gupter text-[20px] pl-2 font-bold'>ChatName</h1>
            <Chatroom />
        </div>
    </div>
  ) 

  return (
    <>
      {isAuthenticated ? authenticatedBody : <SlLogin />}
    </>
  )
}

export default Body