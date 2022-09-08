/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Utils;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Scanner;
import java.util.logging.Level;
import java.util.logging.Logger;


/**
 *
 * @author Luisa María Ortiz
 */
public class Files {
    public Files(){
        
    }
    
    public String readFile(File archivo){
        try{
            Scanner sc = new Scanner(archivo);
            String entrada ="";
            while(sc.hasNextLine()){
                entrada+=sc.nextLine()+"\n";
            }
            return entrada;
            
        }catch(FileNotFoundException ex){
            System.out.println(ex);
            return "Error: Archivo inválido\n";
        }
    }
    
    
    public void createFile(File file, String contenido){
        if(!file.exists()){
            try {
                file.createNewFile();
            } catch (IOException ex) {
                Logger.getLogger(Files.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
        
        FileWriter fichero = null;
        PrintWriter pw = null;
        
        try
        {
            fichero = new FileWriter(file);
            pw = new PrintWriter(fichero);
            String [] lineas = contenido.split("\n");

            for (String linea: lineas)
                pw.println(linea);

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
           try {           // Nuevamente aprovechamos el finally para 
           // asegurarnos que se cierra el fichero.
            if (null != fichero)
               fichero.close();
           } catch (IOException e2) {
              e2.printStackTrace();
           }
        }
    }
    
}
