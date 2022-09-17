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
				traduccion+=ins.traducirGolang()+"\n";
			}
		}
		traduccion+="}";
		return traduccion;
	}

	@Override
	public String traducirPython(int iden) {
		String traduccion="";
		traduccion+=identacion(iden)+"while ("+condicion.traducirPython(0)+"):\n";
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
