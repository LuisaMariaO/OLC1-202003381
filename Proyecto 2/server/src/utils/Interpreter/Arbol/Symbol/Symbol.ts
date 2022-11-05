import { execFile } from 'child_process';
import { thresholdFreedmanDiaconis } from 'd3';
import Tipo, { DataType } from './Type';

export default class Symbol {
  private tipo: Tipo; //int, bool, funcion. Las funciones originales siempre se quedan guardadas en la tabla de simbolos para poder llamarla varias veces con sus tipos intactos
  private identificador: String;
  private valor: any;

  constructor(tipo: Tipo, identificador: String, valor?: any) {
    this.tipo = tipo;
    this.identificador = identificador;
    this.valor = valor;
  }
  public gettipo(): Tipo {
    return this.tipo;
  }
  public settipo(value: Tipo) {
    this.tipo = value;
  }
  public getidentificador(): String {
    return this.identificador;
  }
  public setidentificador(value: String) {
    this.identificador = value;
  }
  public getvalor(): any {
    return this.valor;
  }
  public setvalor(value: any) {
    this.valor = value;
  }

  public gettipoString(){
    if(this.tipo.getTipo() == DataType.IDENTIFICADOR){
      return "VARIABLE"
    }
    else if(this.tipo.getTipo() == DataType.ENTERO){
      return "ENTERO"
    }
    else if(this.tipo.getTipo() == DataType.DECIMAL){
      return "DECIMAL"
    }
    else if(this.tipo.getTipo() == DataType.BOOLEANO){
      return "BOOLEANO"
    }
    else if(this.tipo.getTipo() == DataType.CARACTER){
      return "CARACTER"
    }
    else if(this.tipo.getTipo() == DataType.CADENA){
      return "CADENA"
    }
    return this.tipo.getTipo()
  }
}