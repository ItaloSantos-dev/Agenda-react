import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {App} from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { ListarContatos } from './assets/components/agenda/ListarContatos.tsx'
import { CriarContato } from './assets/components/agenda/CriarContato.tsx'


const router = createBrowserRouter([
  //pagina inicial
  {path:"/", element:<App/>},
  //Listar contatos
  {path:"/contatos", element:<ListarContatos />},
  {path:"/novocontato", element:<CriarContato/>}
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
