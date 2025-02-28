import React, { useEffect, useState } from 'react'
import { TopBar } from '../TopBar';
import { TransitionGrid } from './TransitionGrid';

function Payments({handlePathSelection}) {
    useEffect(() => handlePathSelection("/payments"), []);

    

  return (<div>
    <TopBar />
    <TransitionGrid />
  </div>
  )
}

export default Payments