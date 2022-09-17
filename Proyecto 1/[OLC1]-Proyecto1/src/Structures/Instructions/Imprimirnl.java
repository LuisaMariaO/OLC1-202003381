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
	public String traducirPython() {
		// TODO Auto-generated method stub
		return null;
	}

}
