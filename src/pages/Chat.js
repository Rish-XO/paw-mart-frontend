import React, { useEffect } from 'react'
import ChatPage from '../components/Chat/ChatPage'
import Navbar from '../components/layout/Navbar'
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';

function Chat() {
  const navigate = useNavigate()
  const isLoggedIn = useSelector((state) => state.authHandler.isLoggedIn);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/signup");
    }
  }, [isLoggedIn, navigate]);

  

  return (
    <div>
      <Navbar />
      <ChatPage />
    </div>
  )
}

export default Chat
