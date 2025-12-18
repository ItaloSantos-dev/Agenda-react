import { useState } from "react"
import { FetchContatoApi } from "../../api/ContatosApi"
import {useNavigate } from "react-router"




export function CriarContato(){
    const [nome, setNome] = useState('')
    const [telefone, setTelefone] = useState('')
    const [email, setEmail] = useState('')
    
    const navigate = useNavigate();
    function irParaContatos(){
        navigate("/contatos");
    }

    async function SalvarContato(e:any){
        e.preventDefault();
        if(nome!=="" && telefone!=="" && email!==""){
            const novoContato = {
                nome:nome,
                email:email,
                telefone:telefone
            }
            const body = {
                contato:novoContato
            }
            
            await FetchContatoApi("/contatos", "POST", body)
            setNome('')
            setEmail('')
            setTelefone('')
            irParaContatos();

            
            
        }
        else{

        }
    }

    return (
    <>
        <div className="container text-center bg-white border shadow rounded w-50 my-4">
            <div className="row justify-content-center ">
                <div className="col-12 col-md-8">
                    <h1 className="fw-bold text-dark">Novo contato</h1>
                </div>
            </div>
        </div>

        <form onSubmit={SalvarContato}>
            <div className="container d-flex justify-content-center">
                <div className="col-12 col-md-8 col-lg-6 bg-light border rounded-4 shadow p-4">

                    <div className="row mb-3">
                        <div className="col text-start">
                            <label
                                className="form-label fw-semibold text-secondary"
                                htmlFor="nome"
                            >
                                Nome
                            </label>
                            <input
                                id="nome"
                                name="nome"
                                className="form-control form-control-lg"
                                type="text"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col text-start">
                            <label
                                htmlFor="telefone"
                                className="form-label fw-semibold text-secondary"
                            >
                                Telefone
                            </label>
                            <input
                                value={telefone}
                                onChange={(e) => setTelefone(e.target.value)}
                                id="telefone"
                                name="telefone"
                                type="tel"
                                className="form-control form-control-lg"
                            />
                        </div>
                    </div>

                    <div className="row mb-4">
                        <div className="col text-start">
                            <label
                                htmlFor="email"
                                className="form-label fw-semibold text-secondary"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="form-control form-control-lg"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col d-grid">
                            <button
                                className="btn btn-success btn-lg fw-semibold"
                                type="submit"
                            >
                                Salvar
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </form>
    </>
)


}

