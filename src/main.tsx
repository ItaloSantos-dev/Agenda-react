import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {App} from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { ListarContatos } from './assets/components/agenda/ListarContatos.tsx'
import { CriarContato } from './assets/components/agenda/CriarContato.tsx'


const router = createBrowserRouter([
  //pagina inicial
  {path:"/Agenda-react", element:<App/>},
  //Listar contatos
  {path:"/Agenda-react/contatos", element:<ListarContatos />},
  {path:"/Agenda-react/novocontato", element:<CriarContato/>}
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
