package Structures.Instructions;

import java.util.LinkedList;

public class Llamada implements Instruccion {
	private String identificador;
	private LinkedList<Operacion> parametros;
	
	public Llamada(String identificador, LinkedList<Operacion> parametros) {
		this.identificador=identificador;
		this.parametros=parametros;
	}
	@Override
	public String traducirGolang() {
		String traduccion="";
		traduccion+=identificador+"(";
		if(parametros!=null) {
			traduccion+=parametros.pop().traducirGolang();
			for(Operacion exp:parametros) {
				traduccion+=","+exp.traducirGolang();
			}
		}
		traduccion+=")";
		return traduccion;
	}

	@Override
	public String traducirPython(int iden) {
		String traduccion="";
		traduccion+=identacion(iden)+identificador+"(";
		if(parametros!=null) {
			traduccion+=parametros.pop().traducirPython(0);
			for(Operacion exp:parametros) {
				traduccion+=","+exp.traducirPython(0);
			}
		}
		traduccion+=")";
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
