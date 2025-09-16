import React from 'react'

export default function ProgressBar({ progress = 0, mode = 'work' }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm font-medium">{mode === 'work' ? 'Work' : 'Break'}</div>
        <div className="text-sm text-slate-500">{progress}%</div>
      </div>

      <div
        className="w-full bg-gray-200 rounded-full h-3 overflow-hidden"
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{ width: `${progress}%`, background: mode === 'work' ? 'linear-gradient(90deg,#ef4444,#fb923c)' : 'linear-gradient(90deg,#60a5fa,#7c3aed)' }}
        />
      </div>
    </div>
  )
}