import React from "react";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import { Typography } from "@mui/material";

function ChatFiller() {
  return (
    <div className="filler">
      <div className="icon-wrapper">
        <AnnouncementIcon sx={{ fontSize: "5rem" , margin: "30% 50% 0% 50%"}} />
      </div>
      <Typography sx={{marginLeft:"60px"}} align="center">Select a chat to view conversation</Typography>
    </div>
  );
}

export default ChatFiller;
