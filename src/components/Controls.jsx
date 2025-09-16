import React from 'react'

export default function Controls({ isRunning, onStartPause, onReset }) {
  return (
    <div className="flex gap-4">
      <button
        onClick={onStartPause}
        className="px-4 py-2 rounded-lg shadow-sm border border-transparent hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-1"
      >
        {isRunning ? 'Pause' : 'Start'}
      </button>

      <button
        onClick={onReset}
        className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-sm"
      >
        Reset
      </button>
    </div>
  )
}