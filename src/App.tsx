import { Link } from "react-router-dom";

export function App() {
  return (
    <div className="container min-vh-100 d-flex justify-content-center align-items-center">
      <div className="card shadow-lg p-4" style={{ maxWidth: "600px", width: "100%" }}>
        
        <div className="card-body text-center">
          
          <div className="d-flex justify-content-center align-items-center gap-3 mb-4">
            <h1 className=" m-0 text-dark">Agenda em React</h1>
            <img width="45" height="45" src="https://img.icons8.com/?size=80&id=t5K2CR8feVdX&format=gif" alt="React"
            />
          </div>
          <Link to="/contatos"className="btn btn-dark btn-lg px-4">Listar contatos</Link>
        </div>
      </div>
    </div>
  )
}



