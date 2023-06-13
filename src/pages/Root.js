import React from 'react'
import { Outlet } from 'react-router'


function Root() {
  return (
    <main>
        <Outlet />
    </main>
  )
}

export default Root
