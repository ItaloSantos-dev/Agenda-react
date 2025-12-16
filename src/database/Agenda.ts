import Dexie from "dexie";

interface Contato {
  id?: number;
  nome: string;
  email: string;
  telefone:string;
};

var db = new Dexie("Agenda");

db.version(1).stores({
    contatos:"++id, nome, telefone, email" 
});

const contatosTable = db.table<Contato>("contatos");






