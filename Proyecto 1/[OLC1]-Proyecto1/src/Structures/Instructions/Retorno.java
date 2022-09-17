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
	public String traducirPython() {
		// TODO Auto-generated method stub
		return null;
	}

}
