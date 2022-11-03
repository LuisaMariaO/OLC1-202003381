import { Response, Request } from "express";
import Errores from '../../utils/Interpreter/Arbol/Exceptions/Error';
import Three from "../../utils/Interpreter/Arbol/Symbol/Three";
import SymbolTable from "../../utils/Interpreter/Arbol/Symbol/SymbolTable";

export let listaErrores: Array<Errores> = [];

export const parse = (req: Request & unknown, res: Response): void => {
    listaErrores = new Array<Errores>();
    let parser = require('../../utils/Interpreter/Arbol/analizador');
    const { peticion } = req.body;

    try { 
      const returnThree = parser.parse(peticion)
      let ast = new Three(returnThree);
      var tabla = new SymbolTable();
      ast.settablaGlobal(tabla);
      for (let i of ast.getinstrucciones()) {
       
        if (i instanceof Errores) {
          ast.adderror(i);
          ast.actualizaConsola((<Errores>i).returnError());
        }
        try{
        var resultador = i.interpretar(ast, tabla);
        }catch(err){}
        //Agregando los errores semanticos encontrados
        if (resultador instanceof Errores) {
          ast.adderror(resultador);
          ast.actualizaConsola((<Errores>resultador).returnError());
        }  
        
      }
      listaErrores = ast.getErrores()
      const arbolGrafo = ast.getTree("AST")
      console.log(arbolGrafo)

      res.json({ consola: ast.getconsola(), arbol:arbolGrafo, errores: listaErrores, simbolos: [] });
    } catch (err) {
        console.log(err)
        res.json({ consola: '', error: err, errores: listaErrores, simbolos: [] });
    }
}