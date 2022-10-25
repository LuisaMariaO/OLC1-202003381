import { Instruccion } from '../Abstract/Instruccion';
import Arbol from '../Symbol/Three';
import tablaSimbolo from '../Symbol/SymbolTable';
import Tipo, {DataType} from '../Symbol/Type';
import Errorr from '../Exceptions/Error'
import { isGeneratorFunction } from 'util/types';
import Error from '../Exceptions/Error';
import { timeThursdays } from 'd3';

export default class Aritmetico extends Instruccion {
  operacionIzq: Instruccion;
  operacionDer: Instruccion;
  tipo: tipoOp;
  

  constructor(tipo: tipoOp, opIzq: Instruccion, opDer: Instruccion, fila: number, columna: number) {
    super(new Tipo(DataType.INDEFINIDO), fila, columna);
    this.tipo = tipo;
    this.operacionIzq = opIzq;
    this.operacionDer = opDer;
  }

  interpretar(arbol: Arbol, tabla: tablaSimbolo) {
    /*********************************SUMA*******************************************************/
        if(this.tipo===tipoOp.SUMA){
            let valueIzq = this.operacionIzq.interpretar(arbol, tabla);
            let valueDer = this.operacionDer.interpretar(arbol, tabla);
            /*FILA 1 DE LA TABLA DE SUMA INDICADA EN EL ENUNCIADO*/ 
            if(this.operacionIzq.tipoDato.getTipo() === DataType.ENTERO){
                if(this.operacionDer.tipoDato.getTipo() === DataType.ENTERO){
                    this.tipoDato.setTipo(DataType.ENTERO);
                    return (Number(valueIzq)+Number(valueDer));}
                else if(this.operacionDer.tipoDato.getTipo() == DataType.DECIMAL){
                    this.tipoDato.setTipo(DataType.DECIMAL);
                    return (Number(valueIzq)+Number(valueDer));
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.BOOLEANO){
                    this.tipoDato.setTipo(DataType.ENTERO);
                    //Si el valor booleano es verdadero, se convierte en 1, de lo contrario es 0
                    if(valueDer){
                        return (Number(valueIzq) + 1);
                    }
                    else{
                        return (Number(valueIzq));
                    }
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CARACTER){
                    this.tipoDato.setTipo(DataType.ENTERO)
                    var ascii = valueDer.charCodeAt(0); //Obtengo el ascii
                    return (Number(valueIzq) + Number(ascii));
                }
                else if(this.operacionDer.tipoDato.getTipo() === DataType.CADENA){
                    this.tipoDato.setTipo(DataType.CADENA);
                    return (`${valueIzq.toString()}${valueDer.toString()}`);
                }
                else{
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Semántico<-","ENTERO + INDEFINIDO",this.linea,this.columna)
                }
            }

            /*SEGUNDA FILA DE LA TABLA*/
           
               else if(this.operacionIzq.tipoDato.getTipo() == DataType.DECIMAL) {
                    if(this.operacionDer.tipoDato.getTipo() == DataType.ENTERO){
                        this.tipoDato.setTipo(DataType.DECIMAL)
                        return(Number(valueIzq) + Number(valueDer));
                    }
                    else if(this.operacionDer.tipoDato.getTipo() == DataType.DECIMAL){
                        this.tipoDato.setTipo(DataType.DECIMAL)
                        return(Number(valueIzq) + Number(valueDer));
                    }
                    else if(this.operacionDer.tipoDato.getTipo() == DataType.BOOLEANO){
                        this.tipoDato.setTipo(DataType.DECIMAL)
                        if(valueDer){
                            return(Number(valueIzq) + 1)
                        }
                        else{
                            return (Number(valueIzq));
                        }
                    }
                    else if(this.operacionDer.tipoDato.getTipo() == DataType.CARACTER){
                        this.tipoDato.setTipo(DataType.DECIMAL)
                        var ascii = valueDer.charCodeAt(0); //Obtengo el ascii
                        return(Number(valueIzq)+Number(ascii));
                    }
                    else if(this.operacionDer.tipoDato.getTipo() == DataType.CADENA){
                        this.tipoDato.setTipo(DataType.CADENA);
                        return (`${valueIzq.toString()}${valueDer.toString()}`);
                    }

                    else{
                        this.tipoDato.setTipo(DataType.INDEFINIDO)
                        return new Errorr("->Error Semántico<-","ENTERO + INDEFINIDO",this.linea,this.columna)
                    }
                    
             /* TERCERA FILA DE LA TABLA */   
            } else if(this.operacionIzq.tipoDato.getTipo() == DataType.BOOLEANO){
                if(this.operacionDer.tipoDato.getTipo() == DataType.ENTERO){
                    this.tipoDato.setTipo(DataType.ENTERO)
                    if(valueIzq){
                        return(1 + Number(valueDer))
                    }
                    else{
                        return (Number(valueDer))
                    }
                }
                else if (this.operacionDer.tipoDato.getTipo() == DataType.DECIMAL){
                    this.tipoDato.setTipo(DataType.DECIMAL)
                    if(valueIzq){
                        return(1 + Number(valueDer))
                    }
                    else{
                        return Number(valueDer)
                    }
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.BOOLEANO){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Semántico<-","BOOLEAN + BOOLEAN",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CARACTER){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Semántico<-","BOOLEAN + CARACTER",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CADENA){
                    this.tipoDato.setTipo(DataType.CADENA);
                    return (`${valueIzq.toString()}${valueDer.toString()}`);
                }
                else{
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Semántico<-","ENTERO + INDEFINIDO",this.linea,this.columna)
                }
            /*CUARTA FILA DE LA TABLA*/
            } else if(this.operacionIzq.tipoDato.getTipo() == DataType.CARACTER){
                if(this.operacionDer.tipoDato.getTipo() == DataType.ENTERO){
                    this.tipoDato.setTipo(DataType.ENTERO)
                    let ascii = valueIzq.charCodeAt(0)
                    return(Number(ascii)+Number(valueDer))
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.DECIMAL){
                    this.tipoDato.setTipo(DataType.DECIMAL)
                    let ascii = valueIzq.charCodeAt(0)
                    return(Number(ascii) + Number(valueDer))
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.BOOLEANO){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Semántico<-","CARACTER + BOOLEAN",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CARACTER){
                    this.tipoDato.setTipo(DataType.CADENA)
                    return (`${valueIzq.toString()}${valueDer.toString()}`);
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CADENA){
                    this.tipoDato.setTipo(DataType.CADENA)
                    return (`${valueIzq.toString()}${valueDer.toString()}`);
                }
                else{
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Semántico<-","ENTERO + INDEFINIDO",this.linea,this.columna) 
                }
            }
            /**QUINTA FILA DE LA TABLA */
            else if(this.operacionIzq.tipoDato.getTipo() == DataType.CADENA){
                if(this.operacionDer.tipoDato.getTipo() == DataType.INDEFINIDO){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Semántico<-","ENTERO + INDEFINIDO",this.linea,this.columna) 
                }
                else{
                    this.tipoDato.setTipo(DataType.CADENA)
                    return (`${valueIzq.toString()}${valueDer.toString()}`);
                }
            }
            else{
                this.tipoDato.setTipo(DataType.INDEFINIDO)
                return new Errorr("->Error Semántico<-","INDEFINIDO+VALOR",this.linea,this.columna) 
            }

        /*************************************RESTA********************************************/
        } else if(this.tipo===tipoOp.RESTA){    
            let valueIzq = this.operacionIzq.interpretar(arbol, tabla);
            let valueDer = this.operacionDer.interpretar(arbol, tabla);
            /**PRIMERA FILA DE LA TABLA DE RESTA DEL ENUNCIADO */
            if(this.operacionIzq.tipoDato.getTipo() === DataType.ENTERO){
                if(this.operacionDer.tipoDato.getTipo() === DataType.ENTERO){
                    this.tipoDato.setTipo(DataType.ENTERO)
                    return (Number(valueIzq)-Number(valueDer));
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.DECIMAL){
                    this.tipoDato.setTipo(DataType.DECIMAL)
                    return(Number(valueIzq)-Number(valueDer))
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.BOOLEANO){
                    
                    this.tipoDato.setTipo(DataType.ENTERO)
                    if(valueDer){
                        return (Number(valueIzq) - 1)
                    }
                    else{
                        return Number(valueIzq)
                    }
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CARACTER){
                    this.tipoDato.setTipo(DataType.ENTERO)
                    let ascii = valueDer.charCodeAt(0)
                    return(Number(valueIzq) - Number(ascii))
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CADENA){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Semántico<-","ENTERO - CADENA",this.linea,this.columna)
                }
                else{
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Semántico<-","ENTERO - INDEFINIDO",this.linea, this.columna)
                }
                
            }
            /**SEGUNDA FILA DE LA TABLA */
            else if(this.operacionIzq.tipoDato.getTipo() == DataType.DECIMAL){
                if(this.operacionDer.tipoDato.getTipo() == DataType.ENTERO){
                    this.tipoDato.setTipo(DataType.DECIMAL)
                    return(Number(valueIzq) - Number(valueDer))
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.DECIMAL){
                    this.tipoDato.setTipo(DataType.DECIMAL)
                    return(Number(valueIzq) - Number(valueDer))
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.BOOLEANO){
                    this.tipoDato.setTipo(DataType.DECIMAL)
                    if(valueDer){
                        return (Number(valueIzq) - 1)
                    }
                    else{
                        return Number(valueIzq)
                    }
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CARACTER){
                    this.tipoDato.setTipo(DataType.DECIMAL)
                    let ascii = valueDer.charCodeAt(0)
                    return(Number(valueIzq) - Number(ascii))
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CADENA){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Semántico<-","DECIMAL - CADENA",this.linea,this.columna)
                }
                else{
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Semántico<-","DECIMAL - INDEFINIDO",this.linea,this.columna)
                }
                
            }
            /**TERCER FILA DE LA TABLA */
            else if(this.operacionIzq.tipoDato.getTipo() == DataType.BOOLEANO){
                if(this.operacionDer.tipoDato.getTipo() == DataType.ENTERO){
                this.tipoDato.setTipo(DataType.ENTERO)
                if(valueIzq){
                    return(1 - Number(valueDer))
                }
                else{
                    return (0 - Number(valueDer))
                }
            }
            else if(this.operacionDer.tipoDato.getTipo() == DataType.DECIMAL){
                this.tipoDato.setTipo(DataType.DECIMAL)
                if(valueIzq){
                    return(1 - Number(valueDer))
                }
                else{
                    return(0 - Number(valueDer))
                }
            }
            else if(this.operacionDer.tipoDato.getTipo() == DataType.BOOLEANO){
                this.tipoDato.setTipo(DataType.INDEFINIDO)
                return new Errorr("->Error Semántico<-","BOOLEAN - BOOLEAN",this.linea,this.columna)
            }
            else if(this.operacionDer.tipoDato.getTipo() == DataType.CARACTER){
                this.tipoDato.setTipo(DataType.INDEFINIDO)
                return new Errorr("->Error Semántico<-","BOOLEAN - CARACTER", this.linea,this.columna)                
            }
            else if(this.operacionDer.tipoDato.getTipo() == DataType.CADENA){
                this.tipoDato.setTipo(DataType.INDEFINIDO)
                return new Errorr("->Error Semántico<-","BOOLEAN - CADENA",this.linea, this.columna)
            }
            else{
                this.tipoDato.setTipo(DataType.INDEFINIDO)
                return new Errorr("->Error Semántico<-","BOOLEAN - INDEFINIDO",this.linea, this.columna)
            }
            }
            /**CUARTA FILA DE TABLA */
            else if(this.operacionIzq.tipoDato.getTipo() == DataType.CARACTER){
                if(this.operacionDer.tipoDato.getTipo() == DataType.ENTERO){
                    this.tipoDato.setTipo(DataType.ENTERO)
                    let ascii = valueIzq.charCodeAt(0)
                    return(Number(ascii) - Number(valueDer))
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.DECIMAL){
                    this.tipoDato.setTipo(DataType.DECIMAL)
                    let ascii = valueIzq.charCodeAt(0)
                    return(Number(ascii) - Number(valueDer))
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.BOOLEANO){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Semántico<-","CARACTER - BOOLEANO",this.linea, this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CARACTER){
                    this.tipoDato.setTipo(DataType.ENTERO)
                    let ascii1 = valueIzq.charCodeAt(0)
                    let ascii2 = valueDer.charCodeAt(0)
                    return(Number(ascii1) - Number(ascii2))
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CADENA){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Semántico<-","CARACTER - CADENA",this.linea, this.columna)
                }
                else{
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Semántico<-","CARACTER - INDEFINIDO",this.linea,this.columna)
                }
            }
            /**QUINTA FILA DE LA TABLA **/
            else if(this.operacionIzq.tipoDato.getTipo() == DataType.CADENA){
                this.tipoDato.setTipo(DataType.INDEFINIDO)
                if(this.operacionDer.tipoDato.getTipo() == DataType.ENTERO){
                    return new Errorr("->Error Semántico<-","CADENA - ENTERO",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.DECIMAL){
                    return new Errorr("->Error Semántico<-","CADENA - DECIMAL",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.BOOLEANO){
                    return new Errorr("->Error Semántico<-","CADENA - BOOLEAN",this.linea, this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CARACTER){
                    return new Errorr("->Error Semántico<-","CADENA - CARACTER",this.linea, this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CADENA){
                    return new Errorr("->Error Semántico<-","CADENA - CADENA",this.linea, this.columna)
                }
                else{
                    return new Errorr("->Error Semántico<-","CADENA - INDEFINIDO",this.linea, this.columna)
                }
            }
        } 
        /************************************MULTIPLICACION *********************************/
        else if(this.tipo==tipoOp.MULTIPLICACION){
            let valueIzq = this.operacionIzq.interpretar(arbol, tabla);
            let valueDer = this.operacionDer.interpretar(arbol, tabla);
            if(this.operacionIzq.tipoDato.getTipo() == DataType.ENTERO){
                if(this.operacionDer.tipoDato.getTipo() == DataType.ENTERO){
                    this.tipoDato.setTipo(DataType.ENTERO)
                    return (Number(valueIzq) * Number(valueDer))
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.DECIMAL){
                    this.tipoDato.setTipo(DataType.DECIMAL)
                    return(Number(valueIzq) * Number(valueDer))
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.BOOLEANO){
                    this.tipoDato.setTipo(DataType.ENTERO)
                    if(valueDer){
                        return(Number(valueIzq) * 1)
                    }
                    else{
                        return(Number(valueIzq) * 0)
                    }
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CARACTER){
                    this.tipoDato.setTipo(DataType.ENTERO)
                    let ascii = valueDer.charCodeAt(0)
                    return(Number(valueIzq) * ascii)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CADENA){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Semántico<-","ENTERO * CADENA",this.linea, this.columna)
                }
                else{
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Semántico<-","ENTRO * INDEFINIDO",this.linea, this.columna)
                }
            }
            /*SEGUNDA FILA DE LA TABLA*/
            else if(this.operacionIzq.tipoDato.getTipo() == DataType.DECIMAL){
                if(this.operacionDer.tipoDato.getTipo() == DataType.ENTERO){
                    this.tipoDato.setTipo(DataType.DECIMAL)
                    return(Number(valueIzq) * Number(valueDer))
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.DECIMAL){
                    this.tipoDato.setTipo(DataType.DECIMAL)
                    return (Number(valueIzq) * Number(valueDer))
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.BOOLEANO){
                    this.tipoDato.setTipo(DataType.DECIMAL)
                    if(valueDer){
                        return (Number(valueIzq) * 1)
                    }
                    else{
                        return(Number(valueIzq) * 0)
                    }
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CARACTER){
                    this.tipoDato.setTipo(DataType.DECIMAL)
                    let ascii = valueDer.charCodeAt(0)
                    return(Number(valueIzq) * Number(ascii))
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CADENA){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Semántico<-","DECIMAL * CADENA",this.linea, this.columna)
                }
                else{
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Semánticp<-","DECIMAL * INDEFINIDO",this.linea, this.columna)
                }
            }
            /*TERCERA FILA DE LA TABLA*/
            else if(this.operacionIzq.tipoDato.getTipo() == DataType.BOOLEANO){
                if(this.operacionDer.tipoDato.getTipo() == DataType.ENTERO){
                    this.tipoDato.setTipo(DataType.ENTERO)
                    if(valueIzq){
                        return (1*Number(valueDer))
                    }
                    else{
                        return(0*Number(valueDer))
                    }
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.DECIMAL){
                    this.tipoDato.setTipo(DataType.DECIMAL)
                    if(valueIzq){
                        return(1*Number(valueDer))
                    }
                    else{
                        return(0*Number(valueDer))
                    }
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.BOOLEANO){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Semántico<-","BOOLEAN * BOOLEAN",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CARACTER){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Semántico<-","BOOLEAN * CARACTER",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CADENA){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Semántico<-","BOOLEAN * CADENA",this.linea,this.columna)
                }
                else{
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Semántico<-","BOOLEAN * INDEFINIDO",this.linea,this.columna)
                }
            }
            /**CUARTA FILA DE LA TABLA**/
            else if(this.operacionIzq.tipoDato.getTipo() == DataType.CARACTER){
                if(this.operacionDer.tipoDato.getTipo() == DataType.ENTERO){
                    this.tipoDato.setTipo(DataType.ENTERO)
                    let ascii = valueIzq.charCodeAt(0)
                    return (Number(ascii) * Number(valueDer))
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.DECIMAL){
                    this.tipoDato.setTipo(DataType.DECIMAL)
                    let ascii = valueIzq.charCodeAt(0)
                    return (Number(ascii) * Number(valueDer))
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.BOOLEANO){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Semántico<-","CARACTER * BOOLEAN",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CARACTER){
                    this.tipoDato.setTipo(DataType.ENTERO)
                    let ascii1=valueIzq.charCodeAt(0)
                    let ascii2=valueDer.charCodeAt(0)
                    return (Number(ascii1) * Number(ascii2))
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CADENA){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Semántico<-","CARACTER * CADENA",this.linea,this.columna)
                }
                else{
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Semántico<-","CARACTER * CARACTER",this.linea,this.columna)
                }
            }
            /******************************QUINTA FILA DE LA TABLA*************************************/
            else if(this.operacionIzq.tipoDato.getTipo() == DataType.CADENA){
                this.tipoDato.setTipo(DataType.INDEFINIDO)
                if(this.operacionDer.tipoDato.getTipo() == DataType.ENTERO){
                    return new Errorr("->Error Semántico<-","CADENA * ENTERO",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.DECIMAL){
                    return new Errorr("->Error Semántico<-","CADENA * DECIMAL",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.BOOLEANO){
                 return new Errorr("->Error Semántico<-","CADENA * BOOLEAN",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CARACTER){
                    return new Errorr("->Error Semántico<-","CADENA * CARACTER",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CADENA){
                    return new Errorr("->Error Semántico<-","CADENA * CADENA",this.linea,this.columna)
                }
                else{
                    return new Errorr("->Error Semántico<-","CADENA * INDEFINIDO",this.linea,this.columna)
                }
            }

            
        }
        /*********************************************DIVISION***************************************/
        if(this.tipo==tipoOp.DIVISION){
            let valueIzq = this.operacionIzq.interpretar(arbol, tabla);
            let valueDer = this.operacionDer.interpretar(arbol, tabla);
            if(this.operacionIzq.tipoDato.getTipo() == DataType.ENTERO){
                if(this.operacionDer.tipoDato.getTipo() == DataType.ENTERO){
                    this.tipoDato.setTipo(DataType.DECIMAL)
                    if(Number(valueDer)==0){
                        return new Error("->Error Semántico<-","DIVISION EN 0",this.linea,this.columna)
                    }
                    else{
                        return(Number(valueIzq) / Number(valueDer))
                    }
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.DECIMAL){
                    this.tipoDato.setTipo(DataType.DECIMAL)
                    if(Number(valueDer)==0){
                        return new Error("->Error Semántico<-","DIVISION EN 0",this.linea,this.columna)
                    }
                    else{
                        return(Number(valueIzq) / Number(valueDer))
                    }
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.BOOLEANO){
                    this.tipoDato.setTipo(DataType.DECIMAL)
                    if(!valueDer){
                        return new Error("->Error Semántico<-","DIVISION EN 0",this.linea,this.columna)
                    }
                    else{
                        return(Number(valueIzq) / 1)
                    }
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CARACTER){
                    this.tipoDato.setTipo(DataType.DECIMAL)
                    let ascii = valueDer.charCodeAt(0)
                    return (Number(valueIzq) / Number(ascii))
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CADENA){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Semántico<-","ENTERO / CADENA",this.linea,this.columna)
                }
                else{
                    return new Errorr("->Error Semántico<-","ENTERO / INDEFINIDO",this.linea,this.columna)
                }
            }
            /**SEGUNDA FILA DE LA TABLA**/
            else if(this.operacionIzq.tipoDato.getTipo() == DataType.DECIMAL){
                if(this.operacionDer.tipoDato.getTipo() == DataType.ENTERO){
                    this.tipoDato.setTipo(DataType.DECIMAL)
                    if(Number(valueDer)==0){
                        return new Error("->Error Semántico<-","DIVISION EN 0",this.linea,this.columna)
                    }
                    else{
                        return(Number(valueIzq) / Number(valueDer))
                    }
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.DECIMAL){
                    this.tipoDato.setTipo(DataType.DECIMAL)
                    if(Number(valueDer)==0){
                        return new Error("->Error Semántico<-","DIVISION EN 0",this.linea,this.columna)
                    }
                    else{
                        return(Number(valueIzq) / Number(valueDer))
                    }
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.BOOLEANO){
                    this.tipoDato.setTipo(DataType.DECIMAL)
                    if(!valueDer){
                        return new Error("->Error Semántico<-","DIVISION EN 0",this.linea,this.columna)
                    }
                    else{
                        return(Number(valueIzq) / 1)
                    }
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CARACTER){
                    this.tipoDato.setTipo(DataType.DECIMAL)
                    let ascii = valueDer.charCodeAt(0)
                    return (Number(valueIzq) / Number(ascii))
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CADENA){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Semántico<-","DECIMAL / CADENA",this.linea,this.columna)
                }
                else{
                    return new Errorr("->Error Semántico<-","DECIMAL / INDEFINIDO",this.linea,this.columna)
                }
            }
            /**TERCERA FILA DE LA TABLA**/
            else if(this.operacionIzq.tipoDato.getTipo() == DataType.BOOLEANO){
                if(this.operacionDer.tipoDato.getTipo() == DataType.ENTERO || this.operacionDer.tipoDato.getTipo() == DataType.DECIMAL){
                this.tipoDato.setTipo(DataType.DECIMAL)
                if(valueIzq){
                    return (1/Number(valueDer))
                }
                else{
                    return(0/Number(valueDer))
                }
            }
            else if(this.operacionDer.tipoDato.getTipo() == DataType.BOOLEANO){
                this.tipoDato.setTipo(DataType.INDEFINIDO)
                return new Errorr("->Error Semántico<-","BOOLEAN / BOOLEAN",this.linea,this.columna)
            }
            else if(this.operacionDer.tipoDato.getTipo() == DataType.CARACTER){
                this.tipoDato.setTipo(DataType.INDEFINIDO)
                return new Errorr("->Error Semántico<-","BOOLEAN / CARACTER",this.linea,this.columna)
            }
            else if(this.operacionDer.tipoDato.getTipo() == DataType.CADENA){
                this.tipoDato.setTipo(DataType.INDEFINIDO)
                return new Errorr("->Error Semántico<-","BOOLEAN / CADENA",this.linea,this.columna)
            }
            else{
                this.tipoDato.setTipo(DataType.INDEFINIDO)
                return new Errorr("->Error Semántico<-","BOOLEAN / INDEFINIDO",this.linea,this.columna)
            }
            }

            /**************************CUARTA FILA DE LA TABLA**************************************/
            else if(this.operacionIzq.tipoDato.getTipo() == DataType.CARACTER){
                if(this.operacionDer.tipoDato.getTipo() == DataType.ENTERO || this.operacionDer.tipoDato.getTipo() == DataType.DECIMAL){
                    this.tipoDato.setTipo(DataType.DECIMAL)
                    let ascii = valueIzq.charCodeAt(0)
                    return(Number(ascii) / Number(valueDer))
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.BOOLEANO){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Error("->Error Semántico<-","CARACTER / BOOLEAN",this.linea, this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CARACTER){
                    this.tipoDato.setTipo(DataType.DECIMAL)
                    let ascii1 = valueIzq.charCodeAt(0)
                    let ascii2 = valueDer.charCodeAt(0)
                    return (Number(ascii1) / Number(ascii2))
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CADENA){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Error("->Error Semántico<-","CARACTER / CADENA",this.linea, this.columna)
                }
                else{
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Error("->Error Semántico<-","CARACTER / INDEFINIDO",this.linea, this.columna)
                }
            }
            /***QUINTA FILA DE LA TABLA***/
            else if(this.operacionIzq.tipoDato.getTipo() == DataType.CADENA){
                if(this.operacionDer.tipoDato.getTipo() == DataType.ENTERO){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Error("->Error Semántico<-","CADENA / ENTERO",this.linea, this.columna)
                } else if(this.operacionDer.tipoDato.getTipo() == DataType.DECIMAL){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Error("->Error Semántico<-","CADENA / DECIMAL",this.linea, this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.BOOLEANO){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Error("->Error Semántico<-","CADENA / BOOLEAN",this.linea, this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CARACTER){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Error("->Error Semántico<-","CADENA / CARACTER",this.linea, this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CADENA){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Error("->Error Semántico<-","CADENA / CADENA",this.linea, this.columna)
                }
                else{
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Error("->Error Semántico<-","CADENA / INDEFINIDO",this.linea, this.columna)
                }
                
            }
        
        }
        /**************************************POTENCIA*********************************************/
        else if(this.tipo==tipoOp.POTENCIA){
            let valueIzq = this.operacionIzq.interpretar(arbol, tabla);
            let valueDer = this.operacionDer.interpretar(arbol, tabla);
            if(this.operacionIzq.tipoDato.getTipo()==DataType.ENTERO){
                if(this.operacionDer.tipoDato.getTipo()==DataType.ENTERO){
                this.tipoDato.setTipo(DataType.ENTERO)
                return(Math.pow(Number(valueIzq),Number(valueDer)))
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.DECIMAL){
                    this.tipoDato.setTipo(DataType.DECIMAL)
                    return(Math.pow(Number(valueIzq),Number(valueDer)))
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.BOOLEANO){
                    this.tipoDato.setTipo(DataType.ENTERO)
                    if(valueDer){
                        return(Math.pow(Number(valueIzq),1))
                    }
                    else{
                        return(Math.pow(Number(valueIzq),0))
                    }
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CARACTER){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Semántico<-","ENTERO ^ CARACTER",this.linea, this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CADENA){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Semántico<-","ENTERO ^ CADENA",this.linea, this.columna)
                }
                else{
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Semántico<-","ENTERO ^ INDEFINIDO",this.linea, this.columna)
                }
            }
            /*SEGUNDA FILA DE LA TABLA*/
            else if(this.operacionIzq.tipoDato.getTipo() == DataType.DECIMAL){
                if(this.operacionDer.tipoDato.getTipo()==DataType.ENTERO || this.operacionDer.tipoDato.getTipo()==DataType.DECIMAL){
                    this.tipoDato.setTipo(DataType.DECIMAL)
                    return (Math.pow(Number(valueIzq),Number(valueDer)))
                }
                else if(this.operacionDer.tipoDato.getTipo()==DataType.BOOLEANO){
                    this.tipoDato.setTipo(DataType.DECIMAL)
                    if(valueDer){
                        return(Math.pow(Number(valueIzq),1))
                    }
                    else{
                        return(Math.pow(Number(valueIzq),0))
                    }
                }
                else if(this.operacionDer.tipoDato.getTipo()==DataType.CARACTER){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Semántico<-","DECIMAL ^ CARACTER",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo()==DataType.CADENA){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Semántico<-","DECIMAL ^ CADENA",this.linea,this.columna)
                }
                else{
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Semántico<-","DECIMAL ^ INDEFINIDO",this.linea,this.columna)
                }
            }
        }
        return null;
  }
}

export enum tipoOp{
    SUMA,
    RESTA,
    MULTIPLICACION,
    DIVISION,
    POTENCIA,
    MODULO,
    NEGACION
}