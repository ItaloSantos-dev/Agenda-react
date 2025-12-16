import { useState } from "react"
import { Link } from "react-router-dom";

import "./listarContatos.css"

interface Contato{
    id:number,
    nome:string,
    telefone:string,
    email:string
}

export function ListarContatos(){
    const contato1:Contato={
        id:1,
        nome:"Italo",
        telefone:"xxxxxxxx",
        email:"italo@.com"
    }
    const contato2: Contato = {
        id: 2,
        nome: "Maria",
        telefone:"xxxxxxxx",
        email: "maria@.com"
    }

    const contato3: Contato = {
        id: 3,
        nome: "João",
        telefone:"xxxxxxxx",
        email: "joao@.com"
    }
    
    const [contatos, setContatos]=useState<Contato[]>([contato1, contato2, contato3])
    return(
        
        <ExibirContatos contatos={contatos} setContatos={setContatos} />
    )
}

// function BuscandoContatos(){
//     //acessar api e modificar state
// }



function ExibirContatos(props:any){
    function MaisDetalhes(divId:number){
        let divEscolhida = document.getElementById('divContato'+divId)
        if(divEscolhida?.classList.contains('ocultar')){
            //Fechar as outras
            const todasDivs = document.getElementsByClassName('linha')
            console.log(todasDivs);

            Array.from(todasDivs).forEach((div)=>{
                div.classList.remove('exibir')
                div.classList.add('ocultar')
                

            })
            divEscolhida.classList.remove('ocultar')
            divEscolhida.classList.add('exibir')

        }
        else if (divEscolhida?.classList.contains('exibir')){
            divEscolhida.classList.remove('exibir')
            divEscolhida.classList.add('ocultar')
        }
        
    }
    return(
        <>
        <div className="container">
            <div className="row">
                <div className="col"><h1 className="text-center">Contatos</h1></div>
                <div className="col-1">
                    <Link to="/novoContato" className="bi bi-bookmark-plus-fill btn btn-primary mt-2"></Link>
                </div>
            </div>
        </div>
            <div className="">
                {
                    props.contatos.map((c:Contato)=>(
                        <div id={"divContato"+c.id} key={c.id} className={"container text-center border shadow p-2 divContato mt-2 mb-2 linha ocultar"}>
                            <div className="row">
                                <div className="col"><h3>{c.nome}</h3></div>
                                <div className="col">
                                <button title="Ver mais" onClick={()=>MaisDetalhes(c.id)} className="bi bi-arrow-down btn btn-primary"></button>
                            </div>

                            </div>
                            <div className="row mt-2 mb-2 ">
                                <div className="col-6"><h3>ID: {c.id}</h3></div>
                            </div>

                            <div className="row mt-2 mb-2">
                                <div className="col-6"><h3>Tel: {c.telefone}</h3></div>
                            </div>
                            <div className="row mt-2 mb-2">
                                <div className="col-6">
                                    <h3>Email: {c.email}</h3>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <button className="btn btn-warning">Editar</button>
                                </div>
                                <div className="col">
                                    <div className="col">
                                        <button className="btn btn-danger">Deletar</button>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    ))
                }
            </div>
        </>
    )
}



