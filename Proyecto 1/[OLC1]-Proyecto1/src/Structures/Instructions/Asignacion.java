package Structures.Instructions;

import java.util.LinkedList;

public class Asignacion implements Instruccion {
	
	private String nombre;
	private LinkedList <String> listaNombres;
	private Operacion valor;
	
	public Asignacion(String nombre, LinkedList<String> listaNombres, Operacion valor) {
		this.nombre=nombre;
		this.listaNombres=listaNombres;
		this.valor=valor;
	}

	@Override
	public String traducirGolang() {
		String declaraciones="";
		declaraciones+=nombre+ " = " + valor.traducirGolang()+"\n";
		for(String asignacion:listaNombres) {
			declaraciones+=asignacion+" = "+valor.traducirGolang()+"\n";
		}
		return declaraciones;
	}

	@Override
	public String traducirPython() {
		// TODO Auto-generated method stub
		return null;
	}

}
