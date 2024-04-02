import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  useEffect(async () => { 
   const res = await fetch('https://localhost:3000')
   console.log(res.json())
  }, [])
  return (
    <>
    
    </>
  )
}

export default App
