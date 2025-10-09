"use client"

import { useWindows, type WindowState } from "@/contexts/window-context"
import { Rnd } from "react-rnd"
import type { ReactNode } from "react"

interface WindowProps {
  window: WindowState
  children: ReactNode
}

export default function Window({ window, children }: WindowProps) {
  const { closeWindow, minimizeWindow, maximizeWindow, focusWindow, updateWindowPosition, updateWindowSize } =
    useWindows()

  if (window.isMinimized) {
    return null
  }

  const position = window.isMaximized ? { x: 0, y: 0 } : window.position

  const size = window.isMaximized ? { width: "100%", height: "calc(100vh - 40px)" } : window.size

  return (
    <Rnd
      position={position}
      size={size}
      onDragStop={(e, d) => {
        if (!window.isMaximized) {
          updateWindowPosition(window.id, { x: d.x, y: d.y })
        }
      }}
      onResizeStop={(e, direction, ref, delta, position) => {
        if (!window.isMaximized) {
          updateWindowSize(window.id, {
            width: Number.parseInt(ref.style.width),
            height: Number.parseInt(ref.style.height),
          })
          updateWindowPosition(window.id, position)
        }
      }}
      minWidth={300}
      minHeight={200}
      bounds="parent"
      dragHandleClassName="win98-title-bar"
      style={{ zIndex: window.zIndex }}
      disableDragging={window.isMaximized}
      enableResizing={!window.isMaximized}
      onMouseDown={() => focusWindow(window.id)}
    >
      <div className="win98-window h-full flex flex-col">
        <div className="win98-title-bar">
          <div className="flex items-center gap-2">
            <span className="text-xs">📄</span>
            <span>{window.title}</span>
          </div>
          <div className="flex gap-1">
            <button
              className="w-4 h-4 bg-[#c0c0c0] border border-white flex items-center justify-center text-[8px] font-bold"
              onClick={() => minimizeWindow(window.id)}
            >
              _
            </button>
            <button
              className="w-4 h-4 bg-[#c0c0c0] border border-white flex items-center justify-center text-[8px] font-bold"
              onClick={() => maximizeWindow(window.id)}
            >
              □
            </button>
            <button
              className="w-4 h-4 bg-[#c0c0c0] border border-white flex items-center justify-center text-[8px] font-bold"
              onClick={() => closeWindow(window.id)}
            >
              ✕
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-auto bg-white">{children}</div>
      </div>
    </Rnd>
  )
}
