import { Agenda } from "../database/AgendaDB";
import { Contato } from "../models/Contato";

interface IBody{
    contato:Contato
}

const agendaDb = new Agenda();
export async function FetchContatoApi(endpoint:string, method="GET", body?:IBody){
    //"/contatos" --getALL
    if(endpoint==="/contatos"){
        
        if(method==="GET" && body===undefined){
            const contatos = await agendaDb.BuscarContatos();
            return contatos;
        }
        //"/contatos"{post} //Create
        else if(method==="POST"){
            if(body!=null){
                const novoContato = body.contato;
                await agendaDb.SalvarContato(novoContato);
            }
        }
        //"/contatos/id"{get} --Read
        else if(method==="GET" && body!==undefined){

        }
        //"/contatos/id"{PUT} --Update
        else if(method==="PUT"){
            if(body!=undefined){
                const contato = body.contato; 
                console.log(contato);
                
                let novoContato:Contato = new Contato(contato.nome, contato.email, contato.telefone);
                const id  = contato.id as number;
                
                agendaDb.EditarContato(id, novoContato);
            }
        }
        //"/contatos/id"{delete} --Delete
        else if(method=="DELETE"){
            if(body!==undefined){
                const contatoApagar = body?.contato.id as number;
                await agendaDb.DeletarContato(contatoApagar);
            }
        }
    }
    
    
    
    
    
}