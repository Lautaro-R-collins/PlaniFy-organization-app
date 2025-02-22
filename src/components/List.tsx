import { List as ListType, Task as TaskType } from "@/types"
import BoardOptions from "./BoardOptions";
import BoardWrapper from "./BoardWrapper";
import { Separator } from "./ui/separator";
import { Ellipsis, Plus } from 'lucide-react'
import Task from "./Task";
import { useDragAndDrop } from '@formkit/drag-and-drop/react'
import DropdownMenuOptions from "./DropdownMenuOptions";
import { useEffect, useState } from "react";
import { useBoardsStore } from "@/utils/boards";
import DialogAddTask from "./DialogAddTask";
import { animations } from "@formkit/drag-and-drop";

type Props = {
  list: ListType;
  boardName: string;
}

const List = ({ list, boardName }: Props) => {
  const { updateList, removeList } = useBoardsStore()
  const [title, setTitle] = useState<string>(list.title)
  const [remove, setRemove] = useState<boolean>(false)
  const [todoList, todos, setTodos] = useDragAndDrop<HTMLDivElement, TaskType>(
    list.tasks,
    {
      group: boardName,
      plugins: [animations()] 
    }
  )

  useEffect(() => {
    if (list.tasks.length === todos.length) return

    setTodos(list.tasks)
  }, [list])

  useEffect(() => {
    updateList({
      ...list,
      tasks: todos
    })
  }, [todos])

  useEffect(() => {
    // actualizar la lista
    if (!title) return

    updateList({
      ...list,
      title
    })
  }, [title]) 

  useEffect(() => {
    //borrar la lista
    if (!remove) return

    removeList(list.id)
  }, [remove])

  return (
    <div key={list.id} className="h-fit p-4 bg-primary rounded-lg text-primary-foreground min-w-52 shadow-sm shadow-slate-800">
      <div className="flex flex-col gap-2">
        <BoardWrapper id={`list-name-${list.id}`}>
          <h3 className="font-semibold">{title}</h3>
          <BoardOptions className="p-0">
            <DropdownMenuOptions
              type="list"
              setTitle={setTitle}
              setRemove={setRemove}
            >
              <Ellipsis className="w-full h-full hover:text-primary p-1" size={18} />
            </DropdownMenuOptions>
          </BoardOptions>
        </BoardWrapper>
        <Separator />
        <div ref={todoList} id={`list-${list.id}-tasks`} className="w-full min-h-2 flex flex-col gap-3">
          {todos.map(task => (
            <Task key={task.id} task={task} />
          ))}
        </div>

        <div className="mt-2">
          <BoardWrapper id={`options-list-${list.id}`}>
            <div className="w-full flex items-center justify-between gap-4">
              <h4 className="font-medium">Añadir Tarea</h4>

              <BoardOptions className="p-0">
                <DialogAddTask listId={list.id}>
                  <Plus className="w-full h-full hover:text-primary p-1" />
                </DialogAddTask>
              </BoardOptions>
            </div>
          </BoardWrapper>
        </div>
      </div>
    </div>
  )
}

export default List
