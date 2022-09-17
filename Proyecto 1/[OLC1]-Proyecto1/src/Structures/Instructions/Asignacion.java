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
			declaraciones+=asignacion+" = "+valor.traducirGolang()+"\n";
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
