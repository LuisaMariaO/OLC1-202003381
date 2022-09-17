package Structures.Instructions;

import java.util.LinkedList;

public class Declaracion implements Instruccion {

	private LinkedList<String> listaNombres;
	private String tipoDato;
	private Operacion valor;
	public Declaracion(LinkedList<String> listaNombres, String tipoDato, Operacion valor) {
	
		this.listaNombres=listaNombres;
		this.tipoDato=tipoDato;
		this.valor=valor;
	}
	@Override
	public String traducirGolang() {
		String declaraciones="";
		if(tipoDato.toLowerCase().equals("cadena")) {
			tipoDato="string";
		}
		else if(tipoDato.toLowerCase().equals("caracter")) {
			tipoDato="byte";
		}
		else if(tipoDato.toLowerCase().equals("boolean")) {
			tipoDato="bool";
		}
		else {
			tipoDato="float64";
		}
		
		for(String declaracion:listaNombres) {
		
		declaraciones+= "var "+declaracion +" "+tipoDato+" = " + valor.traducirGolang()+"\n";
		}
		
		return declaraciones;
	}

	@Override
	public String traducirPython(int identacion) {
		String ide="  ";
		String traduccion="";
		
		for(String nombre:listaNombres) {
			for(int i=0;i<identacion;i++) {
				traduccion+=ide;
			}
			traduccion+=nombre+ " = " +valor.traducirPython(0)+"\n";
		}
		return traduccion;
	}

}
