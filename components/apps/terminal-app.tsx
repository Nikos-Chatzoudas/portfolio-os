"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"

interface CommandOutput {
  command: string
  output: string[]
}

export default function TerminalApp() {
  const [history, setHistory] = useState<CommandOutput[]>([
    { command: "", output: ["Windows 98 Terminal [Version 1.0]", 'Type "help" for available commands.', ""] },
  ])
  const [input, setInput] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  const executeCommand = (cmd: string) => {
    const command = cmd.trim().toLowerCase()
    let output: string[] = []

    switch (command) {
      case "help":
        output = [
          "Available commands:",
          "  help      - Show this help message",
          "  whoami    - Display user information",
          "  dir       - List directory contents",
          "  play      - Start a game",
          "  sudo reveal - Reveal a secret",
          "  clear     - Clear the terminal",
          "  about     - About this terminal",
          "  date      - Show current date and time",
          "",
        ]
        break
      case "whoami":
        output = [
          "You are a visitor exploring a nostalgic Windows 98 desktop!",
          "Welcome to the retro computing experience.",
          "",
        ]
        break
      case "dir":
        output = [
          "Directory of C:\\PORTFOLIO",
          "",
          "📁 SHOWCASE    <DIR>     Projects and work samples",
          "🎮 GAMES       <DIR>     Classic DOS games",
          "💾 ABOUT       <DIR>     System information",
          "⌨️ TERMINAL    <DIR>     You are here!",
          "",
          "4 Dir(s)     Unlimited bytes free",
          "",
        ]
        break
      case "play":
        output = [
          "🎮 Loading game...",
          "",
          "   ▄████▄   ▒█████   ███▄    █   ▄████  ██▀███   ▄▄▄     ▄▄▄█████▓  ██████ ",
          "  ▒██▀ ▀█  ▒██▒  ██▒ ██ ▀█   █  ██▒ ▀█▒▓██ ▒ ██▒▒████▄   ▓  ██▒ ▓▒▒██    ▒ ",
          "  ▒▓█    ▄ ▒██░  ██▒▓██  ▀█ ██▒▒██░▄▄▄░▓██ ░▄█ ▒▒██  ▀█▄ ▒ ▓██░ ▒░░ ▓██▄   ",
          "  ▒▓▓▄ ▄██▒▒██   ██░▓██▒  ▐▌██▒░▓█  ██▓▒██▀▀█▄  ░██▄▄▄▄██░ ▓██▓ ░   ▒   ██▒",
          "  ▒ ▓███▀ ░░ ████▓▒░▒██░   ▓██░░▒▓███▀▒░██▓ ▒██▒ ▓█   ▓██▒ ▒██▒ ░ ▒██████▒▒",
          "  ░ ░▒ ▒  ░░ ▒░▒░▒░ ░ ▒░   ▒ ▒  ░▒   ▒ ░ ▒▓ ░▒▓░ ▒▒   ▓▒█░ ▒ ░░   ▒ ▒▓▒ ▒ ░",
          "",
          "You won! 🎉",
          "",
        ]
        break
      case "sudo reveal":
        output = [
          "🔓 Access granted...",
          "",
          "╔═══════════════════════════════════════╗",
          "║  🎊 SECRET UNLOCKED! 🎊              ║",
          "║                                       ║",
          "║  You found the Easter egg!            ║",
          "║                                       ║",
          "║  Here's a secret link:                ║",
          "║  https://youtu.be/dQw4w9WgXcQ        ║",
          "║                                       ║",
          "║  (You know the rules, and so do I)   ║",
          "╚═══════════════════════════════════════╝",
          "",
        ]
        break
      case "clear":
        setHistory([])
        return
      case "about":
        output = [
          "Windows 98 Terminal Emulator",
          "Version 1.0 (Build 1998)",
          "",
          "A nostalgic command-line interface with Easter eggs!",
          "Built with React and TypeScript.",
          "",
        ]
        break
      case "date":
        output = [new Date().toLocaleString(), ""]
        break
      case "":
        output = [""]
        break
      default:
        output = [
          `'${cmd}' is not recognized as an internal or external command.`,
          'Type "help" for available commands.',
          "",
        ]
    }

    setHistory([...history, { command: cmd, output }])
    setInput("")
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      executeCommand(input)
    }
  }

  return (
    <div
      className="h-full bg-black text-white font-mono text-sm p-2 cursor-text flex flex-col"
      onClick={() => inputRef.current?.focus()}
    >
      <div ref={terminalRef} className="flex-1 overflow-auto">
        {history.map((item, i) => (
          <div key={i}>
            {item.command && (
              <div className="flex gap-2">
                <span className="text-green-400">C:\&gt;</span>
                <span>{item.command}</span>
              </div>
            )}
            {item.output.map((line, j) => (
              <div key={j} className="whitespace-pre-wrap">
                {line}
              </div>
            ))}
          </div>
        ))}
        <div className="flex gap-2">
          <span className="text-green-400">C:\&gt;</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none border-none text-white"
            autoFocus
          />
        </div>
      </div>
    </div>
  )
}
