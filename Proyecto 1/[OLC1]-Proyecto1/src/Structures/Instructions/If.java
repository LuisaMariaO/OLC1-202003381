package Structures.Instructions;


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
		if(bloque!=null) {
		for(Instruccion ins:bloque) {
			traduccion+=ins.traducirGolang()+"\n";
		}
		}
		traduccion+="}";
	if(oSi!=null) {//Si trae else if
		for(Map.Entry<Operacion, LinkedList<Instruccion>> cond:oSi) {
			traduccion+="else if " + cond.getKey().traducirGolang()+"{\n";
			if(cond.getValue()!=null) {
			for(Instruccion ins:cond.getValue()) {
				traduccion+=ins.traducirGolang()+"\n";
			}
			}
			traduccion+="}";
		}
	}
	if(siNo!=null) {//Si trae else
		traduccion+="else {\n";
		for(Instruccion ins:siNo) {
			traduccion+=ins.traducirGolang()+"\n";
		}
		traduccion+="}";
	}
		return traduccion+"";
	}

	@Override
	public String traducirPython(int iden) {
	
	
		String traduccion="";
	
		traduccion+=identacion(iden);
		traduccion+="if "+condicion.traducirPython(0)+":\n";
		if(bloque!=null) {
			for(Instruccion ins:bloque) {
				traduccion+=ins.traducirPython(iden+1)+"\n";
			}
		}
		if(oSi!=null) {
			for(Map.Entry<Operacion, LinkedList<Instruccion>> cond:oSi) {
				traduccion+=identacion(iden)+"elif " + cond.getKey().traducirPython(0)+":\n";
				if(cond.getValue()!=null) {
				for(Instruccion ins:cond.getValue()) {
					traduccion+=ins.traducirPython(iden+1)+"\n";
				}
				}
				
		}
		}
		
		if(siNo!=null) {
			traduccion+=identacion(iden)+"else:\n";
			for(Instruccion ins:siNo) {
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
