package Structures.Instructions;

public class Retorno implements Instruccion {
	private Operacion valor;
	
	public Retorno(Operacion valor) {
		this.valor=valor;
	}

	@Override
	public String traducirGolang() {
		
		return "return "+valor.traducirGolang()+"";
	}

	@Override
	public String traducirPython(int iden) {
		String traduccion="";
		traduccion+=identacion(iden)+"return "+valor.traducirPython(0);
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
