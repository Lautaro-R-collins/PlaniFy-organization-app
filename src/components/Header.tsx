import { NotebookPen } from 'lucide-react'

const Header = () => {
  return (
    <header className="w-full h-16 bg-foreground text-background flex items-center p-4 gap-1 shadow-lg">
      < NotebookPen size={24} />
      <h1 className="font-medium h-full leading-[1.9rem] text-2xl">PlaniFy</h1>
    </header>
  )
}

export default Header
