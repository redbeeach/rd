"use client"

import type React from "react"

import { useState } from "react"

interface NotesProps {
  isDarkMode?: boolean
}

export default function Notes({ isDarkMode = true }: NotesProps) {
  // Update the notes state with enhanced content
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: "About Me",
      content: `# 윤홍비
Web Publisher / Frontend Developer

## Skills
### Frontend / Publishing
- HTML / CSS / JavaScript
- jQuery / GSAP / Swiper
- React / TypeScript
- Tailwind CSS
- 반응형 웹 퍼블리싱

### CMS / Backend
- Gnuboard5 (5년+)
- Gnuboard7 (Laravel 기반)
- PHP / MySQL
- Laravel

### SEO & 디지털마케팅
- 301 리다이렉트 / Pretty URL
- Schema / JSON-LD (E-E-A-T)
- 사이트맵 자동 생성
- 클라이언트向 SEO 리포트 대응
- 의료(YMYL) 광고주 사이트 구축 경험

### Hosting & Tools
- Cafe24 / Gabia
- Git / GitHub
- Laragon (로컬 개발 환경)
- SQL (SQLD 자격 취득 준비)

## Experience
디지털 에이전시에서 파트장으로 근무하며 프론트엔드 퍼블리싱과
CMS 기반 사이트 구축을 담당. Gnuboard5/Gnuboard7(GB7)을 중심으로
5년 이상의 실무 경험을 쌓았고, 현재는 Laravel + React/TypeScript
기반의 풀스택 개발로 영역을 확장 중.

여러 클라이언트(의료, 치과, 미용 등)의 CMS 사이트를 관리하며
.htaccess 라우팅, 소셜 로그인 연동, SMS API 연동, SEO 대응 등
다양한 실무 경험을 보유.

## Contact
GitHub: github.com/redbeeach`,
      date: "Today, 10:30 AM",
    },
    {
      id: 2,
      title: "Learning Goals",
      content: `# Learning Goals

## 커리어 & 성장
- 풀스택 개발자로서의 역량 확장 (Laravel + React/TypeScript)
- 포트폴리오 프로젝트(루미에르 피부과, macOS 포트폴리오) 완성도 높이기
- SQLD 자격증 취득 및 SQL 역량 강화
- 새로운 회사/포지션 탐색 및 이직 준비

## 기술 스킬
- GB7(Gnuboard7) 심화 — JSON 레이아웃, 모달/액션 패턴 숙달
- React / TypeScript 실전 활용 능력 강화
- Laravel 백엔드 설계 및 API 구조화
- Git 협업 워크플로우 익히기 (브랜치 전략, PR 등)

## 개인 프로젝트
- macOS 스타일 포트폴리오 사이트 완성 (Vercel 배포)
- 클리닉 예약 시스템(루미에르 피부과) 풀스택 구현
- 기존 GB5 프로젝트 경험을 GB7/Laravel 기반으로 재구성

## 학습 방식
- 튜토리얼보다 실제 프로젝트 완성에 집중
- 작업 자동화 워크플로우(template:update, npm run build 등) 익히기
- 실무에서 마주친 문제를 기록하고 정리하는 습관 유지`,
      date: "Yesterday, 3:15 PM",
    },
  ])

  const [selectedNoteId, setSelectedNoteId] = useState(1)
  const [editableContent, setEditableContent] = useState("")

  const selectedNote = notes.find((note) => note.id === selectedNoteId)

  const handleNoteSelect = (id: number) => {
    setSelectedNoteId(id)
    const note = notes.find((n) => n.id === id)
    if (note) {
      setEditableContent(note.content)
    }
  }

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditableContent(e.target.value)

    // Update the note content
    setNotes(
      notes.map((note) => {
        if (note.id === selectedNoteId) {
          return { ...note, content: e.target.value }
        }
        return note
      }),
    )
  }

  const textColor = isDarkMode ? "text-white" : "text-gray-800"
  const bgColor = isDarkMode ? "bg-gray-900" : "bg-white"
  const sidebarBg = isDarkMode ? "bg-gray-800" : "bg-gray-100"
  const borderColor = isDarkMode ? "border-gray-700" : "border-gray-200"
  const hoverBg = isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"
  const selectedBg = isDarkMode ? "bg-gray-700" : "bg-gray-300"

  return (
    <div className={`flex h-full ${bgColor} ${textColor}`}>
      {/* Sidebar */}
      <div className={`w-64 ${sidebarBg} border-r ${borderColor} flex flex-col`}>
        <div className="p-3 border-b border-gray-700 flex justify-between items-center">
          <h2 className="font-medium">Notes</h2>
          <button className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <div className="overflow-y-auto flex-1">
          {notes.map((note) => (
            <div
              key={note.id}
              className={`p-3 cursor-pointer ${selectedNoteId === note.id ? selectedBg : hoverBg}`}
              onClick={() => handleNoteSelect(note.id)}
            >
              <h3 className="font-medium truncate">{note.title}</h3>
              <p className="text-xs text-gray-500 mt-1">{note.date}</p>
              <p className={`text-sm mt-1 truncate ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                {note.content.split("\n")[0].replace(/^#+ /, "")}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Note content */}
      <div className="flex-1 flex flex-col">
        {selectedNote && (
          <>
            <div className={`p-3 border-b ${borderColor}`}>
              <h2 className="font-medium">{selectedNote.title}</h2>
              <p className="text-xs text-gray-500">{selectedNote.date}</p>
            </div>
            <div className="flex-1 p-4 overflow-auto">
              <textarea
                className={`w-full h-full resize-none ${bgColor} ${textColor} focus:outline-none`}
                value={selectedNote.content}
                onChange={handleContentChange}
              />
            </div>
          </>
        )}
      </div>
    </div>
  )
}