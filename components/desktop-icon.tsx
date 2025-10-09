"use client"

import { useState } from "react"

interface DesktopIconProps {
  icon: string
  label: string
  onDoubleClick: () => void
}

export default function DesktopIcon({ icon, label, onDoubleClick }: DesktopIconProps) {
  const [selected, setSelected] = useState(false)

  return (
    <div
      className={`desktop-icon ${selected ? "selected" : ""}`}
      onClick={() => setSelected(!selected)}
      onDoubleClick={onDoubleClick}
    >
      <div className="text-4xl">{icon}</div>
      <div className="desktop-icon-label">{label}</div>
    </div>
  )
}
