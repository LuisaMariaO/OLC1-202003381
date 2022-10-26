import { Instruccion } from '../Abstract/Instruccion';
import Arbol from '../Symbol/Three';
import tablaSimbolo from '../Symbol/SymbolTable';
import Tipo, {DataType} from '../Symbol/Type';
import Errorr from '../Exceptions/Error'
import { isGeneratorFunction } from 'util/types';
import Error from '../Exceptions/Error';
import { identity } from 'lodash';

export default class Relacional extends Instruccion {
  operacionIzq: Instruccion;
  operacionDer: Instruccion;
  tipo: tipoOp;
  condicion: Instruccion|null
  

  constructor(tipo: tipoOp, opIzq: Instruccion, opDer: Instruccion, condicion:Instruccion|null,fila: number, columna: number) {
    super(new Tipo(DataType.INDEFINIDO), fila, columna);
    this.tipo = tipo;
    this.operacionIzq = opIzq;
    this.operacionDer = opDer;
    this.condicion = condicion

  }

  interpretar(arbol: Arbol, tabla: tablaSimbolo) {
    /*******************************************MAYOR*******************************************************/
        if(this.tipo== tipoOp.MAYOR){
            let valueIzq = this.operacionIzq.interpretar(arbol, tabla);
            let valueDer = this.operacionDer.interpretar(arbol, tabla);
            /*FILA 1 DE LA TABLA DE SUMA INDICADA EN EL ENUNCIADO*/ 
            if(this.operacionIzq.tipoDato.getTipo() ==  DataType.ENTERO){
                if(this.operacionDer.tipoDato.getTipo() ==  DataType.ENTERO){
                    this.tipoDato.setTipo(DataType.BOOLEANO);
                    return (Number(valueIzq) > Number(valueDer));}
                else if(this.operacionDer.tipoDato.getTipo() == DataType.DECIMAL){
                    this.tipoDato.setTipo(DataType.BOOLEANO);
                    return (Number(valueIzq) > Number(valueDer));
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.BOOLEANO){
                    this.tipoDato.setTipo(DataType.INDEFINIDO);
                    return new Errorr("->Error Semántico<-","ENTERO > BOOLEAN",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CARACTER){
                    this.tipoDato.setTipo(DataType.BOOLEANO)
                    var ascii = valueDer.charCodeAt(0); //Obtengo el ascii
                    return (Number(valueIzq) > Number(ascii));
                }
                else if(this.operacionDer.tipoDato.getTipo() ==  DataType.CADENA){
                    this.tipoDato.setTipo(DataType.INDEFINIDO);
                    return new Errorr("->Error Semántico<-","ENTERO > CADENA",this.linea,this.columna)
            }
            else{
                this.tipoDato.setTipo(DataType.INDEFINIDO)
                 return new Errorr("->Error Semántico<-","ENTERO > INDEFINIDO",this.linea,this.columna)
            }
        }

            /*SEGUNDA FILA DE LA TABLA*/
           
               else if(this.operacionIzq.tipoDato.getTipo() == DataType.DECIMAL) {
                    if(this.operacionDer.tipoDato.getTipo() == DataType.ENTERO){
                        this.tipoDato.setTipo(DataType.BOOLEANO)
                        return(Number(valueIzq) > Number(valueDer));
                    }
                    else if(this.operacionDer.tipoDato.getTipo() == DataType.DECIMAL){
                        this.tipoDato.setTipo(DataType.BOOLEANO)
                        return(Number(valueIzq) > Number(valueDer));
                    }
                    else if(this.operacionDer.tipoDato.getTipo() == DataType.BOOLEANO){
                        this.tipoDato.setTipo(DataType.INDEFINIDO)
                        return new Errorr("->Error Semántico<-","DECIMAL > BOOLEAN",this.linea,this.columna)
                    }
                    else if(this.operacionDer.tipoDato.getTipo() == DataType.CARACTER){
                        this.tipoDato.setTipo(DataType.BOOLEANO)
                        var ascii = valueDer.charCodeAt(0); //Obtengo el ascii
                        return(Number(valueIzq) > Number(ascii));
                    }
                    else if(this.operacionDer.tipoDato.getTipo() == DataType.CADENA){
                        this.tipoDato.setTipo(DataType.INDEFINIDO)
                        return new Errorr("->Error Semántico<-","DECIMAL > CADENA",this.linea,this.columna)
                    }

                    else{
                        this.tipoDato.setTipo(DataType.INDEFINIDO)
                        return new Errorr("->Error Semántico<-","DECIMAL > INDEFINIDO",this.linea,this.columna)
                    }
                    
             /* TERCERA FILA DE LA TABLA */   
            } else if(this.operacionIzq.tipoDato.getTipo() == DataType.BOOLEANO){
                if(this.operacionDer.tipoDato.getTipo() == DataType.ENTERO){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Semántico<-","BOOLEAN > ENTERO",this.linea,this.columna)
                }
                else if (this.operacionDer.tipoDato.getTipo() == DataType.DECIMAL){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Semántico<-","BOOLEAN > DECIMAL",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.BOOLEANO){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Semántico<-","BOOLEAN > BOOLEAN",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CARACTER){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Semántico<-","BOOLEAN > CARACTER",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CADENA){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Semántico<-","BOOLEAN > CADENA",this.linea,this.columna)
                }
                else{
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Semántico<-","BOOLEAN > INDEFINIDO",this.linea,this.columna)
                }
            /*CUARTA FILA DE LA TABLA*/
            } else if(this.operacionIzq.tipoDato.getTipo() == DataType.CARACTER){
                if(this.operacionDer.tipoDato.getTipo() == DataType.ENTERO){
                    this.tipoDato.setTipo(DataType.BOOLEANO)
                    let ascii = valueIzq.charCodeAt(0)
                    return(Number(ascii) > Number(valueDer))
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.DECIMAL){
                    this.tipoDato.setTipo(DataType.DECIMAL)
                    let ascii = valueIzq.charCodeAt(0)
                    return(Number(ascii) > Number(valueDer))
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.BOOLEANO){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Semántico<-","CARACTER > BOOLEAN",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CARACTER){
                    this.tipoDato.setTipo(DataType.BOOLEANO)
                    let ascii1 = valueIzq.charCodeAt(0)
                    let ascii2 = valueDer.charCodeAt(0)
                    return (Number(ascii1) > Number(ascii2));
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CADENA){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Semántico<-","CARACTER > CADENA",this.linea,this.columna)
                }
                else{
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Semántico<-","CARACTER > INDEFINIDO",this.linea,this.columna)
                }
            }
            /**QUINTA FILA DE LA TABLA */
            else if(this.operacionIzq.tipoDato.getTipo() == DataType.CADENA){
                if(this.operacionDer.tipoDato.getTipo() == DataType.ENTERO){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Semántico<-","CADENA > ENTERO",this.linea,this.columna)
                }
                else if (this.operacionDer.tipoDato.getTipo() == DataType.DECIMAL){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Semántico<-","CADENA > DECIMAL",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.BOOLEANO){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Semántico<-","CADENA > BOOLEAN",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CARACTER){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Semántico<-","CADENA > CARACTER",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CADENA){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Semántico<-","CADENA > CADENA",this.linea,this.columna)
                }
                else{
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Semántico<-","CADENA > INDEFINIDO",this.linea,this.columna)
                }
            }
            

        /*********************************************MENOR***********************************************/
        } else if(this.tipo== tipoOp.MENOR){    
            let valueIzq = this.operacionIzq.interpretar(arbol, tabla);
            let valueDer = this.operacionDer.interpretar(arbol, tabla);
            if(this.operacionIzq.tipoDato.getTipo() ==  DataType.ENTERO){
                if(this.operacionDer.tipoDato.getTipo() ==  DataType.ENTERO){
                    this.tipoDato.setTipo(DataType.BOOLEANO);
                    return (Number(valueIzq) < Number(valueDer));}
                else if(this.operacionDer.tipoDato.getTipo() == DataType.DECIMAL){
                    this.tipoDato.setTipo(DataType.BOOLEANO);
                    return (Number(valueIzq) < Number(valueDer));
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.BOOLEANO){
                    this.tipoDato.setTipo(DataType.INDEFINIDO);
                    return new Errorr("->Error Semántico<-","ENTERO < BOOLEAN",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CARACTER){
                    this.tipoDato.setTipo(DataType.BOOLEANO)
                    var ascii = valueDer.charCodeAt(0); //Obtengo el ascii
                    return (Number(valueIzq) < Number(ascii));
                }
                else if(this.operacionDer.tipoDato.getTipo() ==  DataType.CADENA){
                    this.tipoDato.setTipo(DataType.INDEFINIDO);
                    return new Errorr("->Error Semántico<-","ENTERO < CADENA",this.linea,this.columna)
            }
            else{
                this.tipoDato.setTipo(DataType.INDEFINIDO)
                 return new Errorr("->Error Semántico<-","ENTERO < INDEFINIDO",this.linea,this.columna)
            }
        }

            /*SEGUNDA FILA DE LA TABLA*/
           
               else if(this.operacionIzq.tipoDato.getTipo() == DataType.DECIMAL) {
                    if(this.operacionDer.tipoDato.getTipo() == DataType.ENTERO){
                        this.tipoDato.setTipo(DataType.BOOLEANO)
                        return(Number(valueIzq) < Number(valueDer));
                    }
                    else if(this.operacionDer.tipoDato.getTipo() == DataType.DECIMAL){
                        this.tipoDato.setTipo(DataType.BOOLEANO)
                        return(Number(valueIzq) < Number(valueDer));
                    }
                    else if(this.operacionDer.tipoDato.getTipo() == DataType.BOOLEANO){
                        this.tipoDato.setTipo(DataType.INDEFINIDO)
                        return new Errorr("->Error Semántico<-","DECIMAL < BOOLEAN",this.linea,this.columna)
                    }
                    else if(this.operacionDer.tipoDato.getTipo() == DataType.CARACTER){
                        this.tipoDato.setTipo(DataType.BOOLEANO)
                        var ascii = valueDer.charCodeAt(0); //Obtengo el ascii
                        return(Number(valueIzq) < Number(ascii));
                    }
                    else if(this.operacionDer.tipoDato.getTipo() == DataType.CADENA){
                        this.tipoDato.setTipo(DataType.INDEFINIDO)
                        return new Errorr("->Error Semántico<-","DECIMAL < CADENA",this.linea,this.columna)
                    }

                    else{
                        this.tipoDato.setTipo(DataType.INDEFINIDO)
                        return new Errorr("->Error Semántico<-","DECIMAL < INDEFINIDO",this.linea,this.columna)
                    }
                    
             /* TERCERA FILA DE LA TABLA */   
            } else if(this.operacionIzq.tipoDato.getTipo() == DataType.BOOLEANO){
                if(this.operacionDer.tipoDato.getTipo() == DataType.ENTERO){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Semántico<-","BOOLEAN < ENTERO",this.linea,this.columna)
                }
                else if (this.operacionDer.tipoDato.getTipo() == DataType.DECIMAL){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Semántico<-","BOOLEAN < DECIMAL",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.BOOLEANO){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Semántico<-","BOOLEAN < BOOLEAN",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CARACTER){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Semántico<-","BOOLEAN < CARACTER",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CADENA){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Semántico<-","BOOLEAN < CADENA",this.linea,this.columna)
                }
                else{
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Semántico<-","BOOLEAN < INDEFINIDO",this.linea,this.columna)
                }
            /*CUARTA FILA DE LA TABLA*/
            } else if(this.operacionIzq.tipoDato.getTipo() == DataType.CARACTER){
                if(this.operacionDer.tipoDato.getTipo() == DataType.ENTERO){
                    this.tipoDato.setTipo(DataType.BOOLEANO)
                    let ascii = valueIzq.charCodeAt(0)
                    return(Number(ascii) < Number(valueDer))
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.DECIMAL){
                    this.tipoDato.setTipo(DataType.DECIMAL)
                    let ascii = valueIzq.charCodeAt(0)
                    return(Number(ascii) < Number(valueDer))
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.BOOLEANO){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Semántico<-","CARACTER < BOOLEAN",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CARACTER){
                    this.tipoDato.setTipo(DataType.BOOLEANO)
                    let ascii1 = valueIzq.charCodeAt(0)
                    let ascii2 = valueDer.charCodeAt(0)
                    return (Number(ascii1) < Number(ascii2));
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CADENA){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Semántico<-","CARACTER < CADENA",this.linea,this.columna)
                }
                else{
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Semántico<-","CARACTER < INDEFINIDO",this.linea,this.columna)
                }
            }
            /**QUINTA FILA DE LA TABLA */
            else if(this.operacionIzq.tipoDato.getTipo() == DataType.CADENA){
                if(this.operacionDer.tipoDato.getTipo() == DataType.ENTERO){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Semántico<-","CADENA < ENTERO",this.linea,this.columna)
                }
                else if (this.operacionDer.tipoDato.getTipo() == DataType.DECIMAL){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Semántico<-","CADENA < DECIMAL",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.BOOLEANO){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Semántico<-","CADENA < BOOLEAN",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CARACTER){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Semántico<-","CADENA < CARACTER",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CADENA){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Semántico<-","CADENA < CADENA",this.linea,this.columna)
                }
                else{
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Semántico<-","CADENA < INDEFINIDO",this.linea,this.columna)
                }
            }
        } 
        /********************************************MAYOR IGUAL****************************************/
        else if(this.tipo==tipoOp.MAYOR_IGUAL){
            let valueIzq = this.operacionIzq.interpretar(arbol, tabla);
            let valueDer = this.operacionDer.interpretar(arbol, tabla);
            
            if(this.operacionIzq.tipoDato.getTipo() ==  DataType.ENTERO){
                if(this.operacionDer.tipoDato.getTipo() ==  DataType.ENTERO){
                    this.tipoDato.setTipo(DataType.BOOLEANO);
                    return (Number(valueIzq) >= Number(valueDer));}
                else if(this.operacionDer.tipoDato.getTipo() == DataType.DECIMAL){
                    this.tipoDato.setTipo(DataType.BOOLEANO);
                    return (Number(valueIzq) >= Number(valueDer));
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.BOOLEANO){
                    this.tipoDato.setTipo(DataType.INDEFINIDO);
                    return new Errorr("->Error Semántico<-","ENTERO >= BOOLEAN",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CARACTER){
                    this.tipoDato.setTipo(DataType.BOOLEANO)
                    var ascii = valueDer.charCodeAt(0); //Obtengo el ascii
                    return (Number(valueIzq) >= Number(ascii));
                }
                else if(this.operacionDer.tipoDato.getTipo() ==  DataType.CADENA){
                    this.tipoDato.setTipo(DataType.INDEFINIDO);
                    return new Errorr("->Error Semántico<-","ENTERO >= CADENA",this.linea,this.columna)
            }
            else{
                this.tipoDato.setTipo(DataType.INDEFINIDO)
                 return new Errorr("->Error Semántico<-","ENTERO >= INDEFINIDO",this.linea,this.columna)
            }
        }

            /*SEGUNDA FILA DE LA TABLA*/
           
               else if(this.operacionIzq.tipoDato.getTipo() == DataType.DECIMAL) {
                    if(this.operacionDer.tipoDato.getTipo() == DataType.ENTERO){
                        this.tipoDato.setTipo(DataType.BOOLEANO)
                        return(Number(valueIzq) >= Number(valueDer));
                    }
                    else if(this.operacionDer.tipoDato.getTipo() == DataType.DECIMAL){
                        this.tipoDato.setTipo(DataType.BOOLEANO)
                        return(Number(valueIzq) >= Number(valueDer));
                    }
                    else if(this.operacionDer.tipoDato.getTipo() == DataType.BOOLEANO){
                        this.tipoDato.setTipo(DataType.INDEFINIDO)
                        return new Errorr("->Error Semántico<-","DECIMAL >= BOOLEAN",this.linea,this.columna)
                    }
                    else if(this.operacionDer.tipoDato.getTipo() == DataType.CARACTER){
                        this.tipoDato.setTipo(DataType.BOOLEANO)
                        var ascii = valueDer.charCodeAt(0); //Obtengo el ascii
                        return(Number(valueIzq) >= Number(ascii));
                    }
                    else if(this.operacionDer.tipoDato.getTipo() == DataType.CADENA){
                        this.tipoDato.setTipo(DataType.INDEFINIDO)
                        return new Errorr("->Error Semántico<-","DECIMAL >= CADENA",this.linea,this.columna)
                    }

                    else{
                        this.tipoDato.setTipo(DataType.INDEFINIDO)
                        return new Errorr("->Error Semántico<-","DECIMAL >= INDEFINIDO",this.linea,this.columna)
                    }
                    
             /* TERCERA FILA DE LA TABLA */   
            } else if(this.operacionIzq.tipoDato.getTipo() == DataType.BOOLEANO){
                if(this.operacionDer.tipoDato.getTipo() == DataType.ENTERO){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Semántico<-","BOOLEAN >= ENTERO",this.linea,this.columna)
                }
                else if (this.operacionDer.tipoDato.getTipo() == DataType.DECIMAL){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Semántico<-","BOOLEAN >= DECIMAL",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.BOOLEANO){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Semántico<-","BOOLEAN >= BOOLEAN",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CARACTER){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Semántico<-","BOOLEAN >= CARACTER",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CADENA){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Semántico<-","BOOLEAN >= CADENA",this.linea,this.columna)
                }
                else{
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Semántico<-","BOOLEAN >= INDEFINIDO",this.linea,this.columna)
                }
            /*CUARTA FILA DE LA TABLA*/
            } else if(this.operacionIzq.tipoDato.getTipo() == DataType.CARACTER){
                if(this.operacionDer.tipoDato.getTipo() == DataType.ENTERO){
                    this.tipoDato.setTipo(DataType.BOOLEANO)
                    let ascii = valueIzq.charCodeAt(0)
                    return(Number(ascii) >= Number(valueDer))
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.DECIMAL){
                    this.tipoDato.setTipo(DataType.DECIMAL)
                    let ascii = valueIzq.charCodeAt(0)
                    return(Number(ascii) >= Number(valueDer))
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.BOOLEANO){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Semántico<-","CARACTER >= BOOLEAN",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CARACTER){
                    this.tipoDato.setTipo(DataType.BOOLEANO)
                    let ascii1 = valueIzq.charCodeAt(0)
                    let ascii2 = valueDer.charCodeAt(0)
                    return (Number(ascii1) >= Number(ascii2));
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CADENA){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Semántico<-","CARACTER >= CADENA",this.linea,this.columna)
                }
                else{
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Semántico<-","CARACTER >= INDEFINIDO",this.linea,this.columna)
                }
            }
            /**QUINTA FILA DE LA TABLA */
            else if(this.operacionIzq.tipoDato.getTipo() == DataType.CADENA){
                if(this.operacionDer.tipoDato.getTipo() == DataType.ENTERO){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Semántico<-","CADENA >= ENTERO",this.linea,this.columna)
                }
                else if (this.operacionDer.tipoDato.getTipo() == DataType.DECIMAL){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Semántico<-","CADENA >= DECIMAL",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.BOOLEANO){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Semántico<-","CADENA >= BOOLEAN",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CARACTER){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Semántico<-","CADENA >= CARACTER",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CADENA){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Semántico<-","CADENA >= CADENA",this.linea,this.columna)
                }
                else{
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Semántico<-","CADENA >= INDEFINIDO",this.linea,this.columna)
                }
            }
        }
        /*********************************************MENOR IGUAL***************************************/
        if(this.tipo==tipoOp.MENOR_IGUAL){
            let valueIzq = this.operacionIzq.interpretar(arbol, tabla);
            let valueDer = this.operacionDer.interpretar(arbol, tabla);
             /*FILA 1 DE LA TABLA DE SUMA INDICADA EN EL ENUNCIADO*/ 
             if(this.operacionIzq.tipoDato.getTipo() ==  DataType.ENTERO){
                if(this.operacionDer.tipoDato.getTipo() ==  DataType.ENTERO){
                    this.tipoDato.setTipo(DataType.BOOLEANO);
                    return (Number(valueIzq) <= Number(valueDer));}
                else if(this.operacionDer.tipoDato.getTipo() == DataType.DECIMAL){
                    this.tipoDato.setTipo(DataType.BOOLEANO);
                    return (Number(valueIzq) <= Number(valueDer));
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.BOOLEANO){
                    this.tipoDato.setTipo(DataType.INDEFINIDO);
                    return new Errorr("->Error Semántico<-","ENTERO <= BOOLEAN",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CARACTER){
                    this.tipoDato.setTipo(DataType.BOOLEANO)
                    var ascii = valueDer.charCodeAt(0); //Obtengo el ascii
                    return (Number(valueIzq) <= Number(ascii));
                }
                else if(this.operacionDer.tipoDato.getTipo() ==  DataType.CADENA){
                    this.tipoDato.setTipo(DataType.INDEFINIDO);
                    return new Errorr("->Error Semántico<-","ENTERO <= CADENA",this.linea,this.columna)
            }
            else{
                this.tipoDato.setTipo(DataType.INDEFINIDO)
                 return new Errorr("->Error Semántico<-","ENTERO <= INDEFINIDO",this.linea,this.columna)
            }
        }

            /*SEGUNDA FILA DE LA TABLA*/
           
               else if(this.operacionIzq.tipoDato.getTipo() == DataType.DECIMAL) {
                    if(this.operacionDer.tipoDato.getTipo() == DataType.ENTERO){
                        this.tipoDato.setTipo(DataType.BOOLEANO)
                        return(Number(valueIzq) <= Number(valueDer));
                    }
                    else if(this.operacionDer.tipoDato.getTipo() == DataType.DECIMAL){
                        this.tipoDato.setTipo(DataType.BOOLEANO)
                        return(Number(valueIzq) <= Number(valueDer));
                    }
                    else if(this.operacionDer.tipoDato.getTipo() == DataType.BOOLEANO){
                        this.tipoDato.setTipo(DataType.INDEFINIDO)
                        return new Errorr("->Error Semántico<-","DECIMAL <= BOOLEAN",this.linea,this.columna)
                    }
                    else if(this.operacionDer.tipoDato.getTipo() == DataType.CARACTER){
                        this.tipoDato.setTipo(DataType.BOOLEANO)
                        var ascii = valueDer.charCodeAt(0); //Obtengo el ascii
                        return(Number(valueIzq) <= Number(ascii));
                    }
                    else if(this.operacionDer.tipoDato.getTipo() == DataType.CADENA){
                        this.tipoDato.setTipo(DataType.INDEFINIDO)
                        return new Errorr("->Error Semántico<-","DECIMAL <= CADENA",this.linea,this.columna)
                    }

                    else{
                        this.tipoDato.setTipo(DataType.INDEFINIDO)
                        return new Errorr("->Error Semántico<-","DECIMAL <= INDEFINIDO",this.linea,this.columna)
                    }
                    
             /* TERCERA FILA DE LA TABLA */   
            } else if(this.operacionIzq.tipoDato.getTipo() == DataType.BOOLEANO){
                if(this.operacionDer.tipoDato.getTipo() == DataType.ENTERO){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Semántico<-","BOOLEAN <= ENTERO",this.linea,this.columna)
                }
                else if (this.operacionDer.tipoDato.getTipo() == DataType.DECIMAL){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Semántico<-","BOOLEAN <= DECIMAL",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.BOOLEANO){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Semántico<-","BOOLEAN <= BOOLEAN",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CARACTER){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Semántico<-","BOOLEAN <= CARACTER",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CADENA){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Semántico<-","BOOLEAN <= CADENA",this.linea,this.columna)
                }
                else{
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Semántico<-","BOOLEAN <= INDEFINIDO",this.linea,this.columna)
                }
            /*CUARTA FILA DE LA TABLA*/
            } else if(this.operacionIzq.tipoDato.getTipo() == DataType.CARACTER){
                if(this.operacionDer.tipoDato.getTipo() == DataType.ENTERO){
                    this.tipoDato.setTipo(DataType.BOOLEANO)
                    let ascii = valueIzq.charCodeAt(0)
                    return(Number(ascii) <= Number(valueDer))
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.DECIMAL){
                    this.tipoDato.setTipo(DataType.DECIMAL)
                    let ascii = valueIzq.charCodeAt(0)
                    return(Number(ascii) <= Number(valueDer))
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.BOOLEANO){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Semántico<-","CARACTER <= BOOLEAN",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CARACTER){
                    this.tipoDato.setTipo(DataType.BOOLEANO)
                    let ascii1 = valueIzq.charCodeAt(0)
                    let ascii2 = valueDer.charCodeAt(0)
                    return (Number(ascii1) <= Number(ascii2));
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CADENA){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Semántico<-","CARACTER <= CADENA",this.linea,this.columna)
                }
                else{
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Semántico<-","CARACTER <= INDEFINIDO",this.linea,this.columna)
                }
            }
            /**QUINTA FILA DE LA TABLA */
            else if(this.operacionIzq.tipoDato.getTipo() == DataType.CADENA){
                if(this.operacionDer.tipoDato.getTipo() == DataType.ENTERO){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Semántico<-","CADENA <= ENTERO",this.linea,this.columna)
                }
                else if (this.operacionDer.tipoDato.getTipo() == DataType.DECIMAL){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Semántico<-","CADENA <= DECIMAL",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.BOOLEANO){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Semántico<-","CADENA <= BOOLEAN",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CARACTER){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Semántico<-","CADENA <= CARACTER",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CADENA){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Semántico<-","CADENA <= CADENA",this.linea,this.columna)
                }
                else{
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Semántico<-","CADENA <= INDEFINIDO",this.linea,this.columna)
                }
            }
            
        
        }
        /**************************************IGUAL*********************************************/
        else if(this.tipo==tipoOp.IGUAL){
            let valueIzq = this.operacionIzq.interpretar(arbol, tabla);
            let valueDer = this.operacionDer.interpretar(arbol, tabla);
             /*FILA 1 DE LA TABLA DE SUMA INDICADA EN EL ENUNCIADO*/ 
             if(this.operacionIzq.tipoDato.getTipo() ==  DataType.ENTERO){
                if(this.operacionDer.tipoDato.getTipo() ==  DataType.ENTERO){
                    this.tipoDato.setTipo(DataType.BOOLEANO);
                    return (Number(valueIzq) == Number(valueDer));}
                else if(this.operacionDer.tipoDato.getTipo() == DataType.DECIMAL){
                    this.tipoDato.setTipo(DataType.BOOLEANO);
                    return (Number(valueIzq) == Number(valueDer));
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.BOOLEANO){
                    this.tipoDato.setTipo(DataType.INDEFINIDO);
                    return new Errorr("->Error Semántico<-","ENTERO == BOOLEAN",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CARACTER){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Semántico<-","ENTERO == CARACTER",this.linea,this.columna);
                }
                else if(this.operacionDer.tipoDato.getTipo() ==  DataType.CADENA){
                    this.tipoDato.setTipo(DataType.INDEFINIDO);
                    return new Errorr("->Error Semántico<-","ENTERO == CADENA",this.linea,this.columna)
            }
            else{
                this.tipoDato.setTipo(DataType.INDEFINIDO)
                 return new Errorr("->Error Semántico<-","ENTERO == INDEFINIDO",this.linea,this.columna)
            }
        }

            /*SEGUNDA FILA DE LA TABLA*/
           
               else if(this.operacionIzq.tipoDato.getTipo() == DataType.DECIMAL) {
                    if(this.operacionDer.tipoDato.getTipo() == DataType.ENTERO){
                        this.tipoDato.setTipo(DataType.BOOLEANO)
                        return(Number(valueIzq) == Number(valueDer));
                    }
                    else if(this.operacionDer.tipoDato.getTipo() == DataType.DECIMAL){
                        this.tipoDato.setTipo(DataType.BOOLEANO)
                        return(Number(valueIzq) == Number(valueDer));
                    }
                    else if(this.operacionDer.tipoDato.getTipo() == DataType.BOOLEANO){
                        this.tipoDato.setTipo(DataType.INDEFINIDO)
                        return new Errorr("->Error Semántico<-","DECIMAL == BOOLEAN",this.linea,this.columna)
                    }
                    else if(this.operacionDer.tipoDato.getTipo() == DataType.CARACTER){
                        this.tipoDato.setTipo(DataType.BOOLEANO)
                        this.tipoDato.setTipo(DataType.INDEFINIDO)
                        return new Errorr("->Error Semántico<-","DECIMAL == CARACTER",this.linea,this.columna);
                    }
                    else if(this.operacionDer.tipoDato.getTipo() == DataType.CADENA){
                        this.tipoDato.setTipo(DataType.INDEFINIDO)
                        return new Errorr("->Error Semántico<-","DECIMAL == CADENA",this.linea,this.columna)
                    }

                    else{
                        this.tipoDato.setTipo(DataType.INDEFINIDO)
                        return new Errorr("->Error Semántico<-","DECIMAL == INDEFINIDO",this.linea,this.columna)
                    }
                    
             /* TERCERA FILA DE LA TABLA */   
            } else if(this.operacionIzq.tipoDato.getTipo() == DataType.BOOLEANO){
                if(this.operacionDer.tipoDato.getTipo() == DataType.ENTERO){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Semántico<-","BOOLEAN == ENTERO",this.linea,this.columna)
                }
                else if (this.operacionDer.tipoDato.getTipo() == DataType.DECIMAL){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Semántico<-","BOOLEAN == DECIMAL",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.BOOLEANO){
                    this.tipoDato.setTipo(DataType.BOOLEANO)
                    return (valueIzq == valueDer)
                    
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CARACTER){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Semántico<-","BOOLEAN == CARACTER",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CADENA){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Semántico<-","BOOLEAN == CADENA",this.linea,this.columna)
                }
                else{
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Semántico<-","BOOLEAN == INDEFINIDO",this.linea,this.columna)
                }
            /*CUARTA FILA DE LA TABLA*/
            } else if(this.operacionIzq.tipoDato.getTipo() == DataType.CARACTER){
                if(this.operacionDer.tipoDato.getTipo() == DataType.ENTERO){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Semántico<-","CARACTER == ENTERO",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.DECIMAL){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Semántico<-","CARACTER == DECIMAL",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.BOOLEANO){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Semántico<-","CARACTER == BOOLEAN",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CARACTER){
                    this.tipoDato.setTipo(DataType.BOOLEANO)
                    return(valueIzq == valueDer)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CADENA){
                    this.tipoDato.setTipo(DataType.BOOLEANO)
                    return(valueIzq == valueDer)
                }
                else{
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Semántico<-","CARACTER == INDEFINIDO",this.linea,this.columna)
                }
            }
            /**QUINTA FILA DE LA TABLA */
            else if(this.operacionIzq.tipoDato.getTipo() == DataType.CADENA){
                if(this.operacionDer.tipoDato.getTipo() == DataType.ENTERO){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Semántico<-","CADENA == ENTERO",this.linea,this.columna)
                }
                else if (this.operacionDer.tipoDato.getTipo() == DataType.DECIMAL){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Semántico<-","CADENA == DECIMAL",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.BOOLEANO){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Semántico<-","CADENA == BOOLEAN",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CARACTER){
                    this.tipoDato.setTipo(DataType.BOOLEANO)
                    return (valueIzq == valueDer)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CADENA){
                    this.tipoDato.setTipo(DataType.BOOLEANO)
                    return (valueIzq == valueDer)
                }
                else{
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Semántico<-","CADENA == INDEFINIDO",this.linea,this.columna)
                }
            }
            
            /***************************************DIFERENTE***************************************/
        
        }
        else if(this.tipo == tipoOp.DIFERENTE){
            let valueIzq = this.operacionIzq.interpretar(arbol, tabla);
            let valueDer = this.operacionDer.interpretar(arbol, tabla);
            /*FILA 1 DE LA TABLA DE SUMA INDICADA EN EL ENUNCIADO*/ 
            if(this.operacionIzq.tipoDato.getTipo() == DataType.ENTERO){
                if(this.operacionDer.tipoDato.getTipo() ==  DataType.ENTERO){
                    this.tipoDato.setTipo(DataType.BOOLEANO);
                    return (Number(valueIzq) != Number(valueDer));}
                else if(this.operacionDer.tipoDato.getTipo() == DataType.DECIMAL){
                    this.tipoDato.setTipo(DataType.BOOLEANO);
                    return (Number(valueIzq) != Number(valueDer));
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.BOOLEANO){
                    this.tipoDato.setTipo(DataType.INDEFINIDO);
                    return new Errorr("->Error Semántico<-","ENTERO != BOOLEAN",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CARACTER){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Semántico<-","ENTERO != CARACTER",this.linea,this.columna);
                }
                else if(this.operacionDer.tipoDato.getTipo() ==  DataType.CADENA){
                    this.tipoDato.setTipo(DataType.INDEFINIDO);
                    return new Errorr("->Error Semántico<-","ENTERO != CADENA",this.linea,this.columna)
            }
            else{
                this.tipoDato.setTipo(DataType.INDEFINIDO)
                 return new Errorr("->Error Semántico<-","ENTERO != INDEFINIDO",this.linea,this.columna)
            }
        }

            /*SEGUNDA FILA DE LA TABLA*/
           
               else if(this.operacionIzq.tipoDato.getTipo() == DataType.DECIMAL) {
                    if(this.operacionDer.tipoDato.getTipo() == DataType.ENTERO){
                        this.tipoDato.setTipo(DataType.BOOLEANO)
                        return(Number(valueIzq) != Number(valueDer));
                    }
                    else if(this.operacionDer.tipoDato.getTipo() == DataType.DECIMAL){
                        this.tipoDato.setTipo(DataType.BOOLEANO)
                        return(Number(valueIzq) != Number(valueDer));
                    }
                    else if(this.operacionDer.tipoDato.getTipo() == DataType.BOOLEANO){
                        this.tipoDato.setTipo(DataType.INDEFINIDO)
                        return new Errorr("->Error Semántico<-","DECIMAL != BOOLEAN",this.linea,this.columna)
                    }
                    else if(this.operacionDer.tipoDato.getTipo() == DataType.CARACTER){
                        this.tipoDato.setTipo(DataType.INDEFINIDO)
                        return new Errorr("->Error Semántico<-","DECIMAL != CARACTER",this.linea,this.columna);
                    }
                    else if(this.operacionDer.tipoDato.getTipo() == DataType.CADENA){
                        this.tipoDato.setTipo(DataType.INDEFINIDO)
                        return new Errorr("->Error Semántico<-","DECIMAL != CADENA",this.linea,this.columna)
                    }

                    else{
                        this.tipoDato.setTipo(DataType.INDEFINIDO)
                        return new Errorr("->Error Semántico<-","DECIMAL != INDEFINIDO",this.linea,this.columna)
                    }
                    
             /* TERCERA FILA DE LA TABLA */   
            } else if(this.operacionIzq.tipoDato.getTipo() == DataType.BOOLEANO){
                if(this.operacionDer.tipoDato.getTipo() == DataType.ENTERO){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Semántico<-","BOOLEAN != ENTERO",this.linea,this.columna)
                }
                else if (this.operacionDer.tipoDato.getTipo() == DataType.DECIMAL){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Semántico<-","BOOLEAN != DECIMAL",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.BOOLEANO){
                    this.tipoDato.setTipo(DataType.BOOLEANO)
                    return (valueIzq != valueDer)
                    
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CARACTER){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Semántico<-","BOOLEAN != CARACTER",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CADENA){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Semántico<-","BOOLEAN != CADENA",this.linea,this.columna)
                }
                else{
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Semántico<-","BOOLEAN != INDEFINIDO",this.linea,this.columna)
                }
            /*CUARTA FILA DE LA TABLA*/
            } else if(this.operacionIzq.tipoDato.getTipo() == DataType.CARACTER){
                if(this.operacionDer.tipoDato.getTipo() == DataType.ENTERO){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Semántico<-","CARACTER != ENTERO",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.DECIMAL){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Semántico<-","CARACTER != DECIMAL",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.BOOLEANO){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Semántico<-","CARACTER != BOOLEAN",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CARACTER){
                    this.tipoDato.setTipo(DataType.BOOLEANO)
                    return(valueIzq != valueDer)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CADENA){
                    this.tipoDato.setTipo(DataType.BOOLEANO)
                    return(valueIzq != valueDer)
                }
                else{
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Semántico<-","CARACTER != INDEFINIDO",this.linea,this.columna)
                }
            }
            /**QUINTA FILA DE LA TABLA */
            else if(this.operacionIzq.tipoDato.getTipo() == DataType.CADENA){
                if(this.operacionDer.tipoDato.getTipo() == DataType.ENTERO){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Semántico<-","CADENA != ENTERO",this.linea,this.columna)
                }
                else if (this.operacionDer.tipoDato.getTipo() == DataType.DECIMAL){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Semántico<-","CADENA != DECIMAL",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.BOOLEANO){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Semántico<-","CADENA != BOOLEAN",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CARACTER){
                    this.tipoDato.setTipo(DataType.BOOLEANO)
                    return (valueIzq != valueDer)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CADENA){
                    this.tipoDato.setTipo(DataType.BOOLEANO)
                    return (valueIzq != valueDer)
                }
                else{
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Semántico<-","CADENA != INDEFINIDO",this.linea,this.columna)
                }
            }
        }
        /**************************************NEGACION************************************************/
        else if(this.tipo == tipoOp.TERNARIO){
            /**TODO: PROGRAMAR PARA SER INSTRUCCION PARA ASIGNACION DE VARIABLE*/
            let valueIzq = this.operacionIzq.interpretar(arbol, tabla); //Esta operacion no necesita dos valores
            let valueDer = this.operacionDer.interpretar(arbol,tabla);
            let cond = this.condicion?.interpretar(arbol,tabla)
            if(this.condicion!=null){
            if(this.condicion?.tipoDato.getTipo() == DataType.BOOLEANO){
                if(cond){
                    return valueIzq
                }
                else{
                    return valueDer
                }
            }
            else{
                this.tipoDato.setTipo(DataType.INDEFINIDO)
                return new Errorr("->Error Semántico<-","SE ESPERABA UNA CONDICIÓN DE TIPO BOOLEAN",this.linea,this.columna)
            }
        }
        }
        this.tipoDato.setTipo(DataType.INDEFINIDO)
        return new Errorr("->Error Semántico<-","OPERACION ARITMETICA INDEFINIDA",this.linea,this.columna)
  }
}

export enum tipoOp{
    MAYOR,
    MENOR,
    MAYOR_IGUAL,
    MENOR_IGUAL,
    IGUAL,
    DIFERENTE,
    TERNARIO
}