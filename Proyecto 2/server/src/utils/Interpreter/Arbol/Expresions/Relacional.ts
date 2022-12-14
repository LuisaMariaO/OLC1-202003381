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

    let valueIzq
    let valueDer
    let flag1:boolean = false
    let flag2: boolean = false
    let flag3: boolean = false
    let condicion
    
    /**Si alguno de las dos expresiones es un identificador, primero obtengo el valor y verifico los tipos */
    if(this.operacionIzq.tipoDato.getTipo() == DataType.IDENTIFICADOR){
        flag1 = true
        let jsonaux = JSON.stringify(this.operacionIzq).toString()
        let objjson = JSON.parse(jsonaux)
        valueIzq = this.operacionIzq.interpretar(arbol,tabla)
       
    
        this.operacionIzq.tipoDato.setTipo(tabla.getSimbolo(objjson.valor).gettipo().getTipo())
    }

    if(this.operacionDer.tipoDato.getTipo() == DataType.IDENTIFICADOR){
        flag2 = true
        let jsonaux = JSON.stringify(this.operacionDer).toString()
        let objjson = JSON.parse(jsonaux)
        valueDer = this.operacionDer.interpretar(arbol,tabla)
 
        this.operacionDer.tipoDato.setTipo(tabla.getSimbolo(objjson.valor).gettipo().getTipo())
    }

    if(this.condicion!=null){
    if(this.condicion.tipoDato.getTipo() == DataType.IDENTIFICADOR){
        flag3 = true
        let jsonaux = JSON.stringify(this.condicion).toString()
        let objjson = JSON.parse(jsonaux)
        condicion = this.condicion.interpretar(arbol,tabla)
 
        this.condicion.tipoDato.setTipo(tabla.getSimbolo(objjson.valor).gettipo().getTipo())
    }

    }

    if(!flag1){
    valueIzq = this.operacionIzq.interpretar(arbol, tabla);
    
    }
    if(!flag2){
        valueDer = this.operacionDer.interpretar(arbol, tabla); 
    }
    if(!flag3){
        condicion = this.condicion?.interpretar(arbol,tabla)
    }
    /*******************************************MAYOR*******************************************************/
        if(this.tipo== tipoOp.MAYOR){
            
            
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
                    return new Errorr("->Error Sem??ntico<-","ENTERO > BOOLEAN",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CARACTER){
                    this.tipoDato.setTipo(DataType.BOOLEANO)
                    var ascii = valueDer.charCodeAt(0); //Obtengo el ascii
                    return (Number(valueIzq) > Number(ascii));
                }
                else if(this.operacionDer.tipoDato.getTipo() ==  DataType.CADENA){
                    this.tipoDato.setTipo(DataType.INDEFINIDO);
                    return new Errorr("->Error Sem??ntico<-","ENTERO > CADENA",this.linea,this.columna)
            }
            else{
                this.tipoDato.setTipo(DataType.INDEFINIDO)
                 return new Errorr("->Error Sem??ntico<-","ENTERO > INDEFINIDO",this.linea,this.columna)
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
                        return new Errorr("->Error Sem??ntico<-","DECIMAL > BOOLEAN",this.linea,this.columna)
                    }
                    else if(this.operacionDer.tipoDato.getTipo() == DataType.CARACTER){
                        this.tipoDato.setTipo(DataType.BOOLEANO)
                        var ascii = valueDer.charCodeAt(0); //Obtengo el ascii
                        return(Number(valueIzq) > Number(ascii));
                    }
                    else if(this.operacionDer.tipoDato.getTipo() == DataType.CADENA){
                        this.tipoDato.setTipo(DataType.INDEFINIDO)
                        return new Errorr("->Error Sem??ntico<-","DECIMAL > CADENA",this.linea,this.columna)
                    }

                    else{
                        this.tipoDato.setTipo(DataType.INDEFINIDO)
                        return new Errorr("->Error Sem??ntico<-","DECIMAL > INDEFINIDO",this.linea,this.columna)
                    }
                    
             /* TERCERA FILA DE LA TABLA */   
            } else if(this.operacionIzq.tipoDato.getTipo() == DataType.BOOLEANO){
                if(this.operacionDer.tipoDato.getTipo() == DataType.ENTERO){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Sem??ntico<-","BOOLEAN > ENTERO",this.linea,this.columna)
                }
                else if (this.operacionDer.tipoDato.getTipo() == DataType.DECIMAL){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Sem??ntico<-","BOOLEAN > DECIMAL",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.BOOLEANO){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Sem??ntico<-","BOOLEAN > BOOLEAN",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CARACTER){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Sem??ntico<-","BOOLEAN > CARACTER",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CADENA){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Sem??ntico<-","BOOLEAN > CADENA",this.linea,this.columna)
                }
                else{
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Sem??ntico<-","BOOLEAN > INDEFINIDO",this.linea,this.columna)
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
                    return new Errorr("->Error Sem??ntico<-","CARACTER > BOOLEAN",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CARACTER){
                    this.tipoDato.setTipo(DataType.BOOLEANO)
                    let ascii1 = valueIzq.charCodeAt(0)
                    let ascii2 = valueDer.charCodeAt(0)
                    return (Number(ascii1) > Number(ascii2));
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CADENA){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Sem??ntico<-","CARACTER > CADENA",this.linea,this.columna)
                }
                else{
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Sem??ntico<-","CARACTER > INDEFINIDO",this.linea,this.columna)
                }
            }
            /**QUINTA FILA DE LA TABLA */
            else if(this.operacionIzq.tipoDato.getTipo() == DataType.CADENA){
                if(this.operacionDer.tipoDato.getTipo() == DataType.ENTERO){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Sem??ntico<-","CADENA > ENTERO",this.linea,this.columna)
                }
                else if (this.operacionDer.tipoDato.getTipo() == DataType.DECIMAL){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Sem??ntico<-","CADENA > DECIMAL",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.BOOLEANO){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Sem??ntico<-","CADENA > BOOLEAN",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CARACTER){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Sem??ntico<-","CADENA > CARACTER",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CADENA){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Sem??ntico<-","CADENA > CADENA",this.linea,this.columna)
                }
                else{
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Sem??ntico<-","CADENA > INDEFINIDO",this.linea,this.columna)
                }
            }
            

        /*********************************************MENOR***********************************************/
        } else if(this.tipo== tipoOp.MENOR){    
            
            
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
                    return new Errorr("->Error Sem??ntico<-","ENTERO < BOOLEAN",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CARACTER){
                    this.tipoDato.setTipo(DataType.BOOLEANO)
                    var ascii = valueDer.charCodeAt(0); //Obtengo el ascii
                    return (Number(valueIzq) < Number(ascii));
                }
                else if(this.operacionDer.tipoDato.getTipo() ==  DataType.CADENA){
                    this.tipoDato.setTipo(DataType.INDEFINIDO);
                    return new Errorr("->Error Sem??ntico<-","ENTERO < CADENA",this.linea,this.columna)
            }
            else{
                this.tipoDato.setTipo(DataType.INDEFINIDO)
                 return new Errorr("->Error Sem??ntico<-","ENTERO < INDEFINIDO",this.linea,this.columna)
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
                        return new Errorr("->Error Sem??ntico<-","DECIMAL < BOOLEAN",this.linea,this.columna)
                    }
                    else if(this.operacionDer.tipoDato.getTipo() == DataType.CARACTER){
                        this.tipoDato.setTipo(DataType.BOOLEANO)
                        var ascii = valueDer.charCodeAt(0); //Obtengo el ascii
                        return(Number(valueIzq) < Number(ascii));
                    }
                    else if(this.operacionDer.tipoDato.getTipo() == DataType.CADENA){
                        this.tipoDato.setTipo(DataType.INDEFINIDO)
                        return new Errorr("->Error Sem??ntico<-","DECIMAL < CADENA",this.linea,this.columna)
                    }

                    else{
                        this.tipoDato.setTipo(DataType.INDEFINIDO)
                        return new Errorr("->Error Sem??ntico<-","DECIMAL < INDEFINIDO",this.linea,this.columna)
                    }
                    
             /* TERCERA FILA DE LA TABLA */   
            } else if(this.operacionIzq.tipoDato.getTipo() == DataType.BOOLEANO){
                if(this.operacionDer.tipoDato.getTipo() == DataType.ENTERO){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Sem??ntico<-","BOOLEAN < ENTERO",this.linea,this.columna)
                }
                else if (this.operacionDer.tipoDato.getTipo() == DataType.DECIMAL){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Sem??ntico<-","BOOLEAN < DECIMAL",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.BOOLEANO){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Sem??ntico<-","BOOLEAN < BOOLEAN",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CARACTER){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Sem??ntico<-","BOOLEAN < CARACTER",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CADENA){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Sem??ntico<-","BOOLEAN < CADENA",this.linea,this.columna)
                }
                else{
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Sem??ntico<-","BOOLEAN < INDEFINIDO",this.linea,this.columna)
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
                    return new Errorr("->Error Sem??ntico<-","CARACTER < BOOLEAN",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CARACTER){
                    this.tipoDato.setTipo(DataType.BOOLEANO)
                    let ascii1 = valueIzq.charCodeAt(0)
                    let ascii2 = valueDer.charCodeAt(0)
                    return (Number(ascii1) < Number(ascii2));
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CADENA){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Sem??ntico<-","CARACTER < CADENA",this.linea,this.columna)
                }
                else{
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Sem??ntico<-","CARACTER < INDEFINIDO",this.linea,this.columna)
                }
            }
            /**QUINTA FILA DE LA TABLA */
            else if(this.operacionIzq.tipoDato.getTipo() == DataType.CADENA){
                if(this.operacionDer.tipoDato.getTipo() == DataType.ENTERO){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Sem??ntico<-","CADENA < ENTERO",this.linea,this.columna)
                }
                else if (this.operacionDer.tipoDato.getTipo() == DataType.DECIMAL){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Sem??ntico<-","CADENA < DECIMAL",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.BOOLEANO){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Sem??ntico<-","CADENA < BOOLEAN",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CARACTER){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Sem??ntico<-","CADENA < CARACTER",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CADENA){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Sem??ntico<-","CADENA < CADENA",this.linea,this.columna)
                }
                else{
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Sem??ntico<-","CADENA < INDEFINIDO",this.linea,this.columna)
                }
            }
        } 
        /********************************************MAYOR IGUAL****************************************/
        else if(this.tipo==tipoOp.MAYOR_IGUAL){
            
            
            
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
                    return new Errorr("->Error Sem??ntico<-","ENTERO >= BOOLEAN",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CARACTER){
                    this.tipoDato.setTipo(DataType.BOOLEANO)
                    var ascii = valueDer.charCodeAt(0); //Obtengo el ascii
                    return (Number(valueIzq) >= Number(ascii));
                }
                else if(this.operacionDer.tipoDato.getTipo() ==  DataType.CADENA){
                    this.tipoDato.setTipo(DataType.INDEFINIDO);
                    return new Errorr("->Error Sem??ntico<-","ENTERO >= CADENA",this.linea,this.columna)
            }
            else{
                this.tipoDato.setTipo(DataType.INDEFINIDO)
                 return new Errorr("->Error Sem??ntico<-","ENTERO >= INDEFINIDO",this.linea,this.columna)
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
                        return new Errorr("->Error Sem??ntico<-","DECIMAL >= BOOLEAN",this.linea,this.columna)
                    }
                    else if(this.operacionDer.tipoDato.getTipo() == DataType.CARACTER){
                        this.tipoDato.setTipo(DataType.BOOLEANO)
                        var ascii = valueDer.charCodeAt(0); //Obtengo el ascii
                        return(Number(valueIzq) >= Number(ascii));
                    }
                    else if(this.operacionDer.tipoDato.getTipo() == DataType.CADENA){
                        this.tipoDato.setTipo(DataType.INDEFINIDO)
                        return new Errorr("->Error Sem??ntico<-","DECIMAL >= CADENA",this.linea,this.columna)
                    }

                    else{
                        this.tipoDato.setTipo(DataType.INDEFINIDO)
                        return new Errorr("->Error Sem??ntico<-","DECIMAL >= INDEFINIDO",this.linea,this.columna)
                    }
                    
             /* TERCERA FILA DE LA TABLA */   
            } else if(this.operacionIzq.tipoDato.getTipo() == DataType.BOOLEANO){
                if(this.operacionDer.tipoDato.getTipo() == DataType.ENTERO){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Sem??ntico<-","BOOLEAN >= ENTERO",this.linea,this.columna)
                }
                else if (this.operacionDer.tipoDato.getTipo() == DataType.DECIMAL){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Sem??ntico<-","BOOLEAN >= DECIMAL",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.BOOLEANO){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Sem??ntico<-","BOOLEAN >= BOOLEAN",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CARACTER){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Sem??ntico<-","BOOLEAN >= CARACTER",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CADENA){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Sem??ntico<-","BOOLEAN >= CADENA",this.linea,this.columna)
                }
                else{
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Sem??ntico<-","BOOLEAN >= INDEFINIDO",this.linea,this.columna)
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
                    return new Errorr("->Error Sem??ntico<-","CARACTER >= BOOLEAN",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CARACTER){
                    this.tipoDato.setTipo(DataType.BOOLEANO)
                    let ascii1 = valueIzq.charCodeAt(0)
                    let ascii2 = valueDer.charCodeAt(0)
                    return (Number(ascii1) >= Number(ascii2));
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CADENA){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Sem??ntico<-","CARACTER >= CADENA",this.linea,this.columna)
                }
                else{
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Sem??ntico<-","CARACTER >= INDEFINIDO",this.linea,this.columna)
                }
            }
            /**QUINTA FILA DE LA TABLA */
            else if(this.operacionIzq.tipoDato.getTipo() == DataType.CADENA){
                if(this.operacionDer.tipoDato.getTipo() == DataType.ENTERO){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Sem??ntico<-","CADENA >= ENTERO",this.linea,this.columna)
                }
                else if (this.operacionDer.tipoDato.getTipo() == DataType.DECIMAL){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Sem??ntico<-","CADENA >= DECIMAL",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.BOOLEANO){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Sem??ntico<-","CADENA >= BOOLEAN",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CARACTER){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Sem??ntico<-","CADENA >= CARACTER",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CADENA){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Sem??ntico<-","CADENA >= CADENA",this.linea,this.columna)
                }
                else{
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Sem??ntico<-","CADENA >= INDEFINIDO",this.linea,this.columna)
                }
            }
        }
        /*********************************************MENOR IGUAL***************************************/
        if(this.tipo==tipoOp.MENOR_IGUAL){
            
            
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
                    return new Errorr("->Error Sem??ntico<-","ENTERO <= BOOLEAN",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CARACTER){
                    this.tipoDato.setTipo(DataType.BOOLEANO)
                    var ascii = valueDer.charCodeAt(0); //Obtengo el ascii
                    return (Number(valueIzq) <= Number(ascii));
                }
                else if(this.operacionDer.tipoDato.getTipo() ==  DataType.CADENA){
                    this.tipoDato.setTipo(DataType.INDEFINIDO);
                    return new Errorr("->Error Sem??ntico<-","ENTERO <= CADENA",this.linea,this.columna)
            }
            else{
                this.tipoDato.setTipo(DataType.INDEFINIDO)
                 return new Errorr("->Error Sem??ntico<-","ENTERO <= INDEFINIDO",this.linea,this.columna)
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
                        return new Errorr("->Error Sem??ntico<-","DECIMAL <= BOOLEAN",this.linea,this.columna)
                    }
                    else if(this.operacionDer.tipoDato.getTipo() == DataType.CARACTER){
                        this.tipoDato.setTipo(DataType.BOOLEANO)
                        var ascii = valueDer.charCodeAt(0); //Obtengo el ascii
                        return(Number(valueIzq) <= Number(ascii));
                    }
                    else if(this.operacionDer.tipoDato.getTipo() == DataType.CADENA){
                        this.tipoDato.setTipo(DataType.INDEFINIDO)
                        return new Errorr("->Error Sem??ntico<-","DECIMAL <= CADENA",this.linea,this.columna)
                    }

                    else{
                        this.tipoDato.setTipo(DataType.INDEFINIDO)
                        return new Errorr("->Error Sem??ntico<-","DECIMAL <= INDEFINIDO",this.linea,this.columna)
                    }
                    
             /* TERCERA FILA DE LA TABLA */   
            } else if(this.operacionIzq.tipoDato.getTipo() == DataType.BOOLEANO){
                if(this.operacionDer.tipoDato.getTipo() == DataType.ENTERO){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Sem??ntico<-","BOOLEAN <= ENTERO",this.linea,this.columna)
                }
                else if (this.operacionDer.tipoDato.getTipo() == DataType.DECIMAL){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Sem??ntico<-","BOOLEAN <= DECIMAL",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.BOOLEANO){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Sem??ntico<-","BOOLEAN <= BOOLEAN",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CARACTER){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Sem??ntico<-","BOOLEAN <= CARACTER",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CADENA){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Sem??ntico<-","BOOLEAN <= CADENA",this.linea,this.columna)
                }
                else{
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Sem??ntico<-","BOOLEAN <= INDEFINIDO",this.linea,this.columna)
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
                    return new Errorr("->Error Sem??ntico<-","CARACTER <= BOOLEAN",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CARACTER){
                    this.tipoDato.setTipo(DataType.BOOLEANO)
                    let ascii1 = valueIzq.charCodeAt(0)
                    let ascii2 = valueDer.charCodeAt(0)
                    return (Number(ascii1) <= Number(ascii2));
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CADENA){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Sem??ntico<-","CARACTER <= CADENA",this.linea,this.columna)
                }
                else{
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Sem??ntico<-","CARACTER <= INDEFINIDO",this.linea,this.columna)
                }
            }
            /**QUINTA FILA DE LA TABLA */
            else if(this.operacionIzq.tipoDato.getTipo() == DataType.CADENA){
                if(this.operacionDer.tipoDato.getTipo() == DataType.ENTERO){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Sem??ntico<-","CADENA <= ENTERO",this.linea,this.columna)
                }
                else if (this.operacionDer.tipoDato.getTipo() == DataType.DECIMAL){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Sem??ntico<-","CADENA <= DECIMAL",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.BOOLEANO){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Sem??ntico<-","CADENA <= BOOLEAN",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CARACTER){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Sem??ntico<-","CADENA <= CARACTER",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CADENA){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Sem??ntico<-","CADENA <= CADENA",this.linea,this.columna)
                }
                else{
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Sem??ntico<-","CADENA <= INDEFINIDO",this.linea,this.columna)
                }
            }
            
        
        }
        /**************************************IGUAL*********************************************/
        else if(this.tipo==tipoOp.IGUAL){
            
            
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
                    return new Errorr("->Error Sem??ntico<-","ENTERO == BOOLEAN",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CARACTER){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Sem??ntico<-","ENTERO == CARACTER",this.linea,this.columna);
                }
                else if(this.operacionDer.tipoDato.getTipo() ==  DataType.CADENA){
                    this.tipoDato.setTipo(DataType.INDEFINIDO);
                    return new Errorr("->Error Sem??ntico<-","ENTERO == CADENA",this.linea,this.columna)
            }
            else{
                this.tipoDato.setTipo(DataType.INDEFINIDO)
                 return new Errorr("->Error Sem??ntico<-","ENTERO == INDEFINIDO",this.linea,this.columna)
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
                        return new Errorr("->Error Sem??ntico<-","DECIMAL == BOOLEAN",this.linea,this.columna)
                    }
                    else if(this.operacionDer.tipoDato.getTipo() == DataType.CARACTER){
                        this.tipoDato.setTipo(DataType.BOOLEANO)
                        this.tipoDato.setTipo(DataType.INDEFINIDO)
                        return new Errorr("->Error Sem??ntico<-","DECIMAL == CARACTER",this.linea,this.columna);
                    }
                    else if(this.operacionDer.tipoDato.getTipo() == DataType.CADENA){
                        this.tipoDato.setTipo(DataType.INDEFINIDO)
                        return new Errorr("->Error Sem??ntico<-","DECIMAL == CADENA",this.linea,this.columna)
                    }

                    else{
                        this.tipoDato.setTipo(DataType.INDEFINIDO)
                        return new Errorr("->Error Sem??ntico<-","DECIMAL == INDEFINIDO",this.linea,this.columna)
                    }
                    
             /* TERCERA FILA DE LA TABLA */   
            } else if(this.operacionIzq.tipoDato.getTipo() == DataType.BOOLEANO){
                if(this.operacionDer.tipoDato.getTipo() == DataType.ENTERO){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Sem??ntico<-","BOOLEAN == ENTERO",this.linea,this.columna)
                }
                else if (this.operacionDer.tipoDato.getTipo() == DataType.DECIMAL){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Sem??ntico<-","BOOLEAN == DECIMAL",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.BOOLEANO){
                    this.tipoDato.setTipo(DataType.BOOLEANO)
                    return (valueIzq == valueDer)
                    
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CARACTER){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Sem??ntico<-","BOOLEAN == CARACTER",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CADENA){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Sem??ntico<-","BOOLEAN == CADENA",this.linea,this.columna)
                }
                else{
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Sem??ntico<-","BOOLEAN == INDEFINIDO",this.linea,this.columna)
                }
            /*CUARTA FILA DE LA TABLA*/
            } else if(this.operacionIzq.tipoDato.getTipo() == DataType.CARACTER){
                if(this.operacionDer.tipoDato.getTipo() == DataType.ENTERO){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Sem??ntico<-","CARACTER == ENTERO",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.DECIMAL){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Sem??ntico<-","CARACTER == DECIMAL",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.BOOLEANO){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Sem??ntico<-","CARACTER == BOOLEAN",this.linea,this.columna)
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
                    return new Errorr("->Error Sem??ntico<-","CARACTER == INDEFINIDO",this.linea,this.columna)
                }
            }
            /**QUINTA FILA DE LA TABLA */
            else if(this.operacionIzq.tipoDato.getTipo() == DataType.CADENA){
                if(this.operacionDer.tipoDato.getTipo() == DataType.ENTERO){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Sem??ntico<-","CADENA == ENTERO",this.linea,this.columna)
                }
                else if (this.operacionDer.tipoDato.getTipo() == DataType.DECIMAL){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Sem??ntico<-","CADENA == DECIMAL",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.BOOLEANO){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Sem??ntico<-","CADENA == BOOLEAN",this.linea,this.columna)
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
                    return new Errorr("->Error Sem??ntico<-","CADENA == INDEFINIDO",this.linea,this.columna)
                }
            }
            
            /***************************************DIFERENTE***************************************/
        
        }
        else if(this.tipo == tipoOp.DIFERENTE){
            
            
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
                    return new Errorr("->Error Sem??ntico<-","ENTERO != BOOLEAN",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CARACTER){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Sem??ntico<-","ENTERO != CARACTER",this.linea,this.columna);
                }
                else if(this.operacionDer.tipoDato.getTipo() ==  DataType.CADENA){
                    this.tipoDato.setTipo(DataType.INDEFINIDO);
                    return new Errorr("->Error Sem??ntico<-","ENTERO != CADENA",this.linea,this.columna)
            }
            else{
                this.tipoDato.setTipo(DataType.INDEFINIDO)
                 return new Errorr("->Error Sem??ntico<-","ENTERO != INDEFINIDO",this.linea,this.columna)
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
                        return new Errorr("->Error Sem??ntico<-","DECIMAL != BOOLEAN",this.linea,this.columna)
                    }
                    else if(this.operacionDer.tipoDato.getTipo() == DataType.CARACTER){
                        this.tipoDato.setTipo(DataType.INDEFINIDO)
                        return new Errorr("->Error Sem??ntico<-","DECIMAL != CARACTER",this.linea,this.columna);
                    }
                    else if(this.operacionDer.tipoDato.getTipo() == DataType.CADENA){
                        this.tipoDato.setTipo(DataType.INDEFINIDO)
                        return new Errorr("->Error Sem??ntico<-","DECIMAL != CADENA",this.linea,this.columna)
                    }

                    else{
                        this.tipoDato.setTipo(DataType.INDEFINIDO)
                        return new Errorr("->Error Sem??ntico<-","DECIMAL != INDEFINIDO",this.linea,this.columna)
                    }
                    
             /* TERCERA FILA DE LA TABLA */   
            } else if(this.operacionIzq.tipoDato.getTipo() == DataType.BOOLEANO){
                if(this.operacionDer.tipoDato.getTipo() == DataType.ENTERO){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Sem??ntico<-","BOOLEAN != ENTERO",this.linea,this.columna)
                }
                else if (this.operacionDer.tipoDato.getTipo() == DataType.DECIMAL){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Sem??ntico<-","BOOLEAN != DECIMAL",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.BOOLEANO){
                    this.tipoDato.setTipo(DataType.BOOLEANO)
                    return (valueIzq != valueDer)
                    
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CARACTER){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Sem??ntico<-","BOOLEAN != CARACTER",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CADENA){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Sem??ntico<-","BOOLEAN != CADENA",this.linea,this.columna)
                }
                else{
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Sem??ntico<-","BOOLEAN != INDEFINIDO",this.linea,this.columna)
                }
            /*CUARTA FILA DE LA TABLA*/
            } else if(this.operacionIzq.tipoDato.getTipo() == DataType.CARACTER){
                if(this.operacionDer.tipoDato.getTipo() == DataType.ENTERO){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Sem??ntico<-","CARACTER != ENTERO",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.DECIMAL){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Sem??ntico<-","CARACTER != DECIMAL",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.BOOLEANO){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Sem??ntico<-","CARACTER != BOOLEAN",this.linea,this.columna)
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
                    return new Errorr("->Error Sem??ntico<-","CARACTER != INDEFINIDO",this.linea,this.columna)
                }
            }
            /**QUINTA FILA DE LA TABLA */
            else if(this.operacionIzq.tipoDato.getTipo() == DataType.CADENA){
                if(this.operacionDer.tipoDato.getTipo() == DataType.ENTERO){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Sem??ntico<-","CADENA != ENTERO",this.linea,this.columna)
                }
                else if (this.operacionDer.tipoDato.getTipo() == DataType.DECIMAL){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Sem??ntico<-","CADENA != DECIMAL",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.BOOLEANO){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Sem??ntico<-","CADENA != BOOLEAN",this.linea,this.columna)
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
                    return new Errorr("->Error Sem??ntico<-","CADENA != INDEFINIDO",this.linea,this.columna)
                }
            }
        }
        /**************************************TERNARIO************************************************/
        else if(this.tipo == tipoOp.TERNARIO){
            /**TODO: PROGRAMAR PARA SER INSTRUCCION PARA ASIGNACION DE VARIABLE*/
             //Esta operacion no necesita dos valores
           
            
            if(this.condicion!=null){
            if(this.condicion?.tipoDato.getTipo() == DataType.BOOLEANO){
                if(condicion){
                    this.tipoDato.setTipo(this.operacionIzq.tipoDato.getTipo())
                    return valueIzq
                }
                else{
                    this.tipoDato.setTipo(this.operacionIzq.tipoDato.getTipo())
                    return valueDer
                }
            }
            else{
                this.tipoDato.setTipo(DataType.INDEFINIDO)
                return new Errorr("->Error Sem??ntico<-","SE ESPERABA UNA CONDICI??N DE TIPO BOOLEAN",this.linea,this.columna)
            }
        }
        }
        this.tipoDato.setTipo(DataType.INDEFINIDO)
        return new Errorr("->Error Sem??ntico<-","OPERACION RELACIONAL INDEFINIDA",this.linea,this.columna)
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