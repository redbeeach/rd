export interface DesktopItem {
  id: string
  title: string
  icon: string
  type: "folder" | "link"
  url?: string
  children?: DesktopItem[]
}

export const desktopItems: DesktopItem[] = [
  {
    id: "admin-folder",
    title: "관리자",
    icon: "/folder-icon.png",
    type: "folder",
    children: [
      {
        id: "admin-treatments",
        title: "시술 관리",
        icon: "/rang-icon.png",
        type: "link",
        url: "http://localhost:8000/admin/reservations/treatments",
      },
      // 여기 아래로 항목 계속 추가 가능
       {
         id: "another-link",
         title: "홍비 관리자",
         icon: "/rang-icon.png",
         type: "link",
         url: "https://hby1126hh.mycafe24.com/g5/seo_tool/image_tool.php",
       },
    ],
  },
]

export function findItemById(id: string, items: DesktopItem[] = desktopItems): DesktopItem | undefined {
  for (const item of items) {
    if (item.id === id) return item
    if (item.children) {
      const found = findItemById(id, item.children)
      if (found) return found
    }
  }
  return undefined
}