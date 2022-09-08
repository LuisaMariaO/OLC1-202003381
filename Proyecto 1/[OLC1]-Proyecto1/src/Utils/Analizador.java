/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Utils;


import java.io.File;
import java.io.FileInputStream;

/**
 *
 * @author Luisa María Ortiz
 */
public class Analizador {

    public Analizador() {
    }
    public void interpretar (String text){
        File file = new File("./public/parse.txt");  //Pasando el contenido de la interfaz a un archivo para ser analizado
        (new Files()).createFile(file, text);
        analizadores.Sintactico pars;
        
        try{
            pars = new analizadores.Sintactico(new analizadores.Lexico(new FileInputStream(file)));
            pars.parse();
        }catch(Exception e){
            System.out.println(e);
        }
    }
}
