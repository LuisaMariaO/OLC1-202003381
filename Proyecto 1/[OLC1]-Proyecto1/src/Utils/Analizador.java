/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Utils;
import Analizadores.ArbolSintactico;
import Analizadores.Lexico;

import Analizadores.Sintactico;
import Structures.Arbol;
import Structures.Instructions.Errorr;
import Structures.Instructions.Funcion;
import Structures.Instructions.Instruccion;
import Structures.Instructions.Metodo;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.StringReader;
import java.util.LinkedList;

/**
 *
 * @author Luisa María Ortiz
 */
public class Analizador {
	public int noErrores=0;

    public Analizador() {
    }
    
    public boolean generarArbol(String text) {
    	Arbol arbol;
    	 try{
         	
             Lexico lexico = new Lexico(new BufferedReader(new StringReader(text)));
            ArbolSintactico sintactico = new ArbolSintactico(lexico);
             sintactico.parse();
            arbol = sintactico.getArbol();
           
            arbol.graficar();
         }catch(Exception e){
             System.out.println(e);
             System.out.println("Mega error");
         }
    return true;	
    }
    
    public String interpretar (String text, int lenguaje){
    	LinkedList<Errorr> errores = new LinkedList<Errorr>();
    	
    	//Lenguaje=0 -> Golang
    	//Lenguaje=1 -> Python
    	LinkedList <Instruccion> AST = null;
        try{
        	
            Lexico lexico = new Lexico(new BufferedReader(new StringReader(text)));
            
                       Sintactico sintactico = new Sintactico(lexico);
            sintactico.parse();
            errores.addAll(lexico.errores);
            errores.addAll(sintactico.errores); //Traigo los errores encontrados durante los analisis
            this.noErrores=errores.size();
            reportarErrores(errores);
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
        
        //Primero busco las instrucciones fuera de metodos para el metodo main
        String main = "package main\n";
        main+="import(\n\"fmt\"\n\"math\"\n)\n";
        main+="func main(){\n";
        String traduccion="";
        
        for(Instruccion ins:ast){
            //Si existe un error léxico o sintáctico en cierta instrucción esta
            //será inválida y se cargará como null, por lo tanto no deberá ejecutarse
            //es por esto que se hace esta validación.
            if(ins!=null) {
            	if(!(ins instanceof Metodo) && !(ins instanceof Funcion) ) {
            		main += ins.traducirGolang()+"\n";
            		
            	}
            	else {
            		traduccion+=ins.traducirGolang()+"\n";
            	}
                
            }
           
        }
        main+="}\n";
        return main+traduccion;
    }
    
    public String ejecutarPython(LinkedList<Instruccion> ast) {
        if(ast==null){
            return("No es posible ejecutar las instrucciones porque\r\n"
                    + "el árbol no fue cargado de forma adecuada por la existencia\r\n"
                    + "de errores léxicos o sintácticos.");
        }
        //Se ejecuta cada instruccion en el ast, es decir, cada instruccion de 
        //la lista principal de instrucciones.
        String main="def main():\n";
        main+="  print(\"python main function\")\n";
        String traduccion = "";
        
        for(Instruccion ins:ast){
  
            if(ins!=null) {
            	if(!(ins instanceof Metodo) && !(ins instanceof Funcion)) {
                main += ins.traducirPython(1)+"\n";
            	}
            	else {
            		traduccion+=ins.traducirPython(0)+"\n";
            	}
            }
           
        }
        main+="if __name__=='__main__':\n  main()\n";
        return traduccion+main;
    }
    
    public void reportarErrores(LinkedList<Errorr> errores) {
    	try {
            String ruta = "reportes/errores.html";
            StringBuilder s = new StringBuilder();
            File file = new File(ruta);
            // Si el archivo no existe es creado
            if (!file.exists()) {
                file.createNewFile();
            }
            FileWriter fw = new FileWriter(file);
            BufferedWriter bw = new BufferedWriter(fw);
            int contador=0;
            s.append("<html>\n<h1>Reporte de errores</h1>\n");
            s.append("<style type=\"text/css\">\r\n"
            		+ ".myOtherTable { background-color:#FFFFE0;border-collapse:collapse;color:#000;font-size:18px; }\r\n"
            		+ ".myOtherTable th { background-color:#BDB76B;color:white;width:17%; }\r\n"
            		+ ".myOtherTable td, .myOtherTable th { padding:5px;border:0; }\r\n"
            		+ ".myOtherTable td { \r\n"
            		+ "    border-bottom:1px dotted #BDB76B;\r\n"
            		+ "    border-right: 1px solid #BDB76B;\r\n"
            		+ " }\r\n"
            		+ "\r\n"
            		+ "</style>");
            s.append("<table class=\"myOtherTable\">\n");
            s.append("<tr>\n");
            s.append("<th>Numero</th>\n");
            s.append("<th>Tipo</th>\n");
            s.append("<th>Lexema</th>\n");
            s.append("<th>Linea</th>\n");
            s.append("<th>Columna</th>\n");
            s.append("<th>Descripcion</th>\n");
            s.append("</tr>\n");
            if(errores!=null) {
            	for(Errorr er: errores) {
            		if(er!=null) {
            			contador++;
            			s.append("<tr>\n");
            			s.append("<td>"+contador+"</td>\n");
            			s.append("<td>"+er.getTipo()+"</td>\n");
            			s.append("<td>"+er.getLexema()+"</td>\n");
            			s.append("<td>"+er.getLinea()+"</td>\n");
            			s.append("<td>"+er.getColumna()+"</td>\n");
            			if(er.getTipo().equals("Lexico")) {
            			s.append("<td>"+"Caracter no reconocido"+"</td>\n");
            			}
            			else {
            				s.append("<td>"+"No se esperaba este caracter"+"</td>\n");
            			}
            			s.append("</tr>");
            		}
            	}
            }
            s.append("</table>\n");
            s.append("</html>");
            bw.write(s.toString());
            bw.close();
            
         

        } catch (Exception e) {
            e.printStackTrace();
        }
    	
    }
    
    
}
