package Structures.Instructions;

public class Errorr {
	private String tipo;
	private String lexema;
	private int linea;
	private int columna;
	
	public Errorr(String tipo, String lexema, int linea, int columna) {
		this.tipo=tipo;
		this.lexema=lexema;
		this.linea=linea;
		this.columna=columna;
	}
	
	public Errorr getError() {
		return this;
	}
	public String getTipo() {
		return this.tipo;
	}
	public String getLexema() {
		return this.lexema;
	}
	public int getLinea() {
		return this.linea;
	}
	public int getColumna() {
		return this.columna;
	}

}
