"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export type WindowType = "showcase" | "games" | "about" | "terminal"

export interface WindowState {
  id: string
  type: WindowType
  title: string
  isMinimized: boolean
  isMaximized: boolean
  zIndex: number
  position: { x: number; y: number }
  size: { width: number; height: number }
}

interface WindowContextType {
  windows: WindowState[]
  openWindow: (type: WindowType) => void
  closeWindow: (id: string) => void
  minimizeWindow: (id: string) => void
  maximizeWindow: (id: string) => void
  focusWindow: (id: string) => void
  updateWindowPosition: (id: string, position: { x: number; y: number }) => void
  updateWindowSize: (id: string, size: { width: number; height: number }) => void
}

const WindowContext = createContext<WindowContextType | undefined>(undefined)

export function WindowProvider({ children }: { children: ReactNode }) {
  const [windows, setWindows] = useState<WindowState[]>([])
  const [nextZIndex, setNextZIndex] = useState(100)

  const getWindowTitle = (type: WindowType): string => {
    const titles = {
      showcase: "Showcase",
      games: "Games",
      about: "About",
      terminal: "Terminal",
    }
    return titles[type]
  }

  const openWindow = (type: WindowType) => {
    const existingWindow = windows.find((w) => w.type === type)
    if (existingWindow) {
      focusWindow(existingWindow.id)
      if (existingWindow.isMinimized) {
        minimizeWindow(existingWindow.id)
      }
      return
    }

    const newWindow: WindowState = {
      id: `${type}-${Date.now()}`,
      type,
      title: getWindowTitle(type),
      isMinimized: false,
      isMaximized: false,
      zIndex: nextZIndex,
      position: { x: 100 + windows.length * 30, y: 80 + windows.length * 30 },
      size: { width: 600, height: 400 },
    }

    setWindows([...windows, newWindow])
    setNextZIndex(nextZIndex + 1)
  }

  const closeWindow = (id: string) => {
    setWindows(windows.filter((w) => w.id !== id))
  }

  const minimizeWindow = (id: string) => {
    setWindows(windows.map((w) => (w.id === id ? { ...w, isMinimized: !w.isMinimized } : w)))
  }

  const maximizeWindow = (id: string) => {
    setWindows(windows.map((w) => (w.id === id ? { ...w, isMaximized: !w.isMaximized } : w)))
  }

  const focusWindow = (id: string) => {
    setWindows(windows.map((w) => (w.id === id ? { ...w, zIndex: nextZIndex } : w)))
    setNextZIndex(nextZIndex + 1)
  }

  const updateWindowPosition = (id: string, position: { x: number; y: number }) => {
    setWindows(windows.map((w) => (w.id === id ? { ...w, position } : w)))
  }

  const updateWindowSize = (id: string, size: { width: number; height: number }) => {
    setWindows(windows.map((w) => (w.id === id ? { ...w, size } : w)))
  }

  return (
    <WindowContext.Provider
      value={{
        windows,
        openWindow,
        closeWindow,
        minimizeWindow,
        maximizeWindow,
        focusWindow,
        updateWindowPosition,
        updateWindowSize,
      }}
    >
      {children}
    </WindowContext.Provider>
  )
}

export function useWindows() {
  const context = useContext(WindowContext)
  if (!context) {
    throw new Error("useWindows must be used within WindowProvider")
  }
  return context
}
