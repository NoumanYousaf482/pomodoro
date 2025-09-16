import React from 'react'

function formatTime(seconds) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

export default function Timer({ timeLeft, mode }) {
  return (
    <div className="flex flex-col items-center">
      <div className="text-sm uppercase text-slate-500">{mode === 'work' ? 'Work' : 'Break'}</div>
      <div className="text-5xl font-mono mt-1">{formatTime(timeLeft)}</div>
    </div>
  )
}