/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Utils;


import java.io.FileInputStream;

/**
 *
 * @author Luisa María Ortiz
 */
public class Analizador {

    public Analizador() {
    }
    public void interpretar (String ruta){
     
        analizadores.Sintactico pars;
        
        try{
            pars = new analizadores.Sintactico(new analizadores.Lexico(new FileInputStream(ruta)));
            pars.parse();
        }catch(Exception e){
            System.out.println(e);
        }
    }
}
