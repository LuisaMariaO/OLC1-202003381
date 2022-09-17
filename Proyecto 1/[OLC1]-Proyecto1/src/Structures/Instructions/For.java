package Structures.Instructions;

import java.util.LinkedList;

public class For implements Instruccion  {
	private String identificador;
	private Operacion inicio;
	private Operacion fin;
	private String paso;
	private LinkedList<Instruccion> instrucciones;
	
	public For(String identificador, Operacion inicio, Operacion fin, String paso, LinkedList<Instruccion>instrucciones) {
		this.identificador=identificador;
		this.inicio=inicio;
		this.fin=fin;
		this.paso=paso;
		this.instrucciones=instrucciones;
	}

	@Override
	public String traducirGolang() {
		String traduccion="";
		traduccion+="for "+identificador+" := "+inicio.traducirGolang()+"; "+identificador+" < "+fin.traducirGolang()+"; ";
		if(paso==null) {//Si no se ingresó un incremental
			traduccion+=identificador+"++";
		}
		else {
			traduccion+=identificador+"="+identificador+"+"+paso;
		}
		traduccion+=" {\n";
		if(instrucciones!=null) {
			for(Instruccion ins:instrucciones) {
				if(ins!=null) {
				traduccion+=ins.traducirGolang()+"\n";
				}
			}
		}
		traduccion+="}";
		return traduccion;
	}

	@Override
	public String traducirPython(int identacion) {
		// TODO Auto-generated method stub
		return null;
	}

}
