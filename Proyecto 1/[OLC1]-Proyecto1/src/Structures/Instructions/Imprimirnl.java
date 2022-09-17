package Structures.Instructions;

public class Imprimirnl implements Instruccion {
private Operacion valor;

	public Imprimirnl(Operacion valor) {
		this.valor=valor;
	}
	@Override
	public String traducirGolang() {
	
		return "fmt.Println("+valor.traducirGolang()+")";
	}

	@Override
	public String traducirPython(int iden) {
		String traduccion="";
		traduccion+=identacion(iden)+"print("+valor.traducirPython(0)+"+\"\\n\")";
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
