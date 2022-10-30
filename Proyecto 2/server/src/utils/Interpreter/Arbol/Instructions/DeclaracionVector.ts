import { Instruccion } from '../Abstract/Instruccion';
import Arbol from '../Symbol/Three';
import Simbolo from '../Symbol/Symbol';
import Operacion from '../Expresions/Native'
import tablaSimbolo from '../Symbol/SymbolTable';
import Tipo, {DataType} from '../Symbol/Type';
import Type from '../Symbol/Type';
import Errorr from '../Exceptions/Error'
import Nativo from '../Expresions/Native';
import Aritmetico from '../Expresions/Aritmetica';
import Logica from '../Expresions/Logica';
import Relacional from '../Expresions/Relacional';
import Casteo from '../Expresions/Casteo';
import { isNull } from 'lodash';
import { timeThursdays } from 'd3';


export default class DeclaracionVector extends Instruccion {
    private id: String
    private tipo: Tipo;
    private dimensiones:number
    private tipo2:Tipo
    private valor1: Instruccion|null;
    private valor2: Instruccion|null
    private listavalores: Instruccion[] | null

    constructor(id: String, tipo:Tipo ,dimensiones:number, tipo2:Tipo,valor1:Instruccion|null,valor2: Instruccion|null, listavalores:Instruccion[]|null,linea: number, columna: number) {
        super(new Tipo(DataType.INDEFINIDO), linea, columna);
        this.id=id
        this.tipo=tipo
        this.dimensiones=dimensiones
        this.tipo2=tipo2
        this.valor1=valor1
        this.valor2=valor2
        this.listavalores=listavalores
        
    }

    public interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        
        if(this.tipo.getTipo() == this.tipo2.getTipo()){
            var valordefault:any
            if(this.tipo.getTipo() == DataType.ENTERO){
                valordefault = Number(0)
                this.tipoDato.setTipo(DataType.VECTOR_ENTERO)
            }
            else if(this.tipo.getTipo() == DataType.DECIMAL){
                valordefault = Number(0.0)
                this.tipoDato.setTipo(DataType.VECTOR_DECIMAL)
            }
            else if(this.tipo.getTipo() == DataType.BOOLEANO){
                valordefault = true
                this.tipoDato.setTipo(DataType.VECTOR_BOOLEANO)
            }
            else if(this.tipo.getTipo() == DataType.CARACTER){
                valordefault = '0'
                this.tipoDato.setTipo(DataType.VECTOR_CARACTER)

            }
            else{
                valordefault = ""
                this.tipoDato.setTipo(DataType.VECTOR_CADENA)
            }

            let valorr:any = null
            let busqueda:Simbolo = tabla.getSimbolo(this.id)
            let tablaActual = tabla
            while(tablaActual!=null){
            busqueda = tablaActual.getSimbolo(this.id)
            if(busqueda!=null){
                break; //Si encuentra el valor en algún entorno, actual o anterior, deja de buscar
            }
            tablaActual = tablaActual.getAnterior()
             }

            if(busqueda==null){ 
            if(this.valor1!=null){ //Quiere decir que es una declaración de tipo1
                if(this.dimensiones==1){
                    console.log("1 dimension")
                   let dimension = this.valor1.interpretar(arbol,tabla)
                    if(!isNaN(dimension)){
                        let vector = []
            
                        for(let i = 0; i<dimension; i++){
                            vector.push(valordefault)
                        }
                        tabla.setValor(this.id,new Simbolo(this.tipoDato,this.id,vector),true)
                    }
                    else{
                        return new Errorr("->Error Semántico<-","Dimension no numérica",this.linea,this.columna)
                    }
                }
                else{
                    
                    /**DECLARACION DE TIPO 1 CON DOS DIMENSIONES */
                    let dimension1 = this.valor1.interpretar(arbol,tabla)
                    
                    let dimension2 = this.valor2?.interpretar(arbol,tabla)
                    
                  
                    if(!isNaN(dimension1) && !isNaN(dimension2)){
                        let dim1 =[]
                        let dim2 = []
                        for(let i = 0; i<dimension1; i++){
                            dim1.push(valordefault)
                        }
                        for(let i = 0; i<dimension2; i++){
                            dim2.push(valordefault)
                        }
                        

                        let vector = [dim1,dim2]
                        tabla.setValor(this.id,new Simbolo(this.tipoDato,this.id,vector),true)
                       

                    }
                    else{
                        return new Errorr("->Error Semántico<-","Dimension no numérica",this.linea,this.columna)
                    }
                }
            }
            else{
                /**DECLARACION DE TIPO2 */
                let vector = []
                let dimen1 = []
                let dimenaux1
                let dimenaux2
                let dimen2 = []
                if(this.listavalores!=null){
                    if(this.dimensiones==1){
                        dimenaux1 = this.listavalores[0]

                        let jsonaux = JSON.stringify(dimenaux1).toString()
                        let objjson = JSON.parse(jsonaux)

                        for(let i of objjson){
                            dimen1.push(i.valor)
                        }
                        vector = dimen1
                    }
                    else{
                        dimenaux1=this.listavalores[0]
                        dimenaux2=this.listavalores[1]

                        let jsonaux = JSON.stringify(dimenaux1).toString()
                        let objjson = JSON.parse(jsonaux)

                        let jsonaux2 = JSON.stringify(dimenaux2).toString()
                        let objjson2 = JSON.parse(jsonaux2)

                        for(let i of objjson){
                            dimen1.push(i.valor)
                        }

                        for(let i of objjson2){
                            dimen2.push(i.valor)
                        }

                        vector =[dimen1,dimen2]
                    }

                    tabla.setValor(this.id,new Simbolo(this.tipoDato,this.id,vector),true) 
                }
                

            }

        }
        else{
            return new Errorr("->Error Semántico<-","La variable o vector -"+this.id+"- ya fue declarada anteriormente",this.linea,this.columna) 
        }
        }
        else{
            return new Errorr("->Error Semántico<-","Tipos incompatibles",this.linea,this.columna)
        }


    }
}