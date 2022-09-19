package Structures;

import java.util.LinkedList;

import Structures.Instructions.Instruccion;

public class Production {
	private Node nodo;
	private Instruccion ins;
	private LinkedList<Instruccion> instructions;
	
	public Production() {}
	
	public Production(Node nodo, Instruccion ins) {
		this.nodo=nodo;
		this.ins=ins;
	}
	
	public Production(Node nodo, LinkedList<Instruccion> ins) {
		this.nodo=nodo;
		this.instructions=ins;
	}
	
	public LinkedList<Instruccion> getInstruccions(){
		return this.instructions;
	}
	public void setInstructions(LinkedList<Instruccion> instructions) {
		this.instructions=instructions;
	}
	
	public void addIns(Instruccion ins) {
		this.instructions.add(ins);
	}
	
	public void addSon(String valor) {
		this.nodo.addSon(valor);
	}
	public void addSon(Production valor) {
		this.nodo.addSon(valor.getNode());
	}
	
	public Node getNode() {
		return nodo;
	}
	
	public void setNode(Node nodo) {
		this.nodo=nodo;
	}
	public Instruccion getIns() {
		return this.ins;
	}
	
	public void setIns(Instruccion ins) {
		this.ins=ins;
	}
}
