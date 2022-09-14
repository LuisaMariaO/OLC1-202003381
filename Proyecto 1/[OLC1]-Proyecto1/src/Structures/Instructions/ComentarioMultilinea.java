/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Structures.Instructions;

/**
 *
 * @author Luisa María Ortiz
 */
public class ComentarioMultilinea implements Instruccion {
    private final String comentario;
    
    public ComentarioMultilinea(String a){
        this.comentario=a;
    }

    @Override
    public String traducirGolang() {
        return this.comentario+"\n";
        		
    }

	@Override
	public String traducirPython() {
		// TODO Auto-generated method stub
		return null;
	}
    
}
