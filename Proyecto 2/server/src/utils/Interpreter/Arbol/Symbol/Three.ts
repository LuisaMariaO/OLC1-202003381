import { Instruccion } from '../Abstract/Instruccion';
import Errores from '../Exceptions/Error';
import tablaSimbolo from './SymbolTable';
import { CDigraph, CNode, CEdge} from '../../../Graphviz'
import { toDot } from 'ts-graphviz';
import Error from '../Exceptions/Error';
import { stringify } from 'querystring';


export default class Three {
  private instrucciones: Array<Instruccion>;
  private errores: Array<Errores>;
  private consola: String;
  private tablaGlobal: tablaSimbolo;
  private raiz: Nodo;
  private graphIndex: number;

  constructor(production: any) {
    this.instrucciones = production.returnInstruction;
    this.consola = '';
    this.tablaGlobal = new tablaSimbolo();
    this.errores = new Array<Errores>();
    this.raiz = production.nodeInstruction;
    this.graphIndex = 0;
  

  }
  
  public getconsola(): String {
    return this.consola;
  }
  public setconsola(value: String) {
    this.consola = value;
  }
  public actualizaConsola(uptodate: String) {
    this.consola = `${this.consola}${uptodate}\n`; //TODO: Quitar el salto de linea para diferenciar print y println
  }
  public getinstrucciones(): Array<Instruccion> {
    return this.instrucciones;
  }
  public setinstrucciones(value: Array<Instruccion>) {
    this.instrucciones = value;
  }
  public getErrores(): Array<Errores> {
    return this.errores;
  }

  public seterrores(value: Array<Errores>) {
    this.errores = value;
  }
  public adderror(value: Errores){
    this.errores.push(value)
  }
  public gettablaGlobal(): tablaSimbolo {
    return this.tablaGlobal;
  }
  public settablaGlobal(value: tablaSimbolo) {
    this.tablaGlobal = value;
  }

  //Para la grafica del arbol
  public getRaiz() {
    return this.raiz;
  }
  public buildTree(padre: Nodo, nodoPadre: CNode, digraph: CDigraph){
    const nodos = padre.getHijos()
     
    for(let i=0; i<nodos.length; i++){
      
        const nodo = nodos[i];
       // console.log("________________________")
        //console.log(nodo)
        const node = new CNode(this.graphIndex++, nodo.getValor());
       
        digraph.addNode(node);
        const edge = new CEdge([nodoPadre, node], "");
        digraph.addEdge(edge);

        this.buildTree(nodo, node, digraph)
    }
  }

  public getTree(name: string){
      const digraph = new CDigraph(name);
      const actual = this.raiz;

      const node = new CNode(this.graphIndex++, actual.getValor());
      digraph.addNode(node);

      this.buildTree(actual, node, digraph);
      this.graphIndex = 0;
      digraph.generate()
      return toDot(digraph)
  }

  public errorsTable(){
    let codigo:string = "<html>\n"
    codigo+="<head>\n<link rel=\"stylesheet\" href=\"style.css\">\n</head>\n"
    codigo+="<h2> Tabla de errores </h2>\n"
    codigo+="<table border=\"solid\" class=\"styled-table\">\n<tr>\n"
    codigo+="<th> TIPO </th>\n"
    codigo+="<th> DESCRIPCION </th>\n"
    codigo+="<th> LINEA </th>\n"
    codigo+="<th> COLUMNA </th>\n</tr>\n"

    for(let e of this.errores){
      codigo+="<tr>\n"
      codigo+="<td>"+e.getTipoError()+"</td>\n"
      codigo+="<td>"+e.getDesc()+"</td>\n"
      codigo+="<td>"+e.getFila()+"</td>\n"
      codigo+="<td>"+e.getcolumna()+"</td>\n"
      codigo+="<tr>\n"
    }
    codigo+="</table>\n</html>"
    //Escribo el html
    var fshtml = require('fs');

    fshtml.writeFile("./reports/errores.html", codigo, function(err:any) {
  if (err) {
    return console.log(err);
  }
  
  console.log("El archivo fue creado correctamente");
  
  
});
   

}

public symbolsTable(){
  let codigo:string = "<html>\n"
  codigo+="<head>\n<link rel=\"stylesheet\" href=\"style.css\">\n</head>\n"
  codigo+="<h2> Tabla de símbolos </h2>\n"
  codigo+="<table border=\"solid\" class=\"styled-table\">\n<tr>\n"
  codigo+="<th> IDENTIFICADOR</th>\n"
  codigo+="<th> TIPO </th>\n"
  codigo+="<th> VALOR </th>\n"

  
  for (const [key, value] of this.tablaGlobal.getTabla()){
    codigo+="<tr>\n"
    codigo+="<td>"+key+"</td>\n"
    codigo+="<td>"+value.gettipoString()+"</td>\n"
    codigo+="<td>"+value.getvalor()+"</td>\n"
    codigo+="<tr>\n"
  }
  codigo+="</table>\n</html>"
  //Escribo el html
  var fshtml = require('fs');

  fshtml.writeFile("./reports/simbolos.html", codigo, function(err:any) {
if (err) {
  return console.log(err);
}

console.log("El archivo fue creado correctamente");


});
 

}


public generatePdf(){
 //Lo convierto a pdf
 var fs = require('fs');
 var pdf = require('html-pdf');
 var html = fs.readFileSync('./reports/errores.html', 'utf8');
 var options = { format: 'Letter' };
 
 pdf.create(html, options).toFile('./reports/errores.pdf', function(err:any, res:any) {
   if (err) return console.log(err);
   console.log(res); // { filename: '/app/businesscard.pdf' }
 });
console.log("hola")
}
}
export class Nodo {
    private hijos: Nodo [];
    private padre: Nodo | undefined;
    private valor: any;

    constructor(valor: any) {
      valor= valor.replaceAll('\n',"\\n")
      valor= valor.replaceAll("\"","\\\"")
      valor= valor.replaceAll("\\","\\\\")
      valor= valor.replaceAll('\r',"\\r",)
      valor= valor.replaceAll('\t',"\\t",)
      valor= valor.replaceAll("\'","\\\'")
        this.valor = valor;
        this.hijos = [];
    }

    public getValor(): any {
        return this.valor;
    }

    public setValor(valor: any) {
        this.valor = valor;
    }

    public setHijos(hijos: Nodo[]) {
        this.hijos = hijos;
    }

    public setPadre(padre: Nodo) {
        this.padre = padre;
    }

    public getPadre(): Nodo | undefined {
        return this.padre;
    }

    public getHijos(): Nodo[] {
        return this.hijos;
    }

    public generateProduction(labels: any[]): Nodo {
        labels.forEach(element => {
            (typeof element === "string" && this.hijos.push(new Nodo(element)))
            ||
            (element instanceof Nodo && this.hijos.push(element))
        });
        return this;
    }
}
