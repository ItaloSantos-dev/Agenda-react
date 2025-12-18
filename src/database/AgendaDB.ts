import Dexie, { type Table } from "dexie";
import { Contato } from "../models/Contato";

export class Agenda extends Dexie{
    contatos:Table<Contato, number>

    constructor(){
        super("Agenda");
        this.version(1).stores({
            contatos:"++id, nome, telefone, email" 
        });
        this.contatos=this.table("contatos");
    }

    async BuscarContatos(){
        return  await this.contatos.toArray();
        console.log(this.contatos);
        
    }

    async SalvarContato(novoContato:Contato){
        await this.contatos.add(novoContato)
    }
    async DeletarContato(id:number){
        await this.contatos.delete(id);
    }
    async EditarContato(id:number,contatoEditado:Contato ){
        
        await this.contatos.update(id, {nome:contatoEditado.nome, email:contatoEditado.email, telefone:contatoEditado.telefone});
    }
}



 


