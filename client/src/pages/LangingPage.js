import React from 'react'
import { HeroSection } from '../components/HeroSection'
import { SignupForm } from '../components/SignUpForm'
import { CountdownTimer } from '../components/CountDownTimer'
import { LoadingStatus } from '../components/LoadingStatus'
export function LandingPage() {
  return (
    <main className="min-h-screen w-full bg-white py-16 md:py-24">
      <div className="container mx-auto space-y-16">
        <HeroSection />
        <SignupForm />
        <LoadingStatus />
        <CountdownTimer />
      </div>
    </main>
  )
}