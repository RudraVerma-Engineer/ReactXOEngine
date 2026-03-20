import React from 'react'
import Game1 from './Component/Game1'
import { Analytics } from "@vercel/analytics/next"

function App() {
  return (
    <div>
      <Game1 />
      <Analytics/>
    </div>
  )
}

export default App
