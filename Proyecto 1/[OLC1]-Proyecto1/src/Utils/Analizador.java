/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Utils;
import Analizadores.Lexico;

import Analizadores.Sintactico;
import Structures.Instructions.Instruccion;

import java.io.BufferedReader;
import java.io.File;
import java.io.StringReader;
import java.util.LinkedList;

/**
 *
 * @author Luisa María Ortiz
 */
public class Analizador {

    public Analizador() {
    }
    public String interpretar (String text, int lenguaje){
    	System.out.println(lenguaje);
    	//Lenguaje=0 -> Golang
    	//Lenguaje=1 -> Python
    	LinkedList <Instruccion> AST = null;
        try{
        	
            Lexico lexico = new Lexico(new BufferedReader(new StringReader(text)));
            Sintactico sintactico = new Sintactico(lexico);
            sintactico.parse();
            AST = sintactico.getAST();
        }catch(Exception e){
            System.out.println(e);
            System.out.println("Mega error");
        }
        
        if(lenguaje==0) {
        	return ejecutarGolang(AST);
        }
        else {
        	return ejecutarPython(AST);
        }
       //  return ejecutarAST(AST_arbolSintaxisAbstracta);
    }
    
    public String ejecutarGolang(LinkedList<Instruccion> ast) {
        if(ast==null){
            return("No es posible ejecutar las instrucciones porque\r\n"
                    + "el árbol no fue cargado de forma adecuada por la existencia\r\n"
                    + "de errores léxicos o sintácticos.");
        }
        //Se ejecuta cada instruccion en el ast, es decir, cada instruccion de 
        //la lista principal de instrucciones.
        
        String traduccion = "";
        
        for(Instruccion ins:ast){
            //Si existe un error léxico o sintáctico en cierta instrucción esta
            //será inválida y se cargará como null, por lo tanto no deberá ejecutarse
            //es por esto que se hace esta validación.
            if(ins!=null) {
                traduccion += ins.traducirGolang();
            }
           
        }
        
        return traduccion;
    }
    
    public String ejecutarPython(LinkedList<Instruccion> ast) {
        if(ast==null){
            return("No es posible ejecutar las instrucciones porque\r\n"
                    + "el árbol no fue cargado de forma adecuada por la existencia\r\n"
                    + "de errores léxicos o sintácticos.");
        }
        //Se ejecuta cada instruccion en el ast, es decir, cada instruccion de 
        //la lista principal de instrucciones.
        
        String traduccion = "";
        
        for(Instruccion ins:ast){
            //Si existe un error léxico o sintáctico en cierta instrucción esta
            //será inválida y se cargará como null, por lo tanto no deberá ejecutarse
            //es por esto que se hace esta validación.
            if(ins!=null) {
                traduccion += ins.traducirPython();
            }
           
        }
        
        return traduccion;
    }
}
