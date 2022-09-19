package Structures;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.util.LinkedList;

public class Arbol {
	private Node raiz;
	
	public Arbol() {}
	
	public Arbol(Node raiz) {
		this.raiz=raiz;
	}
	public Node getRaiz() {
		return this.raiz;
	}
	public void setRaiz(Node raiz) {
		this.raiz=raiz;
	}
	 public void graficar(){
	        StringBuilder s = new StringBuilder();
	        s.append("digraph G{\n");
	        if(raiz!=null) {
	        s.append("\"node").append(raiz.hashCode()).append("\" [ label = \"").append(raiz.getValor()).append("\",];\n");
	        
	        graficar(raiz, s);
	        }
	        s.append("}");
	        
	        try {
	            String ruta = "reportes/ast.dot";
	            String contenido = s.toString();
	            File file = new File(ruta);
	            // Si el archivo no existe es creado
	            if (!file.exists()) {
	                file.createNewFile();
	            }
	            FileWriter fw = new FileWriter(file);
	            BufferedWriter bw = new BufferedWriter(fw);
	            bw.write(contenido);
	            bw.close();
	            
	          
	            String arg1 = file.getAbsolutePath(); 
	            String arg2 = "reportes/ast.png"; 
	            String[] c = {"dot", "-Tpng", arg1, "-o", arg2};
	            Process p = Runtime.getRuntime().exec(c); 
	            int err = p.waitFor(); 

	        } catch (Exception e) {
	            e.printStackTrace();
	        }
	       
	    }
	    
	    public void graficar(Node raiz, StringBuilder s){        
	        LinkedList<Node> hijos = raiz.getHijos();
	        if(hijos != null){
	            for(Node hijo: hijos){
	            	if(hijo!=null) {
	            		try {
	            			hijo.setValor(hijo.getValor().replace("\"", "\\\""));
	            		}catch(Exception e) {
	            			System.out.println(e);
	            		}
	                s.append("\"node").append(hijo.hashCode()).append("\" [ label = \"").append(hijo.getValor()).append("\",];\n");
	                graficar(hijo, s);
	                s.append("\"node").append(raiz.hashCode()).append("\" -> \"node").append(hijo.hashCode()).append("\" [ label = \"\",];\n");
	            	}
	            }
	        }
	    }
	
}
