import React, { useEffect } from 'react'

function Users({handlePathSelection}) {
    useEffect(() => handlePathSelection("/users"), [])
  return (
    <div>Users</div>
  )
}

export default Users