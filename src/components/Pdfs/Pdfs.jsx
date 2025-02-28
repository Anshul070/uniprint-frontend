import React, { useEffect } from 'react'
import { TopBar } from '../TopBar'
import Body from './Body'

function Pdfs({handlePathSelection}) {
    useEffect(() => handlePathSelection("/pdfs"), [])
  return (
    <div className="bg-white rounded-lg pb-4 shadow">
          <TopBar />
          <Body />
        </div>
  )
}

export default Pdfs