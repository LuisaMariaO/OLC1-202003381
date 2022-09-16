/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Structures.Instructions;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 *
 * @author Luisa María Ortiz
 */
public class Operacion implements Instruccion {

    
    
    public static enum Tipo_operacion{
        /*TIPOS DE DATO*/
        ENTERO,
        DECIMAL,
        CADENA,
        BOOLEAN,
        CARACTER,
        /*OPERACIONES BASICAS*/
        SUMA,
        RESTA,
        NEGATIVO,
        MULTIPLICACION,
        DIVISION,
        POTENCIA,
        MODULO,

        /*OPERADORES RELACIONALES*/
        MAYOR,
        MENOR,
        MAYOR_IGUAL,
        MENOR_IGUAL,
        IGUAL,
        DIFERENTE,
        /*OPERADORES LÓGICOS*/
        OR,
        AND,
        NOT,
        /*VAIABLES*/
        IDENTIFICADOR,
        LLAMADA,
        
        /*AGRUPACION*/
        PARENTESIS
        
    }
    
    private final Tipo_operacion tipo;
    
    private Operacion operadorIzq;
    private Operacion operadorDer;
    private Object valor;
    
    /*Constructor para operaciones con dos operaores: SUMA,RESTA,MULTIPLICACION,DIVISON,MODULO,POTENCIA,MAYOR,MENOR,,IGUAL,DIFERENTE,AND,OR*/
    public Operacion (Operacion operadorIzq, Operacion operadorDer, Tipo_operacion tipo){
        this.tipo=tipo;
        this.operadorIzq=operadorIzq;
        this.operadorDer=operadorDer;
    }
    
    /*Constructor para operaciones unarias: NEGATIVO, NOT, PARENTESIS*/
    public Operacion(Operacion operadorIzq, Tipo_operacion tipo){
        this.tipo=tipo;
        this.operadorIzq=operadorIzq;
    }
    
    /*Constructor para operaciones unarias de valor: CADENA, CARACTER,NUMERO, BOOLEANO, IDENTIFICADOR*/
    public Operacion(String valor, Tipo_operacion tipo){
        this.tipo=tipo;
        this.valor=valor;
    }
    
    
    @Override
    public String traducirGolang() {
    	/*TIPOS DE DATO*/
    	if(tipo==Tipo_operacion.CADENA) {
    		return  valor.toString();
    	}
    	else if(tipo==Tipo_operacion.CARACTER) {
    		Pattern pattern = Pattern.compile("\'[ -~]\'");
    		Matcher matcher = pattern.matcher(valor.toString());
    		boolean matchFound = matcher.find();
    		if(matchFound) {
    			return valor.toString();
    		}
    		else {
    			String traduccion = valor.toString();
    			traduccion = traduccion.substring(3, traduccion.length()-2);
    			int num = Integer.parseInt(traduccion);
    			char character = (char)num;
    			return "'"+Character.toString(character)+"'";
    			
    		}
    
    	}
    	else if(tipo==Tipo_operacion.BOOLEAN) {
    		if(valor.toString().toLowerCase().equals("verdadero")) {
    			return "true";
    		}
    		else {
    			return "false";
    		}
    	}
    	else if(tipo==Tipo_operacion.ENTERO || tipo==Tipo_operacion.DECIMAL) {
    		return valor.toString();
    	}
        /*OPERACIONES ARITMETICAS*/
    	else if(tipo==Tipo_operacion.SUMA){
            return operadorIzq.traducirGolang() + "+" + operadorDer.traducirGolang();
        }
        else if(tipo==Tipo_operacion.RESTA){
            return operadorIzq.traducirGolang() + "-" + operadorDer.traducirGolang();
        }
        else if(tipo==Tipo_operacion.MULTIPLICACION){
            return operadorIzq.traducirGolang() + "*" + operadorDer.traducirGolang();
        }
        else if(tipo==Tipo_operacion.DIVISION){
            return operadorIzq.traducirGolang() + "/" + operadorDer.traducirGolang();
        }
        else if(tipo==Tipo_operacion.POTENCIA) {
        	return "math.Pow(float64("+operadorIzq.traducirGolang()+"),float64("+operadorDer.traducirGolang()+"))";
        }
        else if(tipo==Tipo_operacion.PARENTESIS) {
        	return "("+operadorIzq.traducirGolang()+")";
        }
        else if(tipo==Tipo_operacion.MODULO) {
        	return operadorIzq.traducirGolang() + "%" + operadorDer.traducirGolang();
        }
        else if(tipo==Tipo_operacion.NEGATIVO) {
        	return "-" +  operadorIzq.traducirGolang();
        }
    	
    	/*OPERACIONES RELACIONALES*/
        else if(tipo==Tipo_operacion.MAYOR) {
        	return operadorIzq.traducirGolang() + ">" + operadorDer.traducirGolang();
        }
        else if(tipo==Tipo_operacion.MENOR) {
        	return operadorIzq.traducirGolang() + "<" + operadorDer.traducirGolang();
        }
        else if(tipo==Tipo_operacion.MAYOR_IGUAL) {
        	return operadorIzq.traducirGolang() + ">=" + operadorDer.traducirGolang();
        }
        else if(tipo==Tipo_operacion.MENOR_IGUAL) {
        	return operadorIzq.traducirGolang() + "<=" + operadorDer.traducirGolang();
        }
        else if(tipo==Tipo_operacion.IGUAL) {
        	return operadorIzq.traducirGolang() + "==" + operadorDer.traducirGolang();
        }
        else if(tipo==Tipo_operacion.DIFERENTE) {
        	return operadorIzq.traducirGolang() + "!=" + operadorDer.traducirGolang();
        }
    	
    	/*OPERACIONES LOGICAS*/
        else if(tipo==Tipo_operacion.OR) {
        	return operadorIzq.traducirGolang() + "||" + operadorDer.traducirGolang();
        }
        else if(tipo==Tipo_operacion.AND) {
        	return operadorIzq.traducirGolang() + "&&" + operadorDer.traducirGolang();
        }
        else if(tipo==Tipo_operacion.NOT) {
        	return "!" + operadorIzq.traducirGolang();
        }
    	
    	/*IDENTIFICADOR*/
        else if(tipo==Tipo_operacion.IDENTIFICADOR) {
        	return valor.toString();
        }
    	//TODO: Llamadas de funciones y metodos
        else{
            return "";
        }
    }

	@Override
	public String traducirPython() {
		// TODO Auto-generated method stub
		return null;
	}
    
}
