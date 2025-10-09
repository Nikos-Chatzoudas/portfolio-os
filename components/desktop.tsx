"use client"

import { useWindows } from "@/contexts/window-context"
import DesktopIcon from "./desktop-icon"

export default function Desktop() {
  const { openWindow } = useWindows()

  const icons = [
    { type: "showcase" as const, label: "Showcase", icon: "📁" },
    { type: "games" as const, label: "Games", icon: "🎮" },
    { type: "about" as const, label: "About", icon: "💾" },
    { type: "terminal" as const, label: "Terminal", icon: "⌨️" },
  ]

  return (
    <div className="flex-1 p-4 relative">
      <div className="grid grid-cols-[repeat(auto-fill,80px)] gap-4 content-start">
        {icons.map((icon) => (
          <DesktopIcon
            key={icon.type}
            icon={icon.icon}
            label={icon.label}
            onDoubleClick={() => openWindow(icon.type)}
          />
        ))}
      </div>
    </div>
  )
}
