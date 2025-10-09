"use client"

import { useWindows } from "@/contexts/window-context"
import { useEffect, useState } from "react"

export default function Taskbar() {
  const { windows, focusWindow, minimizeWindow } = useWindows()
  const [time, setTime] = useState("")

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }),
      )
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="h-10 bg-[#c0c0c0] border-t-2 border-[#ffffff] flex items-center px-1 gap-1">
      <button className="win98-button h-8 flex items-center gap-2 font-bold">
        <span className="text-base">👾</span>
        Start
      </button>

      <div className="flex-1 flex gap-1">
        {windows.map((window) => (
          <button
            key={window.id}
            className={`win98-button h-8 max-w-[160px] truncate ${!window.isMinimized ? "border-[#000000] border-[#ffffff]" : ""
              }`}
            onClick={() => {
              if (window.isMinimized) {
                minimizeWindow(window.id)
              }
              focusWindow(window.id)
            }}
          >
            {window.title}
          </button>
        ))}
      </div>

      <div className="win98-inset h-8 px-3 flex items-center text-xs font-mono">{time}</div>
    </div>
  )
}
