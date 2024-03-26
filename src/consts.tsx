import { ThemeOptionType } from "./components/Board";
import { 
  Novatrix,
  Lumiflex,
  Opulento,
  Tranquiluxe,
  Velustro
} from 'uvcanvas'

export const themes: ThemeOptionType[] = [
  
  {
    id: 'lumiflex',
    component: <Lumiflex />,
  },

  {
    id: 'velustro',
    component: <Velustro />,
  },
  {
    id: 'opulento',
    component: <Opulento />,
  
  },
  {
    id: 'tranquiluxe',
    component: <Tranquiluxe />,
  },
  {
    id: 'novatrix',
    component: <Novatrix />,
  }
]