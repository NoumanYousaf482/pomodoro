import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import Timer from './components/Timer'
import ProgressBar from './components/ProgressBar'
import Controls from './components/Controls'

export default function App() {
  const [workMinutes, setWorkMinutes] = useState(25)
  const [breakMinutes, setBreakMinutes] = useState(5)

  const [mode, setMode] = useState('work') // 'work' or 'break'
  const [timeLeft, setTimeLeft] = useState(workMinutes * 60)
  const [isRunning, setIsRunning] = useState(false)
  const [cycles, setCycles] = useState(0)

  // Reset time when durations change (but only if not running)
  useEffect(() => {
    if (!isRunning) {
      setTimeLeft(workMinutes * 60)
      setMode('work')
      setCycles(0)
    }
  }, [workMinutes, breakMinutes])

  // Tick effect
  useEffect(() => {
    if (!isRunning) return

    if (timeLeft <= 0) {
      if (mode === 'work') {
        setCycles(c => c + 1)
        setMode('break')
        setTimeLeft(breakMinutes * 60)
      } else {
        setMode('work')
        setTimeLeft(workMinutes * 60)
      }
      return
    }

    const timerId = setTimeout(() => setTimeLeft(t => t - 1), 1000)
    return () => clearTimeout(timerId)
  }, [isRunning, timeLeft, mode, workMinutes, breakMinutes])

  const total = mode === 'work' ? workMinutes * 60 : breakMinutes * 60
  const progress = Math.round(((total - timeLeft) / total) * 100)

  function handleStartPause() {
    setIsRunning(r => !r)
  }

  function handleReset() {
    setIsRunning(false)
    setMode('work')
    setTimeLeft(workMinutes * 60)
    setCycles(0)
  }

  // Helper for animated background
  function getBgClass(progress) {
    if (progress < 25) {
      return 'bg-gradient-to-br from-rose-100 to-orange-100 animate-pulse'
    } else if (progress < 50) {
      return 'bg-gradient-to-br from-yellow-100 to-green-100 animate-[pulse_2s_ease-in-out_infinite]'
    } else if (progress < 75) {
      return 'bg-gradient-to-br from-blue-100 to-indigo-100 animate-[pulse_1.5s_ease-in-out_infinite]'
    } else {
      return 'bg-gradient-to-br from-purple-100 to-pink-100 animate-[pulse_1s_ease-in-out_infinite]'
    }
  }

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-700 ${getBgClass(
        progress
      )}`}
    >
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6">
        <Header cycles={cycles} />

        {/* Time settings */}
        <div className="flex gap-4 mt-6">
          <div className="flex flex-col flex-1">
            <label className="text-sm text-slate-600">Work (min)</label>
            <input
              type="number"
              min="1"
              value={workMinutes}
              onChange={(e) => setWorkMinutes(Number(e.target.value))}
              className="border rounded-lg p-2 text-center"
            />
          </div>
          <div className="flex flex-col flex-1">
            <label className="text-sm text-slate-600">Break (min)</label>
            <input
              type="number"
              min="1"
              value={breakMinutes}
              onChange={(e) => setBreakMinutes(Number(e.target.value))}
              className="border rounded-lg p-2 text-center"
            />
          </div>
        </div>

        {/* Timer + Progress + Controls */}
        <main className="mt-6">
          <div className="flex flex-col items-center gap-6">
            <div className="w-full">
              <ProgressBar progress={progress} mode={mode} />
            </div>

            <Timer timeLeft={timeLeft} mode={mode} />

            <Controls
              isRunning={isRunning}
              onStartPause={handleStartPause}
              onReset={handleReset}
            />
          </div>
        </main>
      </div>
    </div>
  )
}
