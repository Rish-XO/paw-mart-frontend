import React from 'react'
import { Outlet } from 'react-router'
import Footer from '../components/layout/Footer'

function Root() {
  return (
    <main>
        <Outlet />
        <Footer />
    </main>
  )
}

export default Root
