import { CssBaseline } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router'


function Root() {
  return (
    <main>
      <CssBaseline />
        <Outlet />
        
    </main>
  )
}

export default Root
