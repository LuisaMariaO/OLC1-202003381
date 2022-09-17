package Structures.Instructions;

import java.util.LinkedList;

public class Mientras implements Instruccion {
	Operacion condicion;
	LinkedList<Instruccion> instrucciones;
	
	public Mientras(Operacion condicion, LinkedList<Instruccion> instrucciones) {
		this.condicion=condicion;
		this.instrucciones=instrucciones;
	}

	@Override
	public String traducirGolang() {
		String traduccion="";
		traduccion+="for true {\n";
		traduccion+="if !("+condicion.traducirGolang()+"){\n";
		traduccion+="break\n";
		traduccion+="}\n";
		if(instrucciones!=null) {
			for(Instruccion ins:instrucciones) {
				traduccion+=ins.traducirGolang();
			}
		}
		traduccion+="}";
		return traduccion;
	}

	@Override
	public String traducirPython() {
		// TODO Auto-generated method stub
		return null;
	}

}
