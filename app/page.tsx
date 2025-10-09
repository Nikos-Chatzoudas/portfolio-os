"use client"
import Desktop from "@/components/desktop"
import Taskbar from "@/components/taskbar"
import WindowManager from "@/components/window-manager"
import { WindowProvider } from "@/contexts/window-context"

export default function Home() {
  return (
    <WindowProvider>
      <div className="h-screen w-screen flex flex-col overflow-hidden select-none">
        <Desktop />
        <WindowManager />
        <Taskbar />
      </div>
    </WindowProvider>
  )
}
