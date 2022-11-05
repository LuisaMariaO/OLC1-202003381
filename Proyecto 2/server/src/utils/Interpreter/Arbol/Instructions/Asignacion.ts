import { Instruccion } from '../Abstract/Instruccion';
import Arbol from '../Symbol/Three';
import Simbolo from '../Symbol/Symbol';
import tablaSimbolo from '../Symbol/SymbolTable';
import Tipo, {DataType} from '../Symbol/Type';
import Errorr from '../Exceptions/Error'
import Aritmetico from '../Expresions/Aritmetica';
import Logica from '../Expresions/Logica';
import Relacional from '../Expresions/Relacional';
import Casteo from '../Expresions/Casteo';
import IncreDecre from './IncreDecre';

export default class Asignacion extends Instruccion {
    private id: String;
    private valor: Instruccion;

    constructor(id: String, valor: Instruccion, linea: number, columna: number) {
        super(new Tipo(DataType.INDEFINIDO), linea, columna);
        this.id = id;
        this.valor = valor;
    }

    public interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        let valorr:any = null
        let busqueda:Simbolo = tabla.getSimbolo(this.id)
        let tablaActual = tabla
        while(tablaActual!=null){
            busqueda = tablaActual.getSimbolo(this.id)
            if(busqueda!=null){
                break; //Si encuentra el valor en algún entorno, actual o anterior, deja de buscar
            }
            tablaActual = tablaActual.getAnterior()
        }
        if(this.valor instanceof Errorr){
           
            return this.valor
           }
        if(busqueda!=null){
       // console.log(busqueda.tipo.gettipo())
       // console.log(this.valor.tipoDato.getTipo())
       if(this.valor instanceof(Aritmetico) || this.valor instanceof(Logica) || this.valor instanceof(Relacional) || this.valor instanceof(Casteo) || this.valor instanceof(IncreDecre)){
        valorr = this.valor.interpretar(arbol,tabla)
           //console.log(valorr)
           if(valorr instanceof Errorr){
           
            return valorr
           }
            this.tipoDato = this.valor.tipoDato
    }
 
        if(busqueda.gettipo().getTipo() == this.valor.tipoDato.getTipo()||this.valor.tipoDato.getTipo() == DataType.IDENTIFICADOR ){
            let value = this.valor
            if(value.tipoDato.getTipo() == DataType.IDENTIFICADOR){
                //  console.log(value)
                  let jsonaux = JSON.stringify(value).toString()
                  let objjson = JSON.parse(jsonaux)
                  let idaux = objjson.valor
                  let valid:Simbolo = tabla.getSimbolo(idaux) //Un simbolo que representa la expresion identificador
                  if(valid==null){
                      return new Errorr("->Error Semántico<-","No se encontró la variable -"+idaux+"-",this.linea,this.columna) 
                  }
                  
                  if(valid.gettipo().getTipo() != busqueda.gettipo().getTipo()){
                    return new Errorr("->Error Semántico<-","No concuerdan los tipos",this.linea,this.columna) 
                }
              }

         if(valorr==null){
        tabla.setValor(this.id, new Simbolo(this.valor.tipoDato, this.id, this.valor.interpretar(arbol, tabla)),false);
        }
        else{
            tabla.setValor(this.id, new Simbolo(this.valor.tipoDato, this.id, valorr),false)
        }
        }
        else{
           
            return new Errorr("->Error Semántico<-","No concuerdan los tipos",this.linea,this.columna) 
        }
        }
        else{
            return new Errorr("->Error Semántico<-","No se encontró la variable -"+this.id+"-",this.linea,this.columna) 
        }
        return null;
    }
}