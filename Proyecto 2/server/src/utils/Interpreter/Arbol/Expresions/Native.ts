import { Instruccion } from '../Abstract/Instruccion';
import Three from '../Symbol/Three';
import SymbolTable from '../Symbol/SymbolTable';
import Type, { DataType } from '../Symbol/Type';
import get from 'lodash/get'
import Errorr from '../Exceptions/Error';

export default class Nativo extends Instruccion {
  valor: any;

  constructor(tipo: Type, valor: any, fila: number, columna: number) {
    super(tipo, fila, columna);
    this.valor = valor;
  }

  interpretar(arbol: Three, tabla: SymbolTable) {
    if(this.tipoDato.getTipo() === DataType.ENTERO){
        return parseInt(this.valor);
    }
    else if(this.tipoDato.getTipo() == DataType.DECIMAL){
      return parseFloat(this.valor);
    }
    else if(this.tipoDato.getTipo()== DataType.BOOLEANO){
      //Verifico si es true o false
      if(this.valor.toLowerCase()=="true"){
        return true
      }
      else{
        return false
      }
    }
    else if(this.tipoDato.getTipo() == DataType.CARACTER){
      if(this.valor=="\\'"){
        return "'"
      }
      else if(this.valor=="\\\\"){
        return "\\"
      }
      else if(this.valor=="\\n"){
        return '\n'
      }
      else if(this.valor=="\\t"){
        return '\t'
      }
      else if(this.valor=="\\r"){
        return '\r'
      }
      else if(this.valor=="\\\""){
        return '"'
      }
      return this.valor.toString()
    }
    else if(this.tipoDato.getTipo() === DataType.CADENA){
      let text = this.valor.toString()
       text= text.replaceAll("\\n",'\n')
       text=text.replaceAll("\\\"","\"")
       text=text.replaceAll("\\\\","\\")
       text= text.replaceAll("\\r",'\r')
       text= text.replaceAll("\\t",'\t')
       text=text.replaceAll("\\\'","\'")
        return text;
    }

    else if(this.tipoDato.getTipo() == DataType.IDENTIFICADOR){
      let value = tabla.getValor(this.valor)
      if(value!=null){
      return get(value,'valor')
      }
      else{
        return new Errorr("->Error Semántico<-","Variable no definida",this.linea,this.columna)
      }
    }
    
  }
}