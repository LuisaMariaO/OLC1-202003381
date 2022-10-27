import { Instruccion } from '../Abstract/Instruccion';
import Arbol from '../Symbol/Three';
import Simbolo from '../Symbol/Symbol';
import Operacion from '../Expresions/Native'
import tablaSimbolo from '../Symbol/SymbolTable';
import Tipo, {DataType} from '../Symbol/Type';
import Type from '../Symbol/Type';
import Errorr from '../Exceptions/Error'
import { isGeneratorFunction } from 'util/types';

export default class Declaracion extends Instruccion {
    private id: String;
    private tipo: Tipo;
    private valor: Instruccion|null;

    constructor(id: String, tipo: Tipo, valor: Instruccion|null, linea: number, columna: number) {
        super(new Tipo(DataType.INDEFINIDO), linea, columna);
        this.id = id;
        this.tipo = tipo;
        this.valor = valor;
    }

    public interpretar(arbol: Arbol, tabla: tablaSimbolo) {
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
        let busqueda = null
        let tablaActual = tabla
        while(tablaActual!=null){
            busqueda = tablaActual.getValor(this.id)
            if(busqueda!=null){
                break //Si encuentra el valor en algún entorno, actual o anterior, deja de buscar
            }
            tablaActual = tablaActual.getAnterior()
        }
        if(busqueda==null){ //Si no encuentra la variable, la puede declarar, de lo contrario es un eror
        let value = this.valor
        if(value.tipoDato.getTipo() == this.tipo.getTipo()){//Verificando que el tipo de variable concuerde con la expresion
            tabla.setValor(this.id, new Simbolo(this.tipo, this.id, this.valor.interpretar(arbol, tabla)));
        }
        else{
            return new Errorr("->Error Semántico<-","No concuerdan los tipos",this.linea,this.columna)
        }
    }
    else{
        return new Errorr("->Error Semántico<-","la variable -"+this.id+"- ya fue declarada anteriormente",this.linea,this.columna)
    }
    
       
        return null;
    }
}