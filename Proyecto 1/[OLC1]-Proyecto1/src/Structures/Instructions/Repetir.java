package Structures.Instructions;

import java.util.LinkedList;

public class Repetir implements Instruccion {
	private LinkedList<Instruccion> instrucciones;
	private Operacion condicion;
	
	public Repetir(LinkedList<Instruccion> instrucciones, Operacion condicion) {
		this.instrucciones=instrucciones;
		this.condicion=condicion;
	}

	@Override
	public String traducirGolang() {
		String traduccion="";
		traduccion+="for true {\n";
		if(instrucciones!=null) {
			for(Instruccion ins:instrucciones) {
				traduccion+=ins.traducirGolang();
			}
		}
		traduccion+="if ("+condicion.traducirGolang()+") {\n";
		traduccion+="break\n";
		traduccion+="}\n";
		traduccion+="}";
		return traduccion;
	}

	@Override
	public String traducirPython() {
		// TODO Auto-generated method stub
		return null;
	}

}
