/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Main;

import Utils.Analizador;

/**
 *
 * @author Luisa María Ortiz
 */
public class main {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        
        Analizador analizador = new Analizador();
        analizador.interpretar("./public/Entrada.olc");
    }
    
}
