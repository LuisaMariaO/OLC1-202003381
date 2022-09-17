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
	public String traducirPython(int identacion) {
		// TODO Auto-generated method stub
		return null;
	}

}
