import { Agenda } from "../database/AgendaDB";
import { Contato } from "../models/Contato";

const agendaDb = new Agenda();
export async function FetchContatoApi(endpoint:string, method="GET", body?:any){
    //"/contatos" --getALL
    if(endpoint==="/contatos"){
        if(method==="GET"){
            const contatos = await agendaDb.BuscarContatos();
            return contatos;
        }
        //"/contatos"{post} //Create
        else if(method==="POST"){
            if(body!=null){
                const novoContato = body as Contato;
                await agendaDb.SalvarContato(novoContato);
            }
        }
        //"/contatos/id"{get} --Read
        else if(method=="DELETE"){
            if(body!==null){
                const contatoApagar = body as number;
                await agendaDb.DeletarContato(contatoApagar);
            }
        }
    }
    
    
    //"/contatos/id"{PUT} --Update
    //"/contatos/id"{delete} --Delete
    
}