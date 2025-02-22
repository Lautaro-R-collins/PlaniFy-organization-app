import { Separator } from "@/components/ui/separator"
import Header from "./components/Header"
import Aside from "./components/Aside"
// import { Board as BoardType, Theme } from "./types"
import { useState } from "react"
import { ChevronRight, ChevronLeft } from "lucide-react"
import { cn } from "./lib/utils"
import { useUserStore } from "./utils/user"
import SetUserName from "./components/SetUserName"
import { Outlet } from "react-router-dom"

function App() {
  // const board: BoardType = {
  //   id: '1',
  //   title: 'Tablero 1',
  //   lists: [
  //     {
  //       id: '1',
  //       title: 'Lista 1',
  //       tasks: [
  //         { id: '1', title: 'Tarea 1' },
  //         { id: '2', title: 'Tarea 2' },
  //         { id: '3', title: 'Tarea 3' },
  //       ]
  //     },
  //     {
  //       id: '2',
  //       title: 'Lista 2',
  //       tasks: [
  //         { id: '4', title: 'Tarea 4' },
  //         { id: '5', title: 'Tarea 5' },
  //         { id: '6', title: 'Tarea 6' },
  //       ]
  //     },
  //   ],
  //   theme: 'novatrix' as Theme
  // }

  const { user } = useUserStore()
  const [asideOpen, setAsideOpen] = useState(true)

  if (!user || user.length === 0) {
    return (
      <SetUserName children={null} defaultOpen={true} />
    )
  }

  return (
    <div className="flex flex-col h-screen">
      <div id="header" className="w-full">
        <Header />
      </div>

      <main className="flex w-full h-full grow">
        <div
          id="aside-content"
          className={
            cn(
              "transition-all",
              asideOpen
                ? "w-1/3 lg:w-1/4 xl:w-1/5 relative"
                : "w-[2%] bg-background"
            )
          }
        >
          {asideOpen && <Aside />}
          <div
            className={
                asideOpen
                ? "absolute top-[1rem] left-[94%] z-50 bg-foreground text-background rounded-full flex items-center p-1 hover:bg-slate-700"
                : "absolute top-[5rem] left-[0.8%] lg:left-[0.7%] xl:left-[1%] 2xl:left-[1.2%] z-50 bg-foreground text-background rounded-full flex items-center p-1 hover:bg-slate-700"
              }
          >
            <button
              onClick={() => setAsideOpen(
                asideOpen
                ? false
                : true
              )}
            >
              {asideOpen
                ? <ChevronLeft />
                : <ChevronRight />
              }
            </button>
          </div>
        </div>

        <Separator orientation="vertical" />

        <div
          id="content"
          className={
            asideOpen
              ? "w-2/3 lg:w-3/4 xl:w-4/5"
              : "w-full"
          }
        >
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default App
