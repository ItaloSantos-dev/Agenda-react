import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { FetchContatoApi } from "../../api/ContatosApi";

import "./listarContatos.css"
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
                div.classList.remove('exibir')
                div.classList.add('ocultar')
            })
            btnEscolhido?.classList.replace('bi-arrow-down', 'bi-arrow-up')
            divEscolhida.classList.remove('ocultar')
            divEscolhida.classList.add('exibir')

        }
        else if (divEscolhida?.classList.contains('exibir')){
            divEscolhida.classList.remove('exibir')
            divEscolhida.classList.add('ocultar')
            btnEscolhido?.classList.replace('bi-arrow-up', 'bi-arrow-down')

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
                                <button id={"btnVerMais"+c.id} title="Ver mais" onClick={()=>MaisDetalhes(c.id as number)} className="bi bi-arrow-down btn btn-primary"></button>
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
                                    <button onClick={()=>props.setContatoEditar(c)}  className="btn btn-warning">Editar</button>
                                </div>
                                <div className="col">
                                    <div className="col">
                                        <button onClick={()=>DeletarContato(c, props.setContatos)} className="btn btn-danger">Deletar</button>
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
            <div className="alert alert-warning ">
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



