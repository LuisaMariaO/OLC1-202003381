package Structures.Instructions;

public class Imprimir implements Instruccion {
	private Operacion valor;
	
	public Imprimir(Operacion valor) {
		this.valor=valor;
	}

	@Override
	public String traducirGolang() {
		return "fmt.Print("+valor.traducirGolang()+")";
	}

	@Override
	public String traducirPython(int iden) {
		String traduccion="";
		traduccion+=identacion(iden)+"print("+valor.traducirPython(0)+")";
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
