import { CssBaseline } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router'
import CustomizedSnackbars from '../components/snackbar/Snackbar'


function Root() {
  return (
    <main>
      <CssBaseline />
        <Outlet />
        <CustomizedSnackbars />
    </main>
  )
}

export default Root
