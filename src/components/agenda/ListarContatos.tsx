import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { FetchContatoApi } from "../../api/ContatosApi";

import "./agenda.css"
import { Contato } from "../../models/Contato";


async function BuscarContatos(setContatos:any){
    const contatosBuscado = await FetchContatoApi("/contatos", "GET") as Contato[];
    setContatos(contatosBuscado)
    
}
export function ListarContatos(){
    const [contatos, setContatos]=useState<Contato[]>([]);

    const [contatoEditar, setContatoEditar] = useState <Contato>();
    
    
    useEffect(()=>{
        BuscarContatos(setContatos)
    },[]);
    

    return(
        <>
        <ExibirContatos contatos={contatos} setContatos={setContatos} setContatoEditar={setContatoEditar}/>
        {contatoEditar && <FormEditarContato contatoEditar={contatoEditar} setContatoEditar={setContatoEditar}  setContatos={setContatos} />}
        </>

    )
}

function ExibirContatos(props:any){
     
    function MaisDetalhes(divId:number){
        let divEscolhida = document.getElementById('divContato'+divId)
        let btnEscolhido = document.getElementById('btnVerMais'+divId)
        if(divEscolhida?.classList.contains('ocultar')){
            //Fechar as outras
            const todasDivs = document.getElementsByClassName('linha')
            Array.from(todasDivs).forEach((div)=>{                    
                div.classList.replace('exibir','ocultar')
                div.getElementsByTagName('button')[0].classList.replace('bi-arrow-up', 'bi-arrow-down')
            })
            btnEscolhido?.classList.replace('bi-arrow-down', 'bi-arrow-up')
            divEscolhida.classList.replace('ocultar','exibir')

        }
        else if (divEscolhida?.classList.contains('exibir')){
            divEscolhida.classList.replace('exibir','ocultar')
            btnEscolhido?.classList.replace('bi-arrow-up', 'bi-arrow-down')

        }
        
    }
    return (
        <>
            <div className="container mb-4">
                <div className="row align-items-center bg-light rounded shadow-sm p-3">
                    <div className="col">
                        <h1 className="text-center text-dark fw-bold m-0">Contatos</h1>
                    </div>

                    <div className="col-1 text-end">
                        <Link to="/novoContato"className="bi bi-bookmark-plus-fill btn btn-dark"title="Novo contato"/>
                    </div>
                </div>
            </div>

           
            <div className="container">
                {
                props.contatos.map((c: Contato) => (
                <div id={"divContato" + c.id} key={c.id} className=" container bg-white border rounded shadow-sm p-3 mt-3 mb-3 divContato linha ocultar ">
                    <div className="row align-items-center border-bottom pb-2 mb-2">

                        <div className="col">
                            <h4 className="fw-semibold text-dark m-0">{c.nome}</h4>
                        </div>

                        <div className="col-auto">
                            <button id={"btnVerMais" + c.id} title="Ver mais" onClick={() => MaisDetalhes(c.id as number)} className="bi bi-arrow-down btn btn-outline-dark btn-sm" />
                        </div>

                    </div>

                    <div className="row mb-2">
                        <div className="col-12 col-md-6 text-muted">
                            <strong>ID:</strong> {c.id}
                        </div>
                    </div>

                    <div className="row mb-2">
                        <div className="col-12 col-md-6">
                            <strong>Tel:</strong> {c.telefone}
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-12 col-md-8">
                            <strong>Email:</strong> {c.email}
                        </div>
                    </div>

                    <div className="row g-2">
                        <div className="col-6">
                            <button onClick={() => props.setContatoEditar(c)} className="btn btn-warning w-100">Editar</button>
                        </div>
                        <div className="col-6"> 
                            <button onClick={() => DeletarContato(c, props.setContatos)} className="btn btn-danger w-100" > Deletar </button>
                        </div>
                    </div>
                </div>
                ))
                }
            </div>
        </>
    )
}

async function DeletarContato(contato:Contato, setContatos:any){
    const body = {
        contato:contato
    }
    await FetchContatoApi("/contatos", "DELETE", body);
    BuscarContatos(setContatos);
}



function FormEditarContato(props:any){

    const contato = props.contatoEditar ;

    const [novoNome, setNovoNome] = useState(contato.nome)
    const [novoTelefone, setNovoTelefone] = useState(contato.telefone)
    const [novoEmail, setNovoEmail] = useState(contato.email)



    async function EditarContato(e:any,){
        e.preventDefault();
        const contatoE:Contato = {
            id:contato.id,
            nome:novoNome,
            email:novoEmail,
            telefone:novoTelefone
        }
        const body = {contato:contatoE}
        console.log(contato);
        
        await FetchContatoApi("/contatos", "PUT", body);
        props.setContatoEditar(undefined)
        BuscarContatos(props.setContatos)
    }


    return(
        <div id="formEditar" className="container text-center w-50  position-absolute translate-middle start-50 top-50 border shadow p-2 bg-light">
            <div className="alert alert-dark ">
                <h3>Editar contato</h3>
            </div>
            <form onSubmit={EditarContato} >
                <div className="row">
                    <div className="col">
                        <label className="form-label" htmlFor="contatoNome">Nome:</label>
                    </div>
                    <div className="col-7">
                        <input className="form-control" type="text" name="contatoNome" id="contatoNome" onChange={(e)=>setNovoNome(e.target.value)} value={novoNome} />
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <label htmlFor="contatoTel" className="form-label">Tel:</label>
                    </div>
                    <div className="col-7">
                        <input type="text" className="form-control" name="contatoTel" id="contatoTel" onChange={(e)=>setNovoTelefone(e.target.value)} value={novoTelefone}/>
                    </div>
                </div>

                <div className="row mt-1 mb-1">
                    <div className="col">
                        <label htmlFor="contatoEmail" className="form-label">Email</label>
                    </div>
                    <div className="col-7">
                        <input type="text" name="contatoEmail" id="contatoEmail" className="form-control" onChange={(e)=>setNovoEmail(e.target.value)} value={novoEmail} />
                    </div>
                </div>

                <div className="row mt-2 mb-1">
                    <div className="col">
                        <button type="submit" className="btn btn-success">Salvar</button>
                    </div>
                </div>

            </form>
        </div>
    )
}



