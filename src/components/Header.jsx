import React from 'react'

export default function Header({ cycles = 0 }) {
  return (
    <header className="flex items-center justify-between">
      <h1 className="text-xl font-semibold">Pomodoro Timer</h1>
      <div className="text-sm text-slate-500">Done: <span className="font-medium">{cycles}</span></div>
    </header>
  )
}