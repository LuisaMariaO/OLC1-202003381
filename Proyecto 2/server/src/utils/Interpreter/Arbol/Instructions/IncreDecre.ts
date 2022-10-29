import { Instruccion } from '../Abstract/Instruccion';
import Arbol from '../Symbol/Three';
import tablaSimbolo from '../Symbol/SymbolTable';
import Simbolo from '../Symbol/Symbol';
import Tipo, {DataType} from '../Symbol/Type';
import Errorr from '../Exceptions/Error'
import { isGeneratorFunction } from 'util/types';
import Error from '../Exceptions/Error';
import _, { identity } from 'lodash';
import Symbol from '../Symbol/Symbol';
import Aritmetico from '../Expresions/Aritmetica';

export default class IncreDecre extends Instruccion {
    id: String;
    valor:Instruccion
    tipo: tipoOp;

  

  constructor(tipo: tipoOp, valor:Instruccion, id: String,  fila: number, columna: number) {
    super(new Tipo(DataType.INDEFINIDO), fila, columna);
    this.tipo = tipo;
    this.valor=valor;
    this.id=id

  }

  

  interpretar(arbol: Arbol, tabla: tablaSimbolo) {

  


    if(this.valor.tipoDato.getTipo() != DataType.IDENTIFICADOR){
        if(this.valor instanceof Aritmetico){
           this.valor.interpretar(arbol,tabla)
        }
        console.log(this.valor)
        return new Errorr("->Error Semántico<-","INCREMENTO o DECREMENTO inválido",this.linea,this.columna)
    }
        let jsonaux = JSON.stringify(this.valor).toString()
        let objjson = JSON.parse(jsonaux)
        this.id = objjson.valor
   
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
        console.log(busqueda)
        if(busqueda!=null){
            valorr = Number(busqueda.getvalor())
            
            if(!isNaN(valorr)){
                this.tipoDato.setTipo(busqueda.gettipo().getTipo()) //Le doy el tipo de dato de la variable, suponiendo que voy a usar esto como instrucción y expresión
                if(this.tipo == tipoOp.INCREMENTO){
                valorr++
                }
                else{
                    valorr--
                }
                tabla.setValor(this.id,new Symbol(busqueda.gettipo(),this.id,valorr),false)
                return valorr

            }
            else{
                return new Errorr("->Error Semántico<-","INCREMENTO o DECREMENTO inválido",this.linea,this.columna)
            }

        }
        else{
            return new Errorr("->Error Semántico<-","Variable -"+this.id+"- no encontrada",this.linea,this.columna)
        }
    }
    
       // return new Errorr("->Error Semántico<-","INCREMENTO o DECREMENTO inválido",this.linea,this.columna)
    

}

export enum tipoOp{
    INCREMENTO,
    DECREMENTO
}