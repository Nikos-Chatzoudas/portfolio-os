"use client"

import { useWindows } from "@/contexts/window-context"
import Window from "./window"
import ShowcaseApp from "./apps/showcase-app"
import GamesApp from "./apps/games-app"
import AboutApp from "./apps/about-app"
import TerminalApp from "./apps/terminal-app"

export default function WindowManager() {
  const { windows } = useWindows()

  const getAppContent = (type: string) => {
    switch (type) {
      case "showcase":
        return <ShowcaseApp />
      case "games":
        return <GamesApp />
      case "about":
        return <AboutApp />
      case "terminal":
        return <TerminalApp />
      default:
        return null
    }
  }

  return (
    <>
      {windows.map((window) => (
        <Window key={window.id} window={window}>
          {getAppContent(window.type)}
        </Window>
      ))}
    </>
  )
}
