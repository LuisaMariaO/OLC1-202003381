import { Instruccion } from '../Abstract/Instruccion';
import Three from '../Symbol/Three';
import SymbolTable from '../Symbol/SymbolTable';
import Type, { DataType } from '../Symbol/Type';
import get from 'lodash/get'
import Errorr from '../Exceptions/Error';
import Aritmetica from './Aritmetica';
import Logica from './Logica';
import Relacional from './Relacional';
import Simbolo from '../Symbol/Symbol'


export default class Casteo extends Instruccion {
  valor: Instruccion


  constructor(tipo: Type, valor: Instruccion, fila: number, columna: number) {
    super(tipo, fila, columna);
    this.valor = valor;
  }

 
  interpretar(arbol: Three, tabla: SymbolTable) {
    let valorr:any = null
    if(this.valor instanceof(Aritmetica) || this.valor instanceof(Logica) || this.valor instanceof(Relacional) || this.valor instanceof(Casteo)){
            valorr = this.valor.interpretar(arbol,tabla)
        
           // console.log(valorr)
            this.valor.tipoDato = valorr.tipoDato()
    }

    if(this.valor.tipoDato.getTipo() == DataType.IDENTIFICADOR){
        
    
 
        //  console.log(value)
          let jsonaux = JSON.stringify(this.valor).toString()
          let objjson = JSON.parse(jsonaux)
          let idaux = objjson.valor
          let valid:Simbolo = tabla.getSimbolo(idaux) //Un simbolo que representa la expresion identificador
          if(valid==null){
              return new Errorr("->Error Semántico<-","No se encontró la variable -"+idaux+"-",this.linea,this.columna) 
          }
          else{
            this.tipoDato.setTipo(valid.gettipo().getTipo())
          }
          
          
      }
    
    
    if(this.tipoDato.getTipo() == DataType.ENTERO){
        if(this.valor.tipoDato.getTipo()==DataType.ENTERO || this.valor.tipoDato.getTipo() == DataType.IDENTIFICADOR){
            
        //Casteo de entero a entero

        if(valorr==null){
            return (Number(this.valor.interpretar(arbol,tabla)))
        }
        else{
            return Number(valorr)
        }
        }
        else{
            return new Errorr("->Error Semántico<-","Casteo incompatible",this.linea,this.columna) 
        }
        
        
    }
    else{
        return new Errorr("->Error Semántico<-","Casteo incompatible",this.linea,this.columna) 
    }
    
  }
}