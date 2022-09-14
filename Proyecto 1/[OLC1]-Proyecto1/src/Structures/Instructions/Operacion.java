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
        /*OPERACIONES ARITMÉTICAS*/
        if(tipo==Tipo_operacion.SUMA){
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
