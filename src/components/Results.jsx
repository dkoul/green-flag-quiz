import React, { useState, useEffect, useRef } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { calculateScore, getResultMessage, generateShareText } from '../utils/scoreCalculator'
import { getColorForScore, getFlagColors } from '../utils/colorSpectrum'
import { createComponent } from '@lit-labs/react'
import { PfButton } from '@patternfly/elements/pf-button/pf-button.js'
import html2canvas from 'html2canvas'

// Create React components from PatternFly Elements
const Button = createComponent({
  tagName: 'pf-button',
  elementClass: PfButton,
  react: React,
})

const Results = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [showShareOptions, setShowShareOptions] = useState(false)
  const [isCapturing, setIsCapturing] = useState(false)
  const resultsRef = useRef(null)

  // Get answers and friend name from navigation state
  const { answers, totalQuestions, friendName } = location.state || {}

  // Redirect if no answers
  useEffect(() => {
    if (!answers || answers.length === 0) {
      navigate('/')
    }
  }, [answers, navigate])

  if (!answers || answers.length === 0) {
    return null
  }

  // Calculate results
  const result = calculateScore(answers)
  const resultMessage = getResultMessage(result.flag)
  const shareText = generateShareText(result, friendName)
  const spectrumColor = getColorForScore(result.totalScore, result.maxPossible)
  const flagColors = getFlagColors(result.flag)

  // Replace {friendName} placeholder in result messages
  const personalizedResultMessage = {
    title: resultMessage.title.replace('{friendName}', friendName || 'Your Friend'),
    description: resultMessage.description.replace('{friendName}', friendName || 'Your Friend')
  }

  // Screenshot functionality
  const captureScreenshot = async () => {
    if (!resultsRef.current) return null
    
    setIsCapturing(true)
    
    try {
      // Wait a bit for the capturing state to render
      await new Promise(resolve => setTimeout(resolve, 100))
      
      const canvas = await html2canvas(resultsRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true,
        logging: false,
        width: resultsRef.current.scrollWidth,
        height: resultsRef.current.scrollHeight
      })
      
      return canvas.toDataURL('image/png')
    } catch (error) {
      console.error('Error capturing screenshot:', error)
      return null
    } finally {
      setIsCapturing(false)
    }
  }

  // Handle share functionality
  const handleShare = async (platform) => {
    const url = window.location.origin
    const text = shareText.replace(/\n/g, ' ')
    
    if (platform === 'instagram' || platform === 'facebook') {
      // Capture screenshot for image sharing
      const imageDataUrl = await captureScreenshot()
      
      if (imageDataUrl) {
        // Convert data URL to blob
        const response = await fetch(imageDataUrl)
        const blob = await response.blob()
        
        // Create file from blob
        const file = new File([blob], 'quiz-results.png', { type: 'image/png' })
        
        // Try Web Share API first (mobile)
        if (navigator.share && navigator.canShare({ files: [file] })) {
          try {
            await navigator.share({
              title: `${friendName} - Green Flag Quiz Results`,
              text: text,
              url: url,
              files: [file]
            })
            return
          } catch (err) {
            console.log('Web Share failed:', err)
          }
        }
        
        // Fallback: Download the image and show instructions
        const link = document.createElement('a')
        link.download = `${friendName.replace(/\s+/g, '-')}-quiz-results.png`
        link.href = imageDataUrl
        link.click()
        
        setShowShareOptions(true)
      }
    } else {
      // Handle other platforms normally
      switch (platform) {
        case 'twitter':
          const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
          window.open(twitterUrl, '_blank', 'width=550,height=420,scrollbars=yes,resizable=yes')
          break
        
        case 'facebook':
          const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
          window.open(facebookUrl, '_blank', 'width=626,height=436,scrollbars=yes,resizable=yes')
          break
        
        default:
          break
      }
    }
  }

  const copyToClipboard = async () => {
    try {
      const textToCopy = `${shareText}\n\n${window.location.origin}`
      await navigator.clipboard.writeText(textToCopy)
      alert('Results copied to clipboard! You can now paste it anywhere.')
    } catch (err) {
      console.error('Failed to copy:', err)
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = `${shareText}\n\n${window.location.origin}`
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      alert('Results copied to clipboard!')
    }
  }

  const getFlagEmoji = (flag) => {
    const emojis = {
      greenFlag: '🟢',
      yellowFlag: '🟡',
      redFlag: '🔴'
    }
    return emojis[flag] || '❓'
  }

  const getGradientBackground = (flag) => {
    const gradients = {
      greenFlag: 'from-green-400 to-emerald-500',
      yellowFlag: 'from-yellow-400 to-orange-500',
      redFlag: 'from-red-400 to-pink-500'
    }
    return gradients[flag] || gradients.redFlag
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100">
      <div className="container container-md py-8">
        {/* Results Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            Quiz Results for {friendName}
          </h1>
          <p className="text-gray-600">
            Here's what we discovered about {friendName}'s friendship style...
          </p>
        </motion.div>

        {/* Main Result Card */}
        <motion.div
          ref={resultsRef}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-3xl shadow-xl p-6 md:p-8 mb-8"
        >
          {/* Capturing overlay */}
          {isCapturing && (
            <div className="absolute inset-0 bg-blue-50 bg-opacity-50 flex items-center justify-center z-10 rounded-3xl">
              <div className="text-blue-600 font-semibold">Capturing screenshot...</div>
            </div>
          )}

          {/* Score Circle */}
          <div className="text-center mb-6">
            <div className="relative inline-block">
              <div 
                className={`w-32 h-32 rounded-full bg-gradient-to-br ${getGradientBackground(result.flag)} flex items-center justify-center shadow-lg`}
              >
                <div className="text-white text-center">
                  <div className="text-3xl font-bold">{result.percentage}%</div>
                  <div className="text-sm opacity-90">Friend Score</div>
                </div>
              </div>
              
              {/* Flag emoji */}
              <div className="absolute -top-2 -right-2 text-4xl">
                {getFlagEmoji(result.flag)}
              </div>
            </div>
          </div>

          {/* Result Title */}
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              {personalizedResultMessage.title}
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              {personalizedResultMessage.description}
            </p>
          </div>


          {/* Color Spectrum Visualization */}
       

          {/* App URL for sharing */}
          <div className="text-center text-sm text-gray-500 border-t pt-4">
            Take your own quiz at: {window.location.origin}
          </div>
        </motion.div>

        {/* Share Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mb-8"
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Share {friendName}'s Results!
          </h3>
          
          <div className="flex flex-wrap justify-center gap-4 mb-4">
            <Button
              onClick={() => handleShare('instagram')}
              variant="primary"
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full"
            >
              📸 Instagram
            </Button>
            <Button
              onClick={() => handleShare('facebook')}
              variant="primary"
              className="px-6 py-3 bg-blue-600 text-white rounded-full"
            >
              📘 Facebook
            </Button>
            <Button
              onClick={() => handleShare('twitter')}
              variant="secondary"
              className="px-6 py-3 rounded-full"
            >
              🐦 Twitter
            </Button>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            onClick={() => navigate('/quiz')}
            variant="primary"
            className="px-8 py-4 text-lg font-semibold bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-full"
          >
            🔄 Quiz Another Friend
          </Button>
          
          <Button
            onClick={() => navigate('/')}
            variant="secondary"
            className="px-8 py-4 text-lg font-semibold rounded-full"
          >
            🏠 Back to Home
          </Button>
        </motion.div>

        {/* Fun Facts */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-8 text-center"
        >
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h4 className="font-semibold text-gray-800 mb-2">Did you know?</h4>
            <p className="text-gray-600 text-sm">
              Research shows that good friendships can increase your lifespan by up to 50%! 
              Keep nurturing those green flag friendships! 💪
            </p>
          </div>
        </motion.div>
      </div>

      {/* Share Instructions Modal */}
      {showShareOptions && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 max-w-md mx-4"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Share {friendName}'s Results!
            </h3>
            <p className="text-gray-600 mb-4">
              The image has been downloaded! You can now:
            </p>
            <div className="space-y-3 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <span className="mr-2">📸</span>
                <span>Upload the image to Instagram or Facebook</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <span className="mr-2">📱</span>
                <span>Add it to your story or feed</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <span className="mr-2">👥</span>
                <span>Tag {friendName} and challenge other friends!</span>
              </div>
            </div>
            <div className="text-center mb-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-700 font-medium">
                {friendName}'s results: <strong>{personalizedResultMessage.title}</strong>
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <Button
                onClick={copyToClipboard}
                variant="primary"
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-full"
              >
                Copy Quiz Link
              </Button>
              <Button
                onClick={() => setShowShareOptions(false)}
                variant="secondary"
                className="w-full rounded-full"
              >
                Close
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default Results 