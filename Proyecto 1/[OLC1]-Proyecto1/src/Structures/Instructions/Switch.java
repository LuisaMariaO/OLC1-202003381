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
				traduccion+=ins.traducirGolang()+"\n";
			}
			}
		}
		
		if(contrario!=null) {//Si trae default
			traduccion+="\ndefault:\n";
			for(Instruccion ins: contrario) {
				traduccion+=ins.traducirGolang()+"\n";
			}
		}
		traduccion+="}";
		return traduccion;
	}

	@Override
	public String traducirPython(int iden) {
		String traduccion="";
		if(condiciones!=null) {
			Map.Entry<Operacion, LinkedList<Instruccion>> primero;
			primero=condiciones.pop();
			traduccion+=identacion(iden)+"if "+valor.traducirPython(0)+"=="+primero.getKey().traducirPython(0)+":\n";
			if(primero.getValue()!=null) {
				for(Instruccion ins: primero.getValue()) {
					traduccion+=ins.traducirPython(iden+1)+"\n";
				}
			}
			
			for(Map.Entry<Operacion, LinkedList<Instruccion>> cond: condiciones) {
				traduccion+=identacion(iden)+"elif "+valor.traducirPython(0)+"=="+cond.getKey().traducirPython(0)+":\n";
				for(Instruccion ins: cond.getValue()) {
					traduccion+=ins.traducirPython(iden+1)+"\n";
				}
			}
		}
		
		if(contrario!=null) {
			traduccion+=identacion(iden)+"else:\n";
			traduccion+="#(default)#\n";
			for(Instruccion ins: contrario) {
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
