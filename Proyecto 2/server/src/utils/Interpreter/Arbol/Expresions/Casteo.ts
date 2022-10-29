import { Instruccion } from '../Abstract/Instruccion';
import Three from '../Symbol/Three';
import SymbolTable from '../Symbol/SymbolTable';
import Type, { DataType } from '../Symbol/Type';
import get from 'lodash/get'
import Errorr from '../Exceptions/Error';
import Aritmetica from './Aritmetica';
import Logica from './Logica';
import Relacional from './Relacional';
import Simbolo from '../Symbol/Symbol'
import { isGeneratorFunction } from 'util/types';


export default class Casteo extends Instruccion {
  valor: Instruccion


  constructor(tipo: Type, valor: Instruccion, fila: number, columna: number) {
    super(tipo, fila, columna);
    this.valor = valor;
  }

 
  interpretar(arbol: Three, tabla: SymbolTable) {
    let valorr:any = null
    if(this.valor instanceof(Aritmetica) || this.valor instanceof(Logica) || this.valor instanceof(Relacional) || this.valor instanceof(Casteo)){
            valorr = this.valor.interpretar(arbol,tabla)
        
            if(valorr instanceof Errorr){
           
              return valorr
             }
            this.valor.tipoDato = valorr.tipoDato()
    }

    if(this.valor.tipoDato.getTipo() == DataType.IDENTIFICADOR){
        
    
 
        //  console.log(value)
          let jsonaux = JSON.stringify(this.valor).toString()
          let objjson = JSON.parse(jsonaux)
          let idaux = objjson.valor
          let valid:Simbolo = tabla.getSimbolo(idaux) //Un simbolo que representa la expresion identificador
          if(valid==null){
              return new Errorr("->Error Semántico<-","No se encontró la variable -"+idaux+"-",this.linea,this.columna) 
          }
          else{
            this.valor.tipoDato.setTipo(valid.gettipo().getTipo()) //Cambio el tipo del valor para que deje de ser identificador
            valorr = valid.getvalor()
          }
          
          
      }
    
    /**************************************CASTEOS A ENTERO **************************************************/
    if(this.tipoDato.getTipo() == DataType.ENTERO){
      
        if(this.valor.tipoDato.getTipo()==DataType.ENTERO){
           
        //Casteo de entero a entero
          this.tipoDato.setTipo(DataType.ENTERO)
        if(valorr==null){
            return (Number(this.valor.interpretar(arbol,tabla)))
        }
        else{
            return Number(valorr)
        }
        }

        else if(this.valor.tipoDato.getTipo()==DataType.DECIMAL){
            
          //Casteo de decimal a entero
          this.tipoDato.setTipo(DataType.ENTERO)
          if(valorr==null){
              return (Math.trunc(Number(this.valor.interpretar(arbol,tabla))))
          }
          else{
              return Math.trunc(Number(valorr))
          }
          }

          else if(this.valor.tipoDato.getTipo()==DataType.BOOLEANO){
            
            //Casteo de booleano a entero
            this.tipoDato.setTipo(DataType.ENTERO)
            if(valorr==null){
              let inter = this.valor.interpretar(arbol,tabla)
              if(inter){
                return (1)
              }
              else{
                return 0
              }
                
            }
            else{
              if(valorr){
                return 1
              }
              else{
                return 0
              }
               
            }
            }

            else if(this.valor.tipoDato.getTipo()==DataType.CARACTER || this.valor.tipoDato.getTipo() == DataType.CADENA){
              
              //Casteo de caracter o cadena a entero
              this.tipoDato.setTipo(DataType.ENTERO)
              if(valorr==null){
                let inter = this.valor.interpretar(arbol,tabla)
                let cast = Number(inter)
                if(!isNaN(cast)){
                  return Math.trunc(cast)
                }
                else{
                  return new Errorr("->Error Semántico<-","Casteo incompatible",this.linea,this.columna) 
                }
                 
              }
              else{
                let cast = Number(valorr)

                if(!isNaN(cast)){
                  return Math.trunc(cast)
                }
                else{
                  return new Errorr("->Error Semántico<-","Casteo incompatible",this.linea,this.columna) 
                }
              }
              }

              
        else{
            return new Errorr("->Error Semántico<-","Casteo incompatible",this.linea,this.columna) 
        }
        
        
    }
    /****************************************CASTEROS A DOUBLE *********************************************/
    else if(this.tipoDato.getTipo() == DataType.DECIMAL){
      //Casteos a decimal
      if(this.valor.tipoDato.getTipo()==DataType.ENTERO || this.valor.tipoDato.getTipo() == DataType.DECIMAL){
           
        //Casteo de entero a decimal o de decimal a decimal
          this.tipoDato.setTipo(DataType.DECIMAL)
        if(valorr==null){
            return (Number(this.valor.interpretar(arbol,tabla)))
        }
        else{
            return Number(valorr)
        }
        }
        else if(this.valor.tipoDato.getTipo() == DataType.CADENA){
          //De cadena a decimal
          this.tipoDato.setTipo(DataType.DECIMAL)
              if(valorr==null){
                let inter = this.valor.interpretar(arbol,tabla)
                let cast = Number(inter)
                if(!isNaN(cast)){
                  return cast
                }
                else{
                  return new Errorr("->Error Semántico<-","Casteo incompatible",this.linea,this.columna) 
                }
                 
              }
              else{
                let cast = Number(valorr)

                if(!isNaN(cast)){
                  return cast
                }
                else{
                  return new Errorr("->Error Semántico<-","Casteo incompatible",this.linea,this.columna) 
                }
              }
        }
        else{
          return new Errorr("->Error Semántico<-","Casteo incompatible",this.linea,this.columna) 
        }

    }
    /*************************************************CASTEOS A BOOLEANO **************************************/
    else if(this.tipoDato.getTipo() == DataType.BOOLEANO){
      if(this.valor.tipoDato.getTipo() == DataType.ENTERO || this.valor.tipoDato.getTipo() == DataType.DECIMAL){
        //Casteo de entero a boolean
        this.tipoDato.setTipo(DataType.BOOLEANO)
        if(valorr==null){
            let inter = this.valor.interpretar(arbol,tabla)
            if(inter==1){
              return true;
            }
            else if(inter==0){
              return false;
            }
            else{
              return new Errorr("->Error Semántico<-","Casteo incompatible",this.linea,this.columna) 
            }
           
        }
        else{
            if(valorr=1){
              return true
            }
            else if(valorr=0){
              return false
            }
            else{
              return new Errorr("->Error Semántico<-","Casteo incompatible",this.linea,this.columna) 
            }
           
        }
      }
      else if(this.valor.tipoDato.getTipo()==DataType.BOOLEANO){
        this.tipoDato.setTipo(DataType.BOOLEANO)
        if(valorr==null){
          return this.valor.interpretar(arbol,tabla)
        }
        else{
          return valorr
        }
      }
      else if(this.valor.tipoDato.getTipo() == DataType.CARACTER || this.valor.tipoDato.getTipo() == DataType.CADENA){
       this.tipoDato.setTipo(DataType.BOOLEANO)
        if(valorr==null){
          let inter = this.valor.interpretar(arbol,tabla)
          let cast = Number(inter)
          if(cast==0){
            return false
          }
          else if(cast==1){
            return true
          }
          else{
            return new Errorr("->Error Semántico<-","Casteo incompatible",this.linea,this.columna) 
          }
         
        }
        else{
          let cast = Number(valorr)
          if(cast==0){
            return false
          }
          else if(cast==1){
            return true
          }
          else{
            return new Errorr("->Error Semántico<-","Casteo incompatible",this.linea,this.columna) 
          }
        }
      }
      else{
        return new Errorr("->Error Semántico<-","Casteo incompatible",this.linea,this.columna) 
      }
    }
    /*******************************************CASTEOS A CARACTER ********************************************/
    else if(this.tipoDato.getTipo() == DataType.CARACTER){
      if(this.valor.tipoDato.getTipo() == DataType.ENTERO || this.valor.tipoDato.getTipo() == DataType.DECIMAL){
        this.tipoDato.setTipo(DataType.CARACTER)
        if(valorr==null){
          let inter = this.valor.interpretar(arbol,tabla)
          let cast = inter.toString()
          return cast[0]
         
        }
        else{
          let cast = valorr.toString()
          return cast[0]
        }
      }
      else if(this.valor.tipoDato.getTipo() == DataType.BOOLEANO){
        this.tipoDato.setTipo(DataType.CARACTER)
        if(valorr==null){
          let inter = this.valor.interpretar(arbol,tabla)
          if(inter){
            return '1'
          }
          else{
            return '0'
          }
        }
        else{
          if(valorr){
            return '1'
          }
          else{
            return '0'
          }
        }
      }
      else if(this.valor.tipoDato.getTipo() == DataType.CARACTER || this.valor.tipoDato.getTipo() == DataType.CADENA){
        this.tipoDato.setTipo(DataType.CARACTER)
        if(valorr==null){
          let inter = this.valor.interpretar(arbol,tabla)
          let cast = inter.toString()
          return cast[0]
        }
        else{
          let cast = valorr.toString()
          return cast[0]
        }
      }
      else{
        return new Errorr("->Error Semántico<-","Casteo incompatible",this.linea,this.columna) 
      }

    }
     /*******************************************CASTEOS A CADENA*******************************************/
    if(this.tipoDato.getTipo() == DataType.CADENA){
      if(this.valor.tipoDato.getTipo() == DataType.ENTERO || this.valor.tipoDato.getTipo()==DataType.DECIMAL || this.valor.tipoDato.getTipo()== DataType.CARACTER || this.valor.tipoDato.getTipo() == DataType.CADENA){
       this.tipoDato.setTipo(DataType.CADENA)
        if(valorr==null){
          return this.valor.interpretar(arbol,tabla).toString()
        }
        else{
          return valorr.toString()
        }
      }
      else if(this.valor.tipoDato.getTipo()==DataType.BOOLEANO){
        this.tipoDato.setTipo(DataType.CADENA)
        if(valorr==null){
          let inter = this.valor.interpretar(arbol,tabla)
          if(inter){
            return '1'
          }
          else{
            return '0'
          }
        }
        else{
          if(valorr){
            return '1'
          }
          else{
            return '0'
          }
        }
      }
      else{
        return new Errorr("->Error Semántico<-","Casteo incompatible",this.linea,this.columna) 
      }
    }
     else{
        return new Errorr("->Error Semántico<-","Casteo incompatible",this.linea,this.columna) 
    }
    
  }
}