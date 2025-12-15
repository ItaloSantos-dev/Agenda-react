import { ListarContatos } from "./assets/components/agenda/ListarContatos";

export function App() {
 

  return (
    <>
      <div className="text-center alert alert-primary">
        <h1>Agenda em react</h1>
        <img src="https://img.icons8.com/?size=80&id=t5K2CR8feVdX&format=gif" alt="" />
      </div>

      <div className="container text-center">
        <div className="row">
          <div className="col">
            <a className="text-decoration-none text-light btn btn-primary" href="/contatos">Listar contatos</a>
          </div>
        </div>
      </div>
    </>
  )
}


