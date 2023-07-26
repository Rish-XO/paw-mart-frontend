import React from 'react'
import { useParams } from 'react-router'

function Profile() {
    const user_id = useParams()
  return (
    <div>
      <h1>helloo 
        {user_id}
      </h1>
    </div>
  )
}

export default Profile
