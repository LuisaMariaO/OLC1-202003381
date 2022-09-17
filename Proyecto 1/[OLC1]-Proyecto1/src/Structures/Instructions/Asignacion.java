package Structures.Instructions;

import java.util.LinkedList;

public class Asignacion implements Instruccion {
	

	private LinkedList <String> listaNombres;
	private Operacion valor;
	
	public Asignacion( LinkedList<String> listaNombres, Operacion valor) {
		
		this.listaNombres=listaNombres;
		this.valor=valor;
	}

	@Override
	public String traducirGolang() {
		String declaraciones="";
		
		for(String asignacion:listaNombres) {
			declaraciones+=asignacion+" = "+valor.traducirGolang();
		}
		return declaraciones;
	}

	@Override
	public String traducirPython() {
		// TODO Auto-generated method stub
		return null;
	}

}
