export default class Type {
    private tipo: DataType;
  
    constructor(tipo: DataType) {
      this.tipo = tipo;
    }
    public getTipo(): DataType {
      return this.tipo;
    }
    public setTipo(tipo: DataType): void {
      this.tipo = tipo;
    }
}
  
export enum DataType {
    /*TIPOS DE DATOS*/
    ENTERO,
    DECIMAL,
    BOOLEANO,
    CARACTER,
    CADENA,
    IDENTIFICADOR,
    INDEFINIDO,
    VECTOR_ENTERO,
    VECTOR_DECIMAL,
    VECTOR_BOOLEANO,
    VECTOR_CARACTER,
    VECTOR_CADENA
}