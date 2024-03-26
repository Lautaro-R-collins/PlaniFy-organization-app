import { DropdownMenuSeparator, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Dispatch, ReactNode, SetStateAction, useState } from "react"
import DialogBoardDelete from "./DialogBoardDelete"
import DialogBoardTheme from "./DialogBoardTheme"
import DialogBoardTitle from "./DialogBoardTitle"
import { Trash2, Settings, Pencil } from 'lucide-react'
import { Theme } from "@/types"



type DropdownMenuBoardOptionsProps = {
  type: 'board',
  setTitle: Dispatch<SetStateAction<string>>,
  setTheme: Dispatch<SetStateAction<Theme>>,
  setRemove: Dispatch<SetStateAction<boolean>>,
  children: ReactNode
}

type DropdownMenuListAndTaskOptionsProps = {
  type: 'list' | 'task',
  setTitle: Dispatch<SetStateAction<string>>,
  setRemove: Dispatch<SetStateAction<boolean>>,
  children: ReactNode
}

type Props = DropdownMenuBoardOptionsProps | DropdownMenuListAndTaskOptionsProps

const DropdownMenuOptionsMap = {
  board: 'Option',
  list: 'List',
  task: 'Task',
}

const DropdownMenuOptions = (props: Props) => {
  const [titleMenuOpen, setTitleMenuOpen] = useState(false)
  const [themeMenuOpen, setThemeMenuOpen] = useState(false)
  const [removeMenuOpen, setRemoveMenuOpen] = useState(false)
  
  return (
    <>
      {
        props.type === 'board' && (
          <DialogBoardTheme open={themeMenuOpen} setOpen={setThemeMenuOpen} setTheme={props.setTheme} />
        )
      }
      <DialogBoardTitle open={titleMenuOpen} setOpen={setTitleMenuOpen} setTitle={props.setTitle} />
      <DialogBoardDelete open={removeMenuOpen} setOpen={setRemoveMenuOpen} setDelete={props.setRemove} />
      
      <DropdownMenu>
      
        <DropdownMenuTrigger asChild>
          {props.children}
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>
            {DropdownMenuOptionsMap[props.type]}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setTitleMenuOpen(true)} className="cursor-pointer">
          <Settings className=" text-lg p-1"/>Rename
          </DropdownMenuItem>
          {
            props.type === 'board' && (
              <DropdownMenuItem onClick={() => setThemeMenuOpen(true)} className="cursor-pointer">
               <Pencil className=" text-lg p-1"/>Change Theme
              </DropdownMenuItem>
            )
          }
          <DropdownMenuItem onClick={() => setRemoveMenuOpen(true)} className="cursor-pointer">
          <Trash2 className="text-red-500 text-lg p-1" /><span className="text-destructive">Remove</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

export default DropdownMenuOptions