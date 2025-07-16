import React from 'react'
import { motion } from 'framer-motion'

const Question = ({ question, selectedAnswer, onAnswerSelect, friendName }) => {
  const handleOptionClick = (option) => {
    onAnswerSelect(option)
  }

  // Replace {friendName} placeholder with actual friend name
  const displayQuestion = question.question.replace('{friendName}', friendName || 'Your Friend')

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Question */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800 leading-relaxed">
            {displayQuestion}
          </h2>
        </div>
      </motion.div>

      {/* Answer Options */}
      <div className="space-y-4">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer?.selectedOption?.text === option.text
          
          return (
            <motion.button
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleOptionClick(option)}
              className={`w-full p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                isSelected
                  ? 'bg-green-50 border-green-400 shadow-md'
                  : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-sm'
              } cursor-pointer`}
            >
              <div className="flex items-center justify-between">
                <span className="text-gray-800 font-medium pr-4">
                  {option.text}
                </span>
                
                {/* Selection indicator */}
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                  isSelected
                    ? 'bg-green-500 border-green-500'
                    : 'border-gray-300'
                }`}>
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.button>
          )
        })}
      </div>

      {/* Selection feedback */}
      {selectedAnswer && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-6 text-center"
        >
          <p className="text-green-600 font-medium">
            ✓ Answer selected! Continue to next question
          </p>
        </motion.div>
      )}

      {/* Question category indicator */}
      <div className="mt-6 text-center">
        <span className="inline-block px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-600 font-medium">
          {question.category?.replace(/_/g, ' ').toUpperCase() || 'FRIENDSHIP'}
        </span>
      </div>
    </div>
  )
}

export default Question 