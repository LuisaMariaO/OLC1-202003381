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
	public String traducirPython() {
		// TODO Auto-generated method stub
		return null;
	}

}
