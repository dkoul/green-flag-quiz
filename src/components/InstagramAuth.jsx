import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'

const InstagramAuth = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    // Get authorization code from URL parameters
    const code = searchParams.get('code')
    const errorParam = searchParams.get('error')
    const errorDescription = searchParams.get('error_description')

    if (errorParam) {
      setError(errorDescription || 'Instagram authentication failed')
      setIsLoading(false)
      return
    }

    if (code) {
      // In a real implementation, you would exchange the code for an access token
      handleAuthCode(code)
    } else {
      setError('No authorization code received')
      setIsLoading(false)
    }
  }, [searchParams])

  const handleAuthCode = async (code) => {
    try {
      setIsLoading(true)
      
      // In a real implementation, this would be:
      // 1. Send the code to your backend
      // 2. Exchange it for an access token
      // 3. Store the token for future use
      
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // For demo purposes, we'll just show success
      setSuccess(true)
      setIsLoading(false)
      
      // Redirect back to results or home after a delay
      setTimeout(() => {
        navigate('/', { replace: true })
      }, 3000)
      
    } catch (err) {
      setError('Failed to authenticate with Instagram')
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full mx-auto mb-4"
          />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Connecting to Instagram...
          </h2>
          <p className="text-gray-600">
            Please wait while we authenticate your account
          </p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex items-center justify-center">
        <div className="text-center max-w-md mx-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-8 shadow-xl"
          >
            <div className="text-6xl mb-4">😔</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Authentication Failed
            </h2>
            <p className="text-gray-600 mb-6">
              {error}
            </p>
            <button
              onClick={() => navigate('/')}
              className="btn btn-primary px-8 py-3"
            >
              Go Home
            </button>
          </motion.div>
        </div>
      </div>
    )
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex items-center justify-center">
        <div className="text-center max-w-md mx-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-8 shadow-xl"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="text-6xl mb-4"
            >
              🎉
            </motion.div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Successfully Connected!
            </h2>
            <p className="text-gray-600 mb-6">
              Your Instagram account has been connected. You can now share your quiz results directly to your Instagram story!
            </p>
            <div className="text-sm text-gray-500">
              Redirecting you back to the app...
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  return null
}

export default InstagramAuth

// Instagram API utility functions (would be in a separate file)
export const instagramAuthUrl = () => {
  const clientId = import.meta.env.VITE_INSTAGRAM_CLIENT_ID
  const redirectUri = import.meta.env.VITE_INSTAGRAM_REDIRECT_URI
  const scope = 'user_profile,user_media'
  
  if (!clientId || !redirectUri) {
    console.error('Instagram client ID or redirect URI not configured')
    return null
  }
  
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: scope,
    response_type: 'code'
  })
  
  return `https://api.instagram.com/oauth/authorize?${params.toString()}`
}

// Example usage in other components:
// const handleInstagramLogin = () => {
//   const authUrl = instagramAuthUrl()
//   if (authUrl) {
//     window.location.href = authUrl
//   } else {
//     alert('Instagram integration not configured')
//   }
// } 