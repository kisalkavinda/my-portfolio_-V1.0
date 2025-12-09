import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom' // Removed BrowserRouter

import Landing from './components/sections/Landing'
import ProjectDetails from './components/sections/ProjectDetails'
import MainLayout from './components/MainLayout'

function App() {
  const [showLanding, setShowLanding] = useState(true)

  const handleLandingComplete = () => {
    setShowLanding(false)
  }

  return (
    <>
      {/* BrowserRouter is now in main.jsx */}
      {showLanding ? (
        <Landing onComplete={handleLandingComplete} />
      ) : (
        <div className="min-h-screen bg-background-main text-text-primary transition-colors duration-500 w-full overflow-x-hidden">
          <Routes>
            <Route path="/" element={<MainLayout />} />
            <Route path="/project/:id" element={<ProjectDetails />} />
          </Routes>
        </div>
      )}
    </>
  )
}

export default App