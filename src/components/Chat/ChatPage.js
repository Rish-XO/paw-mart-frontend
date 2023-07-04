import React from 'react';
import { Container, Grid, Paper, Typography } from '@mui/material';
import './ChatPage.css'

const ChatPage = () => {
  return (
    <Container sx={{marginTop: "5rem"}} maxWidth="lg" className="chat-page">
      <Grid container>
        <Grid item xs={4}>
          <Paper className="chat-list">
            <div className="chat-item">John Doe</div>
            <hr></hr>
            <div className="chat-item">Jane Smith</div>
            {/* Add more chat items */}
          </Paper>
        </Grid>
        <Grid item xs={8}>
          <Paper className="chat-content">
            <Typography variant="h6" className="chat-header">
              John Doe
            </Typography>
            <div className="chat-bubble">
              <div className="avatar" />
              <div className="message">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
            </div>
            <div className="chat-bubble">
              <div className="message">Ut eget neque aliquam, lacinia ligula at, accumsan turpis.</div>
            </div>
            {/* Add more chat bubbles */}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ChatPage;
