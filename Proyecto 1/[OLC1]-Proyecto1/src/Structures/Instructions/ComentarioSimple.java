/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Structures.Instructions;

/**
 *
 * @author Luisa Mar?a Ortiz
 */
public class ComentarioSimple implements Instruccion {
    private final String comentario;
    
    public ComentarioSimple(String a){
        this.comentario=a;
        
    }

    @Override
    public String traducirGolang() {
        return this.comentario+"";
    }

	@Override
	public String traducirPython(int ide) {
	
		String traduccion = this.comentario;
		traduccion=traduccion.substring(2, traduccion.length());
		return identacion(ide)+"#"+traduccion+"\n";
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
