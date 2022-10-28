import Simbolo from './Symbol';
import Tipo, {DataType} from '../Symbol/Type';

export default class SymbolTable {
  private tablaAnterior: SymbolTable | any;
  private tablaActual: Map<String, Simbolo>;

  constructor(anterior?: SymbolTable) {
    this.tablaAnterior = anterior;
    this.tablaActual = new Map<String, Simbolo>();
  }

  public getValor(id: String): any{
    let valor = this.tablaActual.get(id);
    return valor;
  }
  public getSimbolo(id: String):Simbolo | any{
    let valor: Simbolo |any = this.tablaActual.get(id)
    return valor;
  }

  public setValor(id: String, valor: Simbolo, declaracion:boolean): any{
    
    id = id.toLowerCase()
    if(declaracion){
    this.tablaActual.set(id, valor);
    }
    else {
      let actual: SymbolTable = this
      let oldValue = null //Para buscar si ya existe la variable
      while(actual){
        if(actual.getTabla().get(id)){
          oldValue = actual.getTabla().get(id);
          actual.getTabla().delete(id);
          actual.getTabla().set(id, valor);
          break;
        }
        actual = actual.getAnterior();
      }
      if(!oldValue) console.log('Error la variable no existe')
    }
   
    return null;
  }

  public getAnterior() {
    return this.tablaAnterior;
  }
  public setAnterior(anterior: SymbolTable) {
    this.tablaAnterior = anterior;
  }
  public getTabla() {
    return this.tablaActual;
  }
  public setTabla(Tabla: Map<String, Simbolo>) {
    this.tablaActual = Tabla;
  }
}