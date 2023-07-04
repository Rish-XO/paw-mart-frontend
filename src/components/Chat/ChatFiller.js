import React from 'react'
import AnnouncementIcon from "@mui/icons-material/Announcement";
import { Typography } from '@mui/material';

function ChatFiller() {
  return (
    <div className='filler'>
      <AnnouncementIcon sx={{fontSize: '5rem'}} />
      <Typography align='center'>
      Select a chat to view conversation
      </Typography>
    </div>
  )
}

export default ChatFiller
