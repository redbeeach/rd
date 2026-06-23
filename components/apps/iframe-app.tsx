"use client"

import { findItemById } from "@/lib/desktop-items"

interface IframeAppProps {
  isDarkMode?: boolean
  windowId?: string
}

export default function IframeApp({ windowId }: IframeAppProps) {
  const item = windowId ? findItemById(windowId) : undefined

  if (!item?.url) {
    return <div className="p-4">URL이 없습니다.</div>
  }

  return <iframe src={item.url} className="w-full h-full border-0" title={item.title} />
}