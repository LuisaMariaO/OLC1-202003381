import Tipo from './Type';

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
}