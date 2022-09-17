package Structures.Instructions;

import java.util.LinkedList;
import java.util.Map;

public class Funcion implements Instruccion{
	private String nombre;
	private String tipoDato;
	LinkedList<Map.Entry<String,String>> parametros; //<Identificador, tipoDato>
	private LinkedList<Instruccion> instrucciones;
	Instruccion retorno;
	
	public Funcion(String nombre, String tipoDato, LinkedList<Map.Entry<String, String>> parametros, LinkedList<Instruccion> instrucciones, Instruccion retorno) {
		this.nombre=nombre;
		this.tipoDato=tipoDato;
		this.parametros=parametros;
		this.instrucciones=instrucciones;
		this.retorno=retorno;
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
		String tipo;
		if(tipoDato.toLowerCase().equals("numero")) {
			tipo="float64";
		}
		else if(tipoDato.toLowerCase().equals("cadena")) {
			tipo="string";
		}
		else if(tipoDato.toLowerCase().equals("caracter")) {
			tipo="byte";
		}
		else {
			tipo="bool";
		}
		traduccion+=")"+tipo+" {\n";
		
		if(instrucciones!=null) {
			for(Instruccion ins:instrucciones) {
				if(ins!=null) {
				traduccion+=ins.traducirGolang()+"\n";
				}
			}
		}
		traduccion+=retorno.traducirGolang();
		traduccion+="\n}";
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
		
		traduccion+=retorno.traducirPython(iden+1);
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
