import { Instruccion } from '../Abstract/Instruccion';
import Arbol from '../Symbol/Three';
import tablaSimbolo from '../Symbol/SymbolTable';
import Tipo, {DataType} from '../Symbol/Type';
import Errorr from '../Exceptions/Error'
import { isGeneratorFunction } from 'util/types';
import Error from '../Exceptions/Error';
import { identity } from 'lodash';

export default class Logica extends Instruccion {
  operacionIzq: Instruccion;
  operacionDer: Instruccion;
  tipo: tipoOp;

  

  constructor(tipo: tipoOp, opIzq: Instruccion, opDer: Instruccion, fila: number, columna: number) {
    super(new Tipo(DataType.INDEFINIDO), fila, columna);
    this.tipo = tipo;
    this.operacionIzq = opIzq;
    this.operacionDer = opDer;

  }

  interpretar(arbol: Arbol, tabla: tablaSimbolo) {
    /*******************************************OR*******************************************************/
        if(this.tipo== tipoOp.OR){
            let valueIzq = this.operacionIzq.interpretar(arbol,tabla);
            let valueDer = this.operacionDer.interpretar(arbol,tabla);
            if(this.operacionIzq.tipoDato.getTipo() == DataType.BOOLEANO && this.operacionDer.tipoDato.getTipo() == DataType.BOOLEANO){
                this.tipoDato.setTipo(DataType.BOOLEANO)
                return(valueIzq || valueDer);
            }
            else{
                this.tipoDato.setTipo(DataType.INDEFINIDO)
                return new Errorr("->Error Semántico<-","Se esperaba BOOLEAN || BOOLEAN",this.linea,this.columna)
            }

        }
        else if(this.tipo== tipoOp.AND){
            let valueIzq = this.operacionIzq.interpretar(arbol,tabla);
            let valueDer = this.operacionDer.interpretar(arbol,tabla);
            if(this.operacionIzq.tipoDato.getTipo() == DataType.BOOLEANO && this.operacionDer.tipoDato.getTipo() == DataType.BOOLEANO){
                this.tipoDato.setTipo(DataType.BOOLEANO)
                return(valueIzq && valueDer);
            }
            else{
                this.tipoDato.setTipo(DataType.INDEFINIDO)
                return new Errorr("->Error Semántico<-","Se esperaba BOOLEAN && BOOLEAN",this.linea,this.columna)
            }

        }
        else if(this.tipo == tipoOp.NOT){
            let valueIzq = this.operacionIzq.interpretar(arbol,tabla); //Solo es necesario un valor
            if(this.operacionIzq.tipoDato.getTipo() == DataType.BOOLEANO){
                this.tipoDato.setTipo(DataType.BOOLEANO)
                return(!valueIzq)
            }
            else{
                this.tipoDato.setTipo(DataType.INDEFINIDO)
                return new Errorr("->Error Semántico<-","Se esperaba !BOOLEAN",this.linea,this.columna)
            }

        }
        
        
        this.tipoDato.setTipo(DataType.INDEFINIDO)
        return new Errorr("->Error Semántico<-","OPERACION LOGICA INDEFINIDA",this.linea,this.columna)
  }
}

export enum tipoOp{
    OR,
    AND,
    NOT
}