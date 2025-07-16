import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { createComponent } from '@lit-labs/react'
import { PfButton } from '@patternfly/elements/pf-button/pf-button.js'

// Create React components from PatternFly Elements
const Button = createComponent({
  tagName: 'pf-button',
  elementClass: PfButton,
  react: React,
})

const HomePage = () => {
  const navigate = useNavigate()

  const handleStartQuiz = () => {
    navigate('/quiz')
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-gray-100">
      <div className="container max-w-4xl mx-auto px-6 text-center">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-light text-gray-900 mb-6 leading-tight">
            Is Your Friend a{' '}
            <span className="font-medium bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Green Flag
            </span>?
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 font-light leading-relaxed max-w-2xl mx-auto">
            Discover if your friends are green, yellow, or red flags through our thoughtfully crafted assessment quiz
          </p>
        </motion.div>


        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-16"
        >
          <Button
            onClick={handleStartQuiz}
            variant="primary"
            className="group relative inline-flex items-center justify-center px-12 py-6 text-lg md:text-xl font-medium text-white bg-gradient-to-r from-green-600 to-emerald-600 rounded-full shadow-lg hover:shadow-xl active:shadow-md transform hover:scale-105 active:scale-95 transition-all duration-300 ease-out focus:outline-none focus:ring-4 focus:ring-green-500/30 min-w-48 min-h-16"
          >
            <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">
              Assess a Friend
            </span>
            <svg 
              className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <div className="absolute inset-0 bg-gradient-to-r from-green-700 to-emerald-700 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Button>
        </motion.div>

        {/* Footer Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center"
        >
          <p className="text-gray-500 mb-6 font-light"><br></br>
            Only 6 questions • Share assessments with screenshots • Honest friend insights
          </p>
          

        </motion.div>
      </div>

      {/* Subtle background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute w-96 h-96 bg-gradient-to-br from-green-200/20 to-emerald-200/20 rounded-full blur-3xl"
          style={{ left: '-10%', top: '10%' }}
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse'
          }}
        />
        
        <motion.div
          className="absolute w-64 h-64 bg-gradient-to-br from-blue-200/20 to-indigo-200/20 rounded-full blur-3xl"
          style={{ right: '-5%', top: '60%' }}
          animate={{
            x: [0, -25, 0],
            y: [0, 15, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: 'reverse',
            delay: 5
          }}
        />
      </div>
    </div>
  )
}

export default HomePage 