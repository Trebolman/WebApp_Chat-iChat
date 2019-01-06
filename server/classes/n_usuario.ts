export class NUsuario{
    public nombre:String;
    public id:string;
    public sala:string;

    constructor(id:string){
        this.id = id;
        this.nombre = "sin nombre";
        this.sala = "sin sala";
    }
}