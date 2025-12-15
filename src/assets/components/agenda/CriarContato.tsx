import { useState } from "react"

export function CriarContato(){
    const [nome, setNome] = useState('')
    const [telefone, setTelefone] = useState('')
    const [email, setEmail] = useState('')

    function SalvarContato(e:any){
        e.preventDefault();
        console.log("Os dados vai ser salvo pae")
        setNome('')
        setTelefone('')
        setEmail('')
    }

    return(
        <>
            <div className="container text-center">
                <div className="row">
                    <div className="col"><h1>Novo contato</h1></div>
                </div>
            </div>
            <form onSubmit={SalvarContato}>
                <div className="container text-center border shadow">
                    <div className="row mt-2">
                        <div className="col">
                            <label className="form-label alert alert-primary w-25" htmlFor="nome"><h3>Nome:</h3></label>
                            <br />
                            <input id="nome" name="nome" className="form-control" type="text" value={nome} onChange={(e)=>setNome(e.target.value)}/>
                        </div>
                    </div>

                    <div className="row mt-2">
                        <div className="col">
                            <label htmlFor="telefone" className="form-label alert alert-primary w-25"><h3>Telefone:</h3></label>
                            <input value={telefone} onChange={(e)=>setTelefone(e.target.value)} id="telefone" name="telefone" type="tel" className="form-control" />
                        </div>
                    </div>

                    <div className="row mt-2">
                        <div className="col"><label htmlFor="email" className="form-label alert alert-primary w-25"><h3>Email:</h3></label>
                        <input type="email" name="email" id="email" className="form-control" value={email} onChange={(e)=>setEmail(e.target.value)} />
                        </div>
                    </div>

                    <div className="row mt-2 mb-2">
                        <div className="col">
                            <button className="btn btn-success" type="submit">Salvar</button>
                        </div>
                    </div>
                </div>
            </form>
            
            
            
        </>
    )
}

