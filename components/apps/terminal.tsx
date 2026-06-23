"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"

interface TerminalProps {
  isDarkMode?: boolean
}

export default function Terminal({ isDarkMode = true }: TerminalProps) {
  const [input, setInput] = useState("")
  const [history, setHistory] = useState<string[]>([])
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  // Terminal is always dark
  const bgColor = "bg-black"
  const textColor = "text-green-400"

  useEffect(() => {
    // Focus input when terminal is clicked
    const handleClick = () => {
      inputRef.current?.focus()
    }

    const terminal = terminalRef.current
    if (terminal) {
      terminal.addEventListener("click", handleClick)

      // Initial welcome message
      setHistory([
        "Last login: " + new Date().toLocaleString(),
        "Welcome to macOS Terminal",
        "Type 'help' to see available commands",
        "",
      ])
    }

    return () => {
      if (terminal) {
        terminal.removeEventListener("click", handleClick)
      }
    }
  }, [])

  useEffect(() => {
    // Scroll to bottom when history changes
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && input.trim()) {
      executeCommand(input)
      setCommandHistory((prev) => [...prev, input])
      setHistoryIndex(-1)
      setInput("")
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      navigateHistory(-1)
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      navigateHistory(1)
    }
  }

  const navigateHistory = (direction: number) => {
    if (commandHistory.length === 0) return

    const newIndex = historyIndex + direction

    if (newIndex >= commandHistory.length) {
      setHistoryIndex(-1)
      setInput("")
    } else if (newIndex >= 0) {
      setHistoryIndex(newIndex)
      setInput(commandHistory[commandHistory.length - 1 - newIndex])
    }
  }

  const executeCommand = (cmd: string) => {
    const command = cmd.trim().toLowerCase()
    const args = command.split(" ")
    const mainCommand = args[0]

    // Add command to history
    setHistory((prev) => [...prev, `hongbi@macbook-pro ~ $ ${cmd}`, ""])

    // Process command
    switch (mainCommand) {
      case "help":
        setHistory((prev) => [
          ...prev,
          "Available commands:",
          "  help - Show this help message",
          "  clear - Clear the terminal",
          "  echo [text] - Print text",
          "  date - Show current date and time",
          "  ls - List files",
          "  whoami - Show current user",
          "  about - About me",
          "  skills - My technical skills",
          "  contact - Contact information",
          "",
        ])
        break

      case "clear":
        setHistory([""])
        break

      case "echo":
        const echoText = args.slice(1).join(" ")
        setHistory((prev) => [...prev, echoText, ""])
        break

      case "date":
        setHistory((prev) => [...prev, new Date().toString(), ""])
        break

      case "ls":
        setHistory((prev) => [
          ...prev,
          "Projects",
          "Resume",
          "Portfolio",
          "GB7-Reservation-System",
          "macOS-Portfolio",
          "",
        ])
        break

      case "whoami":
        setHistory((prev) => [...prev, "hongbi", ""])
        break

      case "about":
        setHistory((prev) => [
          ...prev,
          "┌─────────────────────────────────────┐",
          "│ 윤홍비 (Hongbi Yoon)                 │",
          "│ Web Publisher / Frontend Developer  │",
          "└─────────────────────────────────────┘",
          "",
          "디지털 에이전시에서 파트장으로 근무하며",
          "프론트엔드 퍼블리싱과 CMS 기반 사이트 구축을",
          "담당해왔습니다. Gnuboard5/Gnuboard7(GB7)을",
          "중심으로 5년 이상의 경험을 쌓았고,",
          "최근에는 Laravel + React/TypeScript 기반의",
          "풀스택 개발로 영역을 넓히고 있습니다.",
          "",
          "클라이언트 대응 SEO/디지털마케팅 작업과",
          "의료 광고주向 사이트 구축 경험이 많습니다.",
          "",
        ])
        break

      case "skills":
        setHistory((prev) => [
          ...prev,
          "┌──────────────┐",
          "│   Skills     │",
          "└──────────────┘",
          "",
          "Frontend / Publishing:",
          "• HTML / CSS / JavaScript",
          "• jQuery / GSAP / Swiper",
          "• React / TypeScript",
          "• Tailwind CSS",
          "• 반응형 웹 퍼블리싱",
          "",
          "CMS / Backend:",
          "• Gnuboard5 (5년+)",
          "• Gnuboard7 (Laravel 기반)",
          "• PHP / MySQL",
          "• Laravel",
          "",
          "SEO & 마케팅:",
          "• 301 리다이렉트 / Pretty URL",
          "• Schema / JSON-LD (E-E-A-T)",
          "• 사이트맵 자동 생성",
          "• 클라이언트向 SEO 리포트 대응",
          "",
          "Hosting & Tools:",
          "• Cafe24 / Gabia",
          "• Git / GitHub",
          "• Laragon (로컬 개발 환경)",
          "• SQL (SQLD 개발자 자격증 보유)",
          "",
        ])
        break

      case "contact":
        setHistory((prev) => [
          ...prev,
          "┌─────────┐",
          "│ Contact │",
          "└─────────┘",
          "",
          "GitHub: github.com/redbeeach",
          "",
        ])
        break

      default:
        setHistory((prev) => [
          ...prev,
          `Command not found: ${mainCommand}`,
          'Type "help" to see available commands',
          "",
        ])
    }
  }

  return (
    <div ref={terminalRef} className={`h-full ${bgColor} ${textColor} p-4 font-mono text-sm overflow-auto`}>
      {history.map((line, index) => (
        <div key={index} className="whitespace-pre-wrap">
          {line}
        </div>
      ))}

      <div className="flex">
        <span className="mr-2">hongbi@macbook-pro ~ $</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent outline-none caret-green-400 text-green-400"
          autoFocus
        />
      </div>
    </div>
  )
}