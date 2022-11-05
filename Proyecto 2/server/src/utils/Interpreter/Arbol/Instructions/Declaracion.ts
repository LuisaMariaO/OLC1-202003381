import { Instruccion } from '../Abstract/Instruccion';
import Arbol from '../Symbol/Three';
import Simbolo from '../Symbol/Symbol';
import Operacion from '../Expresions/Native'
import tablaSimbolo from '../Symbol/SymbolTable';
import Tipo, {DataType} from '../Symbol/Type';
import Type from '../Symbol/Type';
import Errorr from '../Exceptions/Error'
import Nativo from '../Expresions/Native';
import Aritmetico from '../Expresions/Aritmetica';
import Logica from '../Expresions/Logica';
import Relacional from '../Expresions/Relacional';
import Casteo from '../Expresions/Casteo';


export default class Declaracion extends Instruccion {
    private ids: Array<String>;
    private tipo: Tipo;
    private valor: Instruccion|null;

    constructor(ids:Array<String>, tipo: Tipo, valor: Instruccion|null, linea: number, columna: number) {
        super(new Tipo(DataType.INDEFINIDO), linea, columna);
        this.ids=ids
        this.tipo = tipo;
        this.valor = valor;
    }

    public interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        let valorr : any= null
        //TODO: Declaracion de multiples variables
        if(this.valor==null){ //Si no trae valor asignado se le asigna el valor por defecto indicado para cada tipo de dato
            if(this.tipo.getTipo() == DataType.ENTERO){
            this.valor = new Operacion(new Type(DataType.ENTERO),0,this.linea,this.columna)
            }
            else if(this.tipo.getTipo() == DataType.DECIMAL){
                this.valor = new Operacion(new Type(DataType.DECIMAL),0.0,this.linea,this.columna)
            }
            else if(this.tipo.getTipo() == DataType.BOOLEANO){
                this.valor = new Operacion(new Type(DataType.BOOLEANO),"true",this.linea,this.columna)
            }
            else if(this.tipo.getTipo() == DataType.CARACTER){
                this.valor = new Operacion(new Type(DataType.CARACTER),'0',this.linea,this.columna)
            }
            else{
                this.valor = new Operacion(new Type(DataType.CADENA),"",this.linea,this.columna)
            }
        }

        if(this.valor instanceof(Aritmetico) || this.valor instanceof(Logica) || this.valor instanceof(Relacional) || this.valor instanceof(Casteo)){
           
           valorr = this.valor.interpretar(arbol,tabla)
           if(valorr instanceof Errorr){
           
            return valorr
           }
           //console.log(valorr)
           // console.log(valorr)
            this.tipoDato = this.valor.tipoDato

        }
     
        for (let id of this.ids){

        

        let busqueda = null
        let tablaActual = tabla
        while(tablaActual!=null){
            busqueda = tablaActual.getValor(id)
            if(busqueda!=null){
                break //Si encuentra el valor en algún entorno, actual o anterior, deja de buscar
            }
            tablaActual = tablaActual.getAnterior()
        } 
        if(busqueda==null){ //Si no encuentra la variable, la puede declarar, de lo contrario es un eror
        let value = this.valor
      
        if(this.valor instanceof Errorr){
           
            return this.valor
           }

        if(value.tipoDato.getTipo() == this.tipo.getTipo()  ||value.tipoDato.getTipo() == DataType.IDENTIFICADOR){//Verificando que el tipo de variable concuerde con la expresion
            if(value.tipoDato.getTipo() == DataType.IDENTIFICADOR){
              //  console.log(value)
                let jsonaux = JSON.stringify(value).toString()
                let objjson = JSON.parse(jsonaux)
                let idaux = objjson.valor
                let valid:Simbolo = tabla.getSimbolo(idaux) //Un simbolo que representa la expresion identificador
                if(valid==null){
                    return new Errorr("->Error Semántico<-","No se encontró la variable -"+idaux+"-",this.linea,this.columna) 
                }
                
                if(valid.gettipo().getTipo() != this.tipo.getTipo()){
                    return new Errorr("->Error Semántico<-","No concuerdan los tipos",this.linea,this.columna) 
                }
            }
          
            if(valorr==null){
            tabla.setValor(id, new Simbolo(this.tipo, id, this.valor.interpretar(arbol, tabla)),true);
            }
            else{
                tabla.setValor(id, new Simbolo(this.tipo, id, valorr),true);
            }
           
        }
        else{
            return new Errorr("->Error Semántico<-","No concuerdan los tipos",this.linea,this.columna)
        }
    }
    else{
        return new Errorr("->Error Semántico<-","La variable -"+id+"- ya fue declarada anteriormente",this.linea,this.columna)
    }
    
} 
        return null;
    }
}