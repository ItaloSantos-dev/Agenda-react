import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {App} from './App.tsx'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import { ListarContatos } from './components/agenda/ListarContatos.tsx'
import { CriarContato } from './components/agenda/CriarContato.tsx'



const router = createHashRouter([
  //pagina inicial
  {path:"/", element:<App/>},
  //Listar contatos
  {path:"/contatos", element:<ListarContatos />},
  {path:"/novocontato", element:<CriarContato/>},
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
