import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { quizQuestions } from '../data/questions'
import Question from './Question'
import { createComponent } from '@lit-labs/react'
import { PfButton } from '@patternfly/elements/pf-button/pf-button.js'
import { PfTextInput } from '@patternfly/elements/pf-text-input/pf-text-input.js'

// Create React components from PatternFly Elements
const Button = createComponent({
  tagName: 'pf-button',
  elementClass: PfButton,
  react: React,
})

const TextInput = createComponent({
  tagName: 'pf-text-input',
  elementClass: PfTextInput,
  react: React,
})

const Quiz = () => {
  const navigate = useNavigate()
  const [friendName, setFriendName] = useState('')
  const [showNameInput, setShowNameInput] = useState(true)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState([])
  const [isAnimating, setIsAnimating] = useState(false)

  const currentQuestion = quizQuestions[currentQuestionIndex]
  const isLastQuestion = currentQuestionIndex === quizQuestions.length - 1
  const progress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100

  // Handle friend name submission
  const handleFriendNameSubmit = () => {
    if (friendName.trim()) {
      setShowNameInput(false)
    }
  }

  // Handle answer selection
  const handleAnswerSelect = (selectedOption) => {
    if (isAnimating) return

    const newAnswer = {
      questionId: currentQuestion.id,
      selectedOption,
      points: selectedOption.points,
      category: currentQuestion.category
    }

    // Update or add the answer for current question
    const updatedAnswers = [...selectedAnswers]
    const existingAnswerIndex = updatedAnswers.findIndex(
      answer => answer.questionId === currentQuestion.id
    )

    if (existingAnswerIndex >= 0) {
      updatedAnswers[existingAnswerIndex] = newAnswer
    } else {
      updatedAnswers.push(newAnswer)
    }

    setSelectedAnswers(updatedAnswers)
  }

  // Get current selected answer
  const getCurrentSelectedAnswer = () => {
    return selectedAnswers.find(answer => answer.questionId === currentQuestion.id)
  }

  // Handle next question
  const handleNext = () => {
    if (isAnimating) return

    setIsAnimating(true)
    
    setTimeout(() => {
      if (isLastQuestion) {
        // Navigate to results with answers and friend name
        navigate('/results', { 
          state: { 
            answers: selectedAnswers, 
            totalQuestions: quizQuestions.length,
            friendName: friendName
          } 
        })
      } else {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
      }
      setIsAnimating(false)
    }, 300)
  }

  // Handle previous question
  const handlePrevious = () => {
    if (isAnimating || currentQuestionIndex === 0) return

    setIsAnimating(true)
    
    setTimeout(() => {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
      setIsAnimating(false)
    }, 300)
  }

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (showNameInput) {
        if (e.key === 'Enter') {
          handleFriendNameSubmit()
        }
        return
      }

      if (e.key === 'ArrowRight' && getCurrentSelectedAnswer()) {
        handleNext()
      } else if (e.key === 'ArrowLeft') {
        handlePrevious()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [showNameInput, currentQuestionIndex, selectedAnswers, isAnimating])

  const currentSelectedAnswer = getCurrentSelectedAnswer()

  // Friend name input screen
  if (showNameInput) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex items-center justify-center">
        <div className="container max-w-2xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-3xl shadow-xl p-8 md:p-12 text-center"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Let's Talk About Your Friend!
            </h1>
        
            
            <div className="mb-8">
              <TextInput
                value={friendName}
                onInput={(e) => setFriendName(e.target.value)}
                placeholder="Enter your friend's name"
                className="w-full text-lg p-4 border-2 border-gray-300 rounded-full focus:border-green-500 focus:outline-none"
                style={{ fontSize: '18px', padding: '16px 24px' }}
              />
            </div>
            
            <Button
              onClick={handleFriendNameSubmit}
              disabled={!friendName.trim()}
              variant="primary"
              className="px-8 py-4 text-lg font-semibold rounded-full bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              Start Quiz About {friendName || 'Friend'}
            </Button>
            
            <p className="text-sm text-gray-500 mt-6">
              Don't worry, we won't tell them what you said! 🤫
            </p>
          </motion.div>
        </div>
      </div>
    )
  }

  // Quiz questions screen
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100">
      <div className="container container-md py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            Quiz About {friendName} 
          </h1>
          <p className="text-gray-600">
            Question {currentQuestionIndex + 1} of {quizQuestions.length}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <motion.div
              className="bg-gradient-to-r from-green-600 to-emerald-600 h-3 rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Question */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Question
              question={currentQuestion}
              selectedAnswer={currentSelectedAnswer}
              onAnswerSelect={handleAnswerSelect}
              friendName={friendName}
            />
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          <Button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0 || isAnimating}
            variant="secondary"
            className="px-6 py-3 font-semibold rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ← Previous
          </Button>

          <div className="flex space-x-2">
            {quizQuestions.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  index < currentQuestionIndex
                    ? 'bg-green-500'
                    : index === currentQuestionIndex
                    ? 'bg-blue-500'
                    : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          <Button
            onClick={handleNext}
            disabled={!currentSelectedAnswer || isAnimating}
            variant="primary"
            className="px-6 py-3 font-semibold rounded-full bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLastQuestion ? 'See Results' : 'Next'} →
          </Button>
        </div>

        {/* Help Text */}
        <div className="text-center mt-6">
        
        </div>
      </div>
    </div>
  )
}

export default Quiz 