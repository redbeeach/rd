"use client"

import { findItemById, type DesktopItem } from "@/lib/desktop-items"
import type { AppWindow } from "@/types"

interface FolderProps {
  isDarkMode?: boolean
  windowId?: string
  onOpenApp?: (app: AppWindow) => void
}

export default function Folder({ isDarkMode, windowId, onOpenApp }: FolderProps) {
  const item = windowId ? findItemById(windowId) : undefined
  const children = item?.children || []

  const handleOpen = (child: DesktopItem) => {
    if (!onOpenApp) return
    onOpenApp({
      id: child.id,
      title: child.title,
      component: child.type === "folder" ? "Folder" : "IframeApp",
      position: { x: 150 + Math.random() * 100, y: 100 + Math.random() * 100 },
      size: { width: 800, height: 600 },
    })
  }

  return (
    <div className={`p-4 grid grid-cols-4 gap-4 h-full ${isDarkMode ? "text-white" : "text-gray-800"}`}>
      {children.map((child) => (
        <button
          key={child.id}
          onDoubleClick={() => handleOpen(child)}
          className="flex flex-col items-center gap-1 p-2 rounded hover:bg-white/10"
        >
          <img src={child.icon} alt={child.title} className="w-24" />
          <span className="text-xs text-center">{child.title}</span>
        </button>
      ))}
    </div>
  )
}