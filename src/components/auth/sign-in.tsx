"use client"

import Link from "next/link"
import { motion, MotionConfig } from "motion/react"
import { useState, useEffect, useRef, use } from "react"
import { signIn } from "next-auth/react"
import NumberFlow, { useCanAnimate } from "@number-flow/react"
import { toast } from "sonner"
import { usePathname, useSearchParams, useRouter } from "next/navigation"

// Add type for custom CSS properties
type CustomCSSProperties = React.CSSProperties & {
  '--number-flow-char-height'?: string;
  '--number-flow-mask-height'?: string;
};

export default async function SignIn() {
  const [isLoading, setIsLoading] = useState(false)
  const [userCount, setUserCount] = useState<number>(100)
  const [actualUserCount, setActualUserCount] = useState<number>(888)
  const canAnimate = useCanAnimate()
  const [isHovered, setIsHovered] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const animationTimeoutRef = useRef<NodeJS.Timeout>()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()

  const redirectTo = searchParams.get('callbackUrl')

  useEffect(() => {
    if (redirectTo) {
      router.push(redirectTo)
    }
  }, [redirectTo])

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const response = await fetch('/api/user-count')
        const data = await response.json()
        console.log(data)
        setTimeout(() => {
          setUserCount(data.count)
          setActualUserCount(data.count)
        }, 700)
      } catch (error) {
        console.error('Failed to fetch user count:', error)
        setUserCount(1)
        setActualUserCount(1)
      }
    }

    fetchUserCount()
  }, [])

  const handleSignIn = async () => {
    try {
      setIsLoading(true)
      const result = await signIn("google", { 
        redirectTo: "/",
        redirect: true 
      })
      
      if (result?.error) {
        toast.error("Failed to sign in")
      }
    } catch (error) {
      console.error("Sign in error:", error)
      toast.error("An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const handleNumberClick = () => {
    // if (isAnimating) return

    setIsAnimating(true)
    const calcRandomUnder1000 = Math.floor(Math.random() * 1000)
    setUserCount(calcRandomUnder1000)

    // Clear any existing timeout
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current)
    }

    // Set new timeout to reset to actual count
    animationTimeoutRef.current = setTimeout(() => {
      setUserCount(actualUserCount)
      setIsAnimating(false)
    }, 1600)
  }

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current)
      }
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.645, 0.045, 0.355, 1] }}
      className="min-h-screen bg-[#1D1D1B] relative overflow-hidden"
    >
      {/* Background Shape with subtle animation */}
      <motion.div
        className="absolute inset-0"
        initial={{ y: -10, opacity: 0.8 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 1.2,
          ease: "easeOut",
          delay: 0.2
        }}
      >
        <motion.div
          className="absolute top-0 inset-x-0 h-[70%] bg-[#E86C3C]"
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.4, ease: [0.25, 0.1, 0.25, 1] }}
        />
        <motion.div
          className="absolute bottom-0 inset-x-0 h-[40%] bg-[#1D1D1B] rounded-t-[100%]"
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 1.2, ease: "circOut", delay: 0.1 }}
        />
      </motion.div>

      {/* Content Container */}
      <div className="relative min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8">
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.8,
            ease: [0.25, 0.1, 0.25, 1],
            delay: 0.3
          }}
          className="w-full max-w-screen-xl grid grid-cols-1 lg:grid-cols-[300px,1fr] gap-6 md:gap-8 lg:gap-12 bg-[#F5F5DC] rounded-[20px] sm:rounded-[30px] md:rounded-[40px] p-6 sm:p-8 md:p-10 lg:p-12"
        >
          {/* Left Column - Navigation */}
          <div className="space-y-6 sm:space-y-8 lg:space-y-12">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className="font-serif text-xl sm:text-2xl tracking-tight text-[#1D1D1B] cursor-pointer"
            >
              staz
            </motion.div>

            {/* Number */}
            <motion.div
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
                delay: 0.5
              }}
              className="font-serif text-[80px] sm:text-[100px] lg:text-[120px] leading-none text-[#1D1D1B]"
            >
              <MotionConfig
                transition={{
                  layout: canAnimate 
                    ? { duration: 0.9, bounce: 0, type: 'spring' } 
                    : { duration: 0 }
                }}
              >
                <motion.div
                  onHoverStart={() => setIsHovered(true)}
                  onHoverEnd={() => setIsHovered(false)}
                  onClick={handleNumberClick}
                  // whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="cursor-pointer"
                >
                  <motion.div layout>
                    <NumberFlow
                      value={userCount}
                      trend={0}
                      digits={{ 1: { max: 9 }, 2: { max: 9 }, 3: { max: 9 } }}
                      format={{ minimumIntegerDigits: 3 }}
                      transformTiming={{ 
                        duration: isAnimating ? 450 : (isHovered ? 650 : 850), 
                        easing: 'cubic-bezier(0.4, 0.0, 0.2, 1)' 
                      }}
                      spinTiming={{ 
                        duration: isAnimating ? 250 : (isHovered ? 450 : 650), 
                        easing: 'cubic-bezier(0.4, 0.0, 0.2, 1)' 
                      }}
                      opacityTiming={{ 
                        duration: isAnimating ? 200 : (isHovered ? 300 : 400), 
                        easing: 'cubic-bezier(0.0, 0.0, 0.2, 1)' 
                      }}
                      className="tabular-nums select-none"
                    />
                  </motion.div>
                </motion.div>
              </MotionConfig>
            </motion.div>
          </div>

          {/* Right Column - Content */}
          <div className="flex flex-col justify-between py-6 sm:py-8 lg:py-12">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-8 sm:space-y-10 lg:space-y-12"
            >
              <div className="space-y-4 sm:space-y-6">
                <motion.h1
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="font-serif text-3xl sm:text-4xl text-[#1D1D1B]"
                >
                  {/* some nice text to proceed login 5 unique variants */}
                 Welcome to staz
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="text-neutral-600 max-w-md text-sm sm:text-base"
                >
                  Sign in to access your bookmark manager and organize your digital world.
                </motion.p>
              </div>

              {/* Auth Button */}
              <div className="max-w-md w-full">
                <motion.button
                  whileHover={{ scale: 1.01, backgroundColor: "rgba(29, 29, 27, 0.95)" }}
                  whileTap={{ scale: 0.99 }}
                  onClick={handleSignIn}
                  disabled={isLoading}
                  transition={{ duration: 0.2 }}
                  className="w-full bg-[#1D1D1B] hover:bg-[#1D1D1B]/90 text-white h-11 sm:h-12 rounded-full flex items-center justify-center gap-2 transition-all text-sm sm:text-base disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                  ) : (
                    <>
                      <svg viewBox="0 0 24 24" className="h-4 w-4 sm:h-5 sm:w-5" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                      </svg>
                      Continue with Google
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>

            {/* Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex items-center justify-between pt-8 mt-8 sm:pt-10 sm:mt-10 lg:pt-12 lg:mt-12 border-t border-neutral-200"
            >
              <div className="font-serif text-sm sm:text-base text-[#1D1D1B]">2024</div>
              <div className="font-serif text-xs sm:text-sm text-neutral-500">Powered by Reactopia</div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
} 