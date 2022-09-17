package Structures.Instructions;

import java.util.LinkedList;
import java.util.Map;

public class Switch implements Instruccion {
	private Operacion valor;
	private LinkedList<Map.Entry<Operacion,LinkedList<Instruccion>>> condiciones; //Operacion -> Condicion. LinkedList<Instruccion> -> Bloque de instrucciones
	private LinkedList<Instruccion> contrario;
	
	public Switch(Operacion valor, LinkedList<Map.Entry<Operacion, LinkedList<Instruccion>>> condiciones, LinkedList<Instruccion> contrario) {
		this.valor=valor;
		this.condiciones=condiciones;
		this.contrario=contrario;
	}

	@Override
	public String traducirGolang() {
		String traduccion="";
		traduccion+="switch "+valor.traducirGolang()+" {\n";
		for(Map.Entry<Operacion, LinkedList<Instruccion>> cond: condiciones) {
			traduccion+="case "+cond.getKey().traducirGolang()+":\n";
			if(cond.getValue()!=null) {
			for(Instruccion ins: cond.getValue()) {
				traduccion+=ins.traducirGolang();
			}
			}
		}
		
		if(contrario!=null) {//Si trae default
			traduccion+="default:\n";
			for(Instruccion ins: contrario) {
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
