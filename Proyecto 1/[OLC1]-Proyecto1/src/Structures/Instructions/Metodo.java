package Structures.Instructions;

import java.util.LinkedList;
import java.util.Map;

public class Metodo implements Instruccion {
	private String nombre;
	LinkedList<Map.Entry<String,String>> parametros; //<Identificador, tipoDato>
	private LinkedList<Instruccion> instrucciones;
	
	public Metodo(String nombre, LinkedList<Map.Entry<String, String>> parametros, LinkedList<Instruccion> instrucciones) {
		this.nombre=nombre;
		this.parametros=parametros;
		this.instrucciones=instrucciones;
	}

	@Override
	public String traducirGolang() {
		String traduccion="";
		traduccion+="func "+nombre+" (";
		if(parametros!=null) {
			Map.Entry<String, String> primero = parametros.pop();
			String tipo;
			if(primero.getValue().toLowerCase().equals("numero")) {
				tipo="float64";
			}
			else if(primero.getValue().toLowerCase().equals("cadena")) {
				tipo="string";
			}
			else if(primero.getValue().toLowerCase().equals("caracter")) {
				tipo="byte";
			}
			else {
				tipo="bool";
			}
			traduccion+=primero.getKey()+" "+tipo;
			for(Map.Entry<String, String> parametro:parametros) {
				if(parametro.getValue().toLowerCase().equals("numero")) {
					tipo="float64";
				}
				else if(parametro.getValue().toLowerCase().equals("cadena")) {
					tipo="string";
				}
				else if(parametro.getValue().toLowerCase().equals("caracter")) {
					tipo="byte";
				}
				else {
					tipo="bool";
				}
				traduccion+=", "+parametro.getKey()+" "+tipo;
			}
		}
		traduccion+="){\n";
		if(instrucciones!=null) {
			for(Instruccion ins:instrucciones) {
				traduccion+=ins.traducirGolang()+"\n";
			}
		}
		traduccion+="}";
		return traduccion;
	}

	@Override
	public String traducirPython(int iden) {
		String traduccion="";
		traduccion+=identacion(iden)+"def "+nombre+"(";
		if(parametros!=null) {
			Map.Entry<String, String> primero = parametros.pop();
			traduccion+=primero.getKey();
		for(Map.Entry<String, String> nombre:parametros) {
			traduccion+=","+nombre.getKey();
		}
		}
		traduccion+="):\n";
		
		if(instrucciones!=null) {
			for(Instruccion ins: instrucciones) {
				traduccion+=ins.traducirPython(iden+1)+"\n";
			}
		}
		return traduccion;
	}
	
	public String identacion(int ide) {
		String id="";
		String espacio="  ";
		for(int i=0;i<ide;i++) {
			id+=espacio;
		}
		return id;
	}

}
