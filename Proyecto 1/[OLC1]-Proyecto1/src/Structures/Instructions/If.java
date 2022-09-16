package Structures.Instructions;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.Map;


public class If implements Instruccion{
	private Operacion condicion;
	private LinkedList<Instruccion> bloque;
	private LinkedList<Map.Entry<Operacion,LinkedList<Instruccion>>> oSi; //Operacion -> Condicion. LinkedList<Instruccion> -> Bloque de instrucciones
	private LinkedList<Instruccion> siNo;
	
	public If(Operacion condicion, LinkedList<Instruccion> bloque, LinkedList<Map.Entry<Operacion,LinkedList<Instruccion>>> oSi, LinkedList<Instruccion> siNo) {
		this.condicion=condicion;
		this.bloque=bloque;
		this.oSi=oSi;
		this.siNo=siNo;
	}
	@Override
	public String traducirGolang() {
		String traduccion="";
		traduccion+="if " + condicion.traducirGolang()+"{\n";
		for(Instruccion ins:bloque) {
			traduccion+=ins.traducirGolang();
		}
		traduccion+="}";
	if(oSi!=null) {//Si trae else if
		for(Map.Entry<Operacion, LinkedList<Instruccion>> cond:oSi) {
			traduccion+="else if " + cond.getKey().traducirGolang()+"{\n";
			for(Instruccion ins:cond.getValue()) {
				traduccion+=ins.traducirGolang();
			}
			traduccion+="}";
		}
	}
	if(siNo!=null) {//Si trae else
		traduccion+="else {\n";
		for(Instruccion ins:siNo) {
			System.out.println("a");
			traduccion+=ins.traducirGolang();
		}
		traduccion+="}";
	}
		return traduccion+"\n";
	}

	@Override
	public String traducirPython() {
		// TODO Auto-generated method stub
		return null;
	}

}
