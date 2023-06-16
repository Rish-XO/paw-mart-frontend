import React, { Fragment } from 'react'
import Navbar from '../components/layout/Navbar'
import { Outlet } from 'react-router'

function PostsRootLayout() {
  return (
   <Fragment>
    <Navbar />
    <Outlet />
   </Fragment>
  )
}

export default PostsRootLayout
