import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './components/HomePage'
import Quiz from './components/Quiz'
import Results from './components/Results'
import InstagramAuth from './components/InstagramAuth'

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/results" element={<Results />} />
        <Route path="/auth/instagram/callback" element={<InstagramAuth />} />
      </Routes>
    </div>
  )
}

export default App 