import { Instruccion } from '../Abstract/Instruccion';
import Arbol from '../Symbol/Three';
import tablaSimbolo from '../Symbol/SymbolTable';
import Tipo, {DataType} from '../Symbol/Type';
import Errorr from '../Exceptions/Error'
import { isGeneratorFunction } from 'util/types';
import Error from '../Exceptions/Error';
import { timeThursdays } from 'd3';
import { timingSafeEqual } from 'crypto';
import { identity } from 'lodash';
import Nativo from './Native';
import IncreDecre from '../Instructions/IncreDecre';

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
    //console.log(this.operacionIzq)
    //console.log(this.operacionDer)
    let valueIzq
    let valueDer
    let flag1:boolean = false
    let flag2: boolean = false
    
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
    if(this.operacionDer instanceof IncreDecre){
      //  console.log("Hiiiiiiiiiiiii")
        valueDer = this.operacionDer.interpretar(arbol,tabla)
    }
    
    if(!flag1){
    valueIzq = this.operacionIzq.interpretar(arbol, tabla);
    
    }
    if(!flag2){
        valueDer = this.operacionDer.interpretar(arbol, tabla); 
    }
    
    /*********************************SUMA*******************************************************/
        if(this.tipo===tipoOp.SUMA){
       
            /*FILA 1 DE LA TABLA DE SUMA INDICADA EN EL ENUNCIADO*/ 
          
            if(this.operacionIzq.tipoDato.getTipo() === DataType.ENTERO){
        
                if(this.operacionDer.tipoDato.getTipo() === DataType.ENTERO){
                    
                    
                    this.tipoDato.setTipo(DataType.ENTERO);
                    let result = Number(valueIzq)+Number(valueDer)
                    
                    return (Number(valueIzq)+Number(valueDer));
                }
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
                    return new Errorr("->Error Sem??ntico<-","ENTERO + INDEFINIDO",this.linea,this.columna)
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
                        return new Errorr("->Error Sem??ntico<-","ENTERO + INDEFINIDO",this.linea,this.columna)
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
                    return new Errorr("->Error Sem??ntico<-","BOOLEAN + BOOLEAN",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CARACTER){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Sem??ntico<-","BOOLEAN + CARACTER",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CADENA){
                    this.tipoDato.setTipo(DataType.CADENA);
                    return (`${valueIzq.toString()}${valueDer.toString()}`);
                }
                else{
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Sem??ntico<-","ENTERO + INDEFINIDO",this.linea,this.columna)
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
                    return new Errorr("->Error Sem??ntico<-","CARACTER + BOOLEAN",this.linea,this.columna)
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
                    return new Errorr("->Error Sem??ntico<-","ENTERO + INDEFINIDO",this.linea,this.columna) 
                }
            }
            /**QUINTA FILA DE LA TABLA */
            else if(this.operacionIzq.tipoDato.getTipo() == DataType.CADENA){
                if(this.operacionDer.tipoDato.getTipo() == DataType.INDEFINIDO){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Sem??ntico<-","ENTERO + INDEFINIDO",this.linea,this.columna) 
                }
                else{
                    this.tipoDato.setTipo(DataType.CADENA)
                    return (`${valueIzq.toString()}${valueDer.toString()}`);
                }
            }
            

        /*************************************RESTA********************************************/
        } else if(this.tipo===tipoOp.RESTA){    
             
            
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
                    return new Errorr("->Error Sem??ntico<-","ENTERO - CADENA",this.linea,this.columna)
                }
                else{
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Sem??ntico<-","ENTERO - INDEFINIDO",this.linea, this.columna)
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
                    return new Errorr("->Error Sem??ntico<-","DECIMAL - CADENA",this.linea,this.columna)
                }
                else{
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Sem??ntico<-","DECIMAL - INDEFINIDO",this.linea,this.columna)
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
                return new Errorr("->Error Sem??ntico<-","BOOLEAN - BOOLEAN",this.linea,this.columna)
            }
            else if(this.operacionDer.tipoDato.getTipo() == DataType.CARACTER){
                this.tipoDato.setTipo(DataType.INDEFINIDO)
                return new Errorr("->Error Sem??ntico<-","BOOLEAN - CARACTER", this.linea,this.columna)                
            }
            else if(this.operacionDer.tipoDato.getTipo() == DataType.CADENA){
                this.tipoDato.setTipo(DataType.INDEFINIDO)
                return new Errorr("->Error Sem??ntico<-","BOOLEAN - CADENA",this.linea, this.columna)
            }
            else{
                this.tipoDato.setTipo(DataType.INDEFINIDO)
                return new Errorr("->Error Sem??ntico<-","BOOLEAN - INDEFINIDO",this.linea, this.columna)
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
                    return new Errorr("->Error Sem??ntico<-","CARACTER - BOOLEANO",this.linea, this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CARACTER){
                    this.tipoDato.setTipo(DataType.ENTERO)
                    let ascii1 = valueIzq.charCodeAt(0)
                    let ascii2 = valueDer.charCodeAt(0)
                    return(Number(ascii1) - Number(ascii2))
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CADENA){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Sem??ntico<-","CARACTER - CADENA",this.linea, this.columna)
                }
                else{
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Sem??ntico<-","CARACTER - INDEFINIDO",this.linea,this.columna)
                }
            }
            /**QUINTA FILA DE LA TABLA **/
            else if(this.operacionIzq.tipoDato.getTipo() == DataType.CADENA){
                this.tipoDato.setTipo(DataType.INDEFINIDO)
                if(this.operacionDer.tipoDato.getTipo() == DataType.ENTERO){
                    return new Errorr("->Error Sem??ntico<-","CADENA - ENTERO",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.DECIMAL){
                    return new Errorr("->Error Sem??ntico<-","CADENA - DECIMAL",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.BOOLEANO){
                    return new Errorr("->Error Sem??ntico<-","CADENA - BOOLEAN",this.linea, this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CARACTER){
                    return new Errorr("->Error Sem??ntico<-","CADENA - CARACTER",this.linea, this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CADENA){
                    return new Errorr("->Error Sem??ntico<-","CADENA - CADENA",this.linea, this.columna)
                }
                else{
                    return new Errorr("->Error Sem??ntico<-","CADENA - INDEFINIDO",this.linea, this.columna)
                }
            }
        } 
        /************************************MULTIPLICACION *********************************/
        else if(this.tipo==tipoOp.MULTIPLICACION){
            
            
            if(this.operacionIzq.tipoDato.getTipo() == DataType.ENTERO){
               // console.log("Hola0")
                //console.log(valueIzq)
                //console.log(valueDer)
                if(this.operacionDer.tipoDato.getTipo() == DataType.ENTERO){
                  //  console.log("Hola1")
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
                    return new Errorr("->Error Sem??ntico<-","ENTERO * CADENA",this.linea, this.columna)
                }
                else{
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Sem??ntico<-","ENTRO * INDEFINIDO",this.linea, this.columna)
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
                    return new Errorr("->Error Sem??ntico<-","DECIMAL * CADENA",this.linea, this.columna)
                }
                else{
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Sem??nticp<-","DECIMAL * INDEFINIDO",this.linea, this.columna)
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
                    return new Errorr("->Error Sem??ntico<-","BOOLEAN * BOOLEAN",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CARACTER){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Sem??ntico<-","BOOLEAN * CARACTER",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CADENA){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Sem??ntico<-","BOOLEAN * CADENA",this.linea,this.columna)
                }
                else{
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Sem??ntico<-","BOOLEAN * INDEFINIDO",this.linea,this.columna)
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
                    return new Errorr("->Error Sem??ntico<-","CARACTER * BOOLEAN",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CARACTER){
                    this.tipoDato.setTipo(DataType.ENTERO)
                    let ascii1=valueIzq.charCodeAt(0)
                    let ascii2=valueDer.charCodeAt(0)
                    return (Number(ascii1) * Number(ascii2))
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CADENA){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Sem??ntico<-","CARACTER * CADENA",this.linea,this.columna)
                }
                else{
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Sem??ntico<-","CARACTER * CARACTER",this.linea,this.columna)
                }
            }
            /******************************QUINTA FILA DE LA TABLA*************************************/
            else if(this.operacionIzq.tipoDato.getTipo() == DataType.CADENA){
                this.tipoDato.setTipo(DataType.INDEFINIDO)
                if(this.operacionDer.tipoDato.getTipo() == DataType.ENTERO){
                    return new Errorr("->Error Sem??ntico<-","CADENA * ENTERO",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.DECIMAL){
                    return new Errorr("->Error Sem??ntico<-","CADENA * DECIMAL",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.BOOLEANO){
                 return new Errorr("->Error Sem??ntico<-","CADENA * BOOLEAN",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CARACTER){
                    return new Errorr("->Error Sem??ntico<-","CADENA * CARACTER",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CADENA){
                    return new Errorr("->Error Sem??ntico<-","CADENA * CADENA",this.linea,this.columna)
                }
                else{
                    return new Errorr("->Error Sem??ntico<-","CADENA * INDEFINIDO",this.linea,this.columna)
                }
            }

            
        }
        /*********************************************DIVISION***************************************/
        if(this.tipo==tipoOp.DIVISION){
            
            
            if(this.operacionIzq.tipoDato.getTipo() == DataType.ENTERO){
                if(this.operacionDer.tipoDato.getTipo() == DataType.ENTERO){
                    this.tipoDato.setTipo(DataType.DECIMAL)
                    if(Number(valueDer)==0){
                        return new Error("->Error Sem??ntico<-","DIVISION EN 0",this.linea,this.columna)
                    }
                    else{
                        return(Number(valueIzq) / Number(valueDer))
                    }
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.DECIMAL){
                    this.tipoDato.setTipo(DataType.DECIMAL)
                    if(Number(valueDer)==0){
                        return new Error("->Error Sem??ntico<-","DIVISION EN 0",this.linea,this.columna)
                    }
                    else{
                        return(Number(valueIzq) / Number(valueDer))
                    }
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.BOOLEANO){
                    this.tipoDato.setTipo(DataType.DECIMAL)
                    if(!valueDer){
                        return new Error("->Error Sem??ntico<-","DIVISION EN 0",this.linea,this.columna)
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
                    return new Errorr("->Error Sem??ntico<-","ENTERO / CADENA",this.linea,this.columna)
                }
                else{
                    return new Errorr("->Error Sem??ntico<-","ENTERO / INDEFINIDO",this.linea,this.columna)
                }
            }
            /**SEGUNDA FILA DE LA TABLA**/
            else if(this.operacionIzq.tipoDato.getTipo() == DataType.DECIMAL){
                if(this.operacionDer.tipoDato.getTipo() == DataType.ENTERO){
                    this.tipoDato.setTipo(DataType.DECIMAL)
                    if(Number(valueDer)==0){
                        return new Error("->Error Sem??ntico<-","DIVISION EN 0",this.linea,this.columna)
                    }
                    else{
                        return(Number(valueIzq) / Number(valueDer))
                    }
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.DECIMAL){
                    this.tipoDato.setTipo(DataType.DECIMAL)
                    if(Number(valueDer)==0){
                        return new Error("->Error Sem??ntico<-","DIVISION EN 0",this.linea,this.columna)
                    }
                    else{
                        return(Number(valueIzq) / Number(valueDer))
                    }
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.BOOLEANO){
                    this.tipoDato.setTipo(DataType.DECIMAL)
                    if(!valueDer){
                        return new Error("->Error Sem??ntico<-","DIVISION EN 0",this.linea,this.columna)
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
                    return new Errorr("->Error Sem??ntico<-","DECIMAL / CADENA",this.linea,this.columna)
                }
                else{
                    return new Errorr("->Error Sem??ntico<-","DECIMAL / INDEFINIDO",this.linea,this.columna)
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
                return new Errorr("->Error Sem??ntico<-","BOOLEAN / BOOLEAN",this.linea,this.columna)
            }
            else if(this.operacionDer.tipoDato.getTipo() == DataType.CARACTER){
                this.tipoDato.setTipo(DataType.INDEFINIDO)
                return new Errorr("->Error Sem??ntico<-","BOOLEAN / CARACTER",this.linea,this.columna)
            }
            else if(this.operacionDer.tipoDato.getTipo() == DataType.CADENA){
                this.tipoDato.setTipo(DataType.INDEFINIDO)
                return new Errorr("->Error Sem??ntico<-","BOOLEAN / CADENA",this.linea,this.columna)
            }
            else{
                this.tipoDato.setTipo(DataType.INDEFINIDO)
                return new Errorr("->Error Sem??ntico<-","BOOLEAN / INDEFINIDO",this.linea,this.columna)
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
                    return new Error("->Error Sem??ntico<-","CARACTER / BOOLEAN",this.linea, this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CARACTER){
                    this.tipoDato.setTipo(DataType.DECIMAL)
                    let ascii1 = valueIzq.charCodeAt(0)
                    let ascii2 = valueDer.charCodeAt(0)
                    return (Number(ascii1) / Number(ascii2))
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CADENA){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Error("->Error Sem??ntico<-","CARACTER / CADENA",this.linea, this.columna)
                }
                else{
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Error("->Error Sem??ntico<-","CARACTER / INDEFINIDO",this.linea, this.columna)
                }
            }
            /***QUINTA FILA DE LA TABLA***/
            else if(this.operacionIzq.tipoDato.getTipo() == DataType.CADENA){
                if(this.operacionDer.tipoDato.getTipo() == DataType.ENTERO){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Error("->Error Sem??ntico<-","CADENA / ENTERO",this.linea, this.columna)
                } else if(this.operacionDer.tipoDato.getTipo() == DataType.DECIMAL){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Error("->Error Sem??ntico<-","CADENA / DECIMAL",this.linea, this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.BOOLEANO){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Error("->Error Sem??ntico<-","CADENA / BOOLEAN",this.linea, this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CARACTER){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Error("->Error Sem??ntico<-","CADENA / CARACTER",this.linea, this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CADENA){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Error("->Error Sem??ntico<-","CADENA / CADENA",this.linea, this.columna)
                }
                else{
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Error("->Error Sem??ntico<-","CADENA / INDEFINIDO",this.linea, this.columna)
                }
                
            }
        
        }
        /**************************************POTENCIA*********************************************/
        else if(this.tipo==tipoOp.POTENCIA){
            
            
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
                    return new Errorr("->Error Sem??ntico<-","ENTERO ^ CARACTER",this.linea, this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CADENA){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Sem??ntico<-","ENTERO ^ CADENA",this.linea, this.columna)
                }
                else{
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Sem??ntico<-","ENTERO ^ INDEFINIDO",this.linea, this.columna)
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
                    return new Errorr("->Error Sem??ntico<-","DECIMAL ^ CARACTER",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo()==DataType.CADENA){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Sem??ntico<-","DECIMAL ^ CADENA",this.linea,this.columna)
                }
                else{
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Sem??ntico<-","DECIMAL ^ INDEFINIDO",this.linea,this.columna)
                }
            }
            /**TERCERA FILA DE LA TABLA**/
            else if(this.operacionIzq.tipoDato.getTipo() == DataType.BOOLEANO){
                if(this.operacionDer.tipoDato.getTipo() == DataType.ENTERO){
                    this.tipoDato.setTipo(DataType.ENTERO)
                    if(valueIzq){
                        return(Math.pow(1,Number(valueDer)))
                    }
                    else{
                        return(Math.pow(0,Number(valueDer)))
                    }
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.DECIMAL){
                    this.tipoDato.setTipo(DataType.DECIMAL)
                    if(valueIzq){
                        return(Math.pow(1,Number(valueDer)))
                    }
                    else{
                        return(Math.pow(0,Number(valueDer)))
                    }
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.BOOLEANO){
                    this.tipoDato.setTipo(DataType.ENTERO)
                    if(valueIzq){
                        if(valueDer){
                            return (Math.pow(1,1))
                        }
                        else{
                            return(Math.pow(1,0))
                        }
                    }
                    else{
                        if(valueDer){
                            return(Math.pow(0,1))
                        }
                        else{
                            return(Math.pow(0,0))
                        }
                    }
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CARACTER){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Sem??ntico<-","BOOLEAN ^ CARACTER",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CADENA){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Sem??ntico<-","BOOLEAN ^ CADENA",this.linea,this.columna)
                }
                else{
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Sem??ntico<-","BOOLEAN ^ INDEFINIDO",this.linea,this.columna)
                }
            }
            /**CUARTA FILA DE LA TABLA**/
            else if(this.operacionIzq.tipoDato.getTipo() == DataType.CARACTER){
                this.tipoDato.setTipo(DataType.INDEFINIDO)
                if(this.operacionDer.tipoDato.getTipo() == DataType.ENTERO){
                    return new Errorr("->Error Sem??ntico<-","CARACTER ^ ENTERO",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.DECIMAL){
                    return new Errorr("->Error Sem??ntico<-","CARACTER ^ DECIMAL",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.BOOLEANO){
                    return new Errorr("->Error Sem??ntico<-","CARACTER ^ BOOLEAN",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CARACTER){
                    return new Errorr("->Error Sem??ntico<-","CARACTER ^ CARACTER",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CADENA){
                    return new Errorr("->Error Sem??ntico<-","CARACTER ^ CADENA",this.linea,this.columna)
                }
                else{
                    return new Errorr("->Error Sem??ntico<-","CARACTER ^ INDEFINIDO",this.linea,this.columna)
                }
            }
            /**QUINTA FILA DE LA TABLA**/
            else if(this.operacionIzq.tipoDato.getTipo() == DataType.CADENA){
                this.tipoDato.setTipo(DataType.INDEFINIDO)
                if(this.operacionDer.tipoDato.getTipo() == DataType.ENTERO){
                    return new Error("->Error Sem??ntico<-","CADENA ^ ENTERO",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.DECIMAL){
                    return new Error("->Error Sem??ntico<-","CADENA ^ DECIMAL",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.BOOLEANO){
                    return new Error("->Error Sem??ntico<-","CADENA ^ BOOLEAN",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CARACTER){
                    return new Error("->Error Sem??ntico<-","CADENA ^ CARACTER",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CADENA){
                    return new Error("->Error Sem??ntico<-","CADENA ^ CADENA",this.linea,this.columna)
                }
                else{
                    return new Error("->Error Sem??ntico<-","CADENA ^ INDEFINIDO",this.linea,this.columna)
                }
            
            }
            /***************************************MODULO***************************************/
        
        }
        else if(this.tipo == tipoOp.MODULO){
            
            
            if(this.operacionIzq.tipoDato.getTipo() == DataType.ENTERO){
                if(this.operacionDer.tipoDato.getTipo() == DataType.ENTERO || this.operacionDer.tipoDato.getTipo() == DataType.DECIMAL){
                    this.tipoDato.setTipo(DataType.DECIMAL)
                    return(Number(valueIzq) % Number(valueDer))
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.BOOLEANO){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Sem??ntico<-","ENTERO % BOOLEAN",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CARACTER){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Sem??ntico<-","ENTERO % CARACTER",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CADENA){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Sem??ntico<-","ENTERO % CADENA",this.linea,this.columna)
                }
                else{
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Sem??ntico<-","ENTERO % INDEFINIDO",this.linea,this.columna)
                }

            }
            /**SEGUNDA FILA DE LA TABLA**/
            else if(this.operacionIzq.tipoDato.getTipo() == DataType.DECIMAL){
                if(this.operacionDer.tipoDato.getTipo() == DataType.ENTERO || this.operacionDer.tipoDato.getTipo() == DataType.DECIMAL){
                    this.tipoDato.setTipo(DataType.DECIMAL)
                    return(Number(valueIzq) % Number(valueDer))
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.BOOLEANO){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Sem??ntico<-","DECIMAL % BOOLEAN",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CARACTER){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Sem??ntico<-","DECIMAL % CARACTER",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CADENA){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Sem??ntico<-","DECIMAL % CADENA",this.linea,this.columna)
                }
                else{
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Sem??ntico<-","DECIMAL % INDEFINIDO",this.linea,this.columna)
                }

            }
            /**TERCER FILA DE LA TABLA**/
            else if(this.operacionIzq.tipoDato.getTipo() == DataType.BOOLEANO){
                if(this.operacionDer.tipoDato.getTipo() == DataType.ENTERO){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Sem??ntico<-","BOOLEAN % ENTERO",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.DECIMAL){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Sem??ntico<-","BOOLEAN % DECIMAL",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.BOOLEANO){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Sem??ntico<-","BOOLEAN % BOOLEAN",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CARACTER){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Sem??ntico<-","BOOLEAN % CARACTER",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CADENA){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Sem??ntico<-","BOOLEAN % CADENA",this.linea,this.columna)
                }
                else{
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Sem??ntico<-","BOOLEAN % INDEFINIDO",this.linea,this.columna)
                }
            }
            /**CUARTA FILA DE LA TABLA**/
            else if(this.operacionIzq.tipoDato.getTipo() == DataType.CARACTER){
                if(this.operacionDer.tipoDato.getTipo() == DataType.ENTERO){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Sem??ntico<-","CARACTER % ENTERO",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.DECIMAL){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Sem??ntico<-","CARACTER % DECIMAL",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.BOOLEANO){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Sem??ntico<-","CARACTER % BOOLEAN",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CARACTER){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Sem??ntico<-","CARACTER % CARACTER",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CADENA){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Sem??ntico<-","CARACTER % CADENA",this.linea,this.columna)
                }
                else{
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Sem??ntico<-","CARACTER % INDEFINIDO",this.linea,this.columna)
                }
            }
            /**QUINTA FILA DE LA TABLA**/
            else if(this.operacionIzq.tipoDato.getTipo() == DataType.CADENA){
                if(this.operacionDer.tipoDato.getTipo() == DataType.ENTERO){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Sem??ntico<-","CADENA % ENTERO",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.DECIMAL){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Sem??ntico<-","CADENA % DECIMAL",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.BOOLEANO){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Sem??ntico<-","CADENA % BOOLEAN",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CARACTER){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Sem??ntico<-","CADENA % CARACTER",this.linea,this.columna)
                }
                else if(this.operacionDer.tipoDato.getTipo() == DataType.CADENA){
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Sem??ntico<-","CADENA % CADENA",this.linea,this.columna)
                }
                else{
                    this.tipoDato.setTipo(DataType.INDEFINIDO)
                    return new Errorr("->Error Sem??ntico<-","CADENA % INDEFINIDO",this.linea,this.columna)
                }
            }
        }
        /**************************************NEGACION************************************************/
        else if(this.tipo == tipoOp.NEGACION){
             //Esta operacion no necesita dos valores
            if(this.operacionIzq.tipoDato.getTipo() == DataType.ENTERO){
                this.tipoDato.setTipo(DataType.ENTERO)
                return (Number(valueIzq) * -1)

            }
            else if(this.operacionIzq.tipoDato.getTipo() == DataType.DECIMAL){
                this.tipoDato.setTipo(DataType.DECIMAL)
                return (Number(valueIzq) * -1)
            }
            else if(this.operacionIzq.tipoDato.getTipo() == DataType.BOOLEANO){
                this.tipoDato.setTipo(DataType.INDEFINIDO)
                return new Errorr("->Error Sem??ntico<-","- BOOLEAN",this.linea,this.columna)
            }
            else if(this.operacionIzq.tipoDato.getTipo() == DataType.CARACTER){
                this.tipoDato.setTipo(DataType.INDEFINIDO)
                return new Errorr("->Error Sem??ntico<-","- CARACTER",this.linea,this.columna)
            }
            else if(this.operacionIzq.tipoDato.getTipo() == DataType.CADENA){
                this.tipoDato.setTipo(DataType.INDEFINIDO)
                return new Errorr("->Error Sem??ntico<-","- CADENA",this.linea,this.columna)
            }
            else{
                this.tipoDato.setTipo(DataType.INDEFINIDO)
                return new Errorr("->Error Sem??ntico<-","- INDEFINIDO",this.linea,this.columna)
            }
        }
        this.tipoDato.setTipo(DataType.INDEFINIDO)
        return new Errorr("->Error Sem??ntico<-","OPERACION ARITMETICA INDEFINIDA",this.linea,this.columna)
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