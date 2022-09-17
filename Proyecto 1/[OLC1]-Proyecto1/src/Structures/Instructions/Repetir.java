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
				traduccion+=ins.traducirGolang()+"\n";
			}
		}
		traduccion+="if ("+condicion.traducirGolang()+") {\n";
		traduccion+="break\n";
		traduccion+="}\n";
		traduccion+="}";
		return traduccion;
	}

	@Override
	public String traducirPython(int iden) {
		String traduccion="";
		traduccion+=identacion(iden)+"valor=True\n";
		traduccion+=identacion(iden)+"while valor==True:\n";
		if(instrucciones!=null) {
			for(Instruccion ins:instrucciones) {
				traduccion+=ins.traducirPython(iden+1)+"\n";
			}
		}
		traduccion+=identacion(iden+1)+"if not("+condicion.traducirPython(0)+"):\n";
		traduccion+=identacion(iden+2)+"valor=False\n";
		traduccion+=identacion(iden+1)+"if valor==False:\n";
		traduccion+=identacion(iden+2)+"break\n";
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
