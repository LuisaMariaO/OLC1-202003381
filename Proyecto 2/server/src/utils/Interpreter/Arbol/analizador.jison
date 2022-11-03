%{
    //codigo js
    const nativo = require('./Expresions/Native');
    const aritmetica = require('./Expresions/Aritmetica')
    const relacional = require('./Expresions/Relacional')
    const logica = require('./Expresions/Logica')

    const Tipo = require('./Symbol/Type');

    const print = require('./Instructions/Print');
    const declaracion = require('./Instructions/Declaracion')
    const asignacion = require('./Instructions/Asignacion')
    const casteo = require('./Expresions/Casteo')
    const incredecre = require('./Instructions/IncreDecre')
    const declaracionvec = require ('./Instructions/DeclaracionVector')

    const errorr = require('./Exceptions/Error')

    const { Nodo } = require('./Symbol/Three');

    
%}
%lex

%options case-insensitive 
//inicio analisis lexico
%%
/*COMENTARIOS. 
Los comentarios son ignorados*/
\/\*[^\/]+\*\/              {}
\/\/.+                      {}

/*TIPOS DE DATO*/
//Palabras reservadas

"int"                                                       return 'int';
"double"                                                    return 'double';
"boolean"                                                   return 'boolean';
"char"                                                      return 'char';
"string"                                                    return 'string';
//Definicion de los tipos de dato
[0-9]+\.[0-9]+                                              return 'decimal';
[0-9]+                                                      return 'entero';

true|false                                                  return 'logico';
\'([ -&(-/0-9:-@A-ZÑ\[\]-`{-~]|\\\'|\\\\|\\n|\\t|\\r|\\\")\'  { yytext=yytext.substr(1,yyleng-2); return 'caracter';}
\"(\\\"|\\\\|[^\"])*\"                                           { yytext=yytext.substr(1,yyleng-2);  return 'cadena'; }

";"                                                         { return 'puntoycoma';}

/*IMPRIMIR*/
"println"                                                   { return 'println';}
"print"                                                     { return 't_print';}

/*INCREMENTOS Y DECREMENTOS*/
"++"                                                        return 'incremento'
"--"                                                        return 'decremento'

/*OPERADORES ARITMETICOS*/
"+"                                                         return 'mas';
"-"                                                         return 'menos';
"*"                                                         return 'por';
"/"                                                         return 'dividido';
"^"                                                         return 'potencia';
"%"                                                         return 'modulo';




/*OPERADORES RELACIONALES*/
">="                                                        return 'mayorIgual';
"<="                                                        return 'menorIgual';
"=="                                                        return 'igualIgual';
">"                                                         return 'mayor';
"<"                                                         return 'menor';

"!="                                                        return 'diferente';

"="                                                         return 'igual'

/*OPERADOR LOGICO UNARIO*/
"!"                                                         return 'not';

/*OPERADOR TERNARIO*/

"?"                                                         return 'interrogacionCierra';
":"                                                         return 'dosPuntos';

/*OPERADORES LOGICOS*/
"||"                                                        return 'or';
"&&"                                                        return 'and';

/*SIGNOS DE AGRUPACION*/
"("                                                         { return 'parentesisAbre';}
")"                                                         { return 'parentesisCierra';}

/*CARACTERES DE FINALIZACION Y ENCAPSULAMIENTO DE SENTENCIAS*/

"{"                                                         return 'llaveAbre';
"}"                                                         return 'llaveCierra';

"new"                                                       return 'new'

/*SENTENCIAS DE CONTROL*/
//If
"if"                                                        return 'if'
"else"                                                      return 'else'
"elif"                                                      return 'elif'

//Switch case
"switch"                                                    return 'else'
"case"                                                      return 'case'
"default"                                                   return 'default'

/*IDENTIFICADORES*/
([A-Z0-9_])+                                                return 'identificador';
","                                                         return 'coma'



/*ESTRUCTURAS DE DATOS*/
//Vector
"["                                                         return 'corcheteAbre'
"]"                                                         return 'corcheteCierra'




//While
"while"                                                     return 'while';

//For
"for"                                                       return 'for'

//Do while
"do"                                                        return 'do'

//Until
"until"                                                     return 'until'

/*SENTENCIAS DE TRANSFERENCIA*/
"break"                                                     return 'break'
"continue"                                                  return 'continue'
"return"                                                    return 'return';




/*FUNCIONES VARIAS*/
"toLower"                                                   return 'toLower';
"toUpper"                                                   return 'toUpper';
"round"                                                     return 'round';

/*FUNCIONES NATIVAS*/
"."                                                         return 'punto';
"length"                                                    return 'length';
"typeof"                                                    return 'typeof';
"toString"                                                  return 'toStringg'; //toString da error por ser palabra reservada de jison
"ToCharArray"                                               return 'toCharArray';
"push"                                                      return 'push';
"pop"                                                       return 'pop';
"run"                                                       return 'run';



[ \r\t]+ { }
\n {}



<<EOF>>                     return 'EOF';
.                           return 'INVALID'

/lex

//Precedencias
%right 'incremento' 'decremento'
%left 'or'
%left 'and'
%left 'not'
%left 'igualIgual' 'diferente' 'menor' 'menorIgual' 'mayor' 'mayorIgual'
%left 'mas' 'menos'
%left 'por' 'dividido'
%left 'potencia' 'modulo'
%left 'menos'
%left 'parentesisAbre' //Para agrupacion


%start INIT
//Inicio
//Definicion de gramatica
%%

INIT: INSTRUCCIONES EOF {
    return {
            returnInstruction: $1.returnInstruction, 
            nodeInstruction: (new Nodo("INIT")).generateProduction([$1.nodeInstruction, 'EOF'])            
        };
    }

;

INSTRUCCIONES: INSTRUCCIONES INSTRUCCION  {        
        $$={
            returnInstruction: [...$1.returnInstruction, $2.returnInstruction], 
            nodeInstruction: (new Nodo("INSTRUCCIONES")).generateProduction([$1.nodeInstruction,  $2.nodeInstruction]) 
        };
    }
             | INSTRUCCION               {
        $$={
            returnInstruction: [$1.returnInstruction],
            nodeInstruction: (new Nodo("INTRUCCIONES")).generateProduction([$1.nodeInstruction])
        };
    }
;

INSTRUCCION : PRINT   {
        $$={
            returnInstruction: $1.returnInstruction, 
            nodeInstruction: (new Nodo("INSTRUCCION")).generateProduction([$1.nodeInstruction]) 
        };
    }
            | DECLARACION{
        $$={
            returnInstruction: $1.returnInstruction, 
            nodeInstruction: (new Nodo("INSTRUCCION")).generateProduction([$1.nodeInstruction]) 
        };
            }
            | ASIGNACION {
        $$={
            returnInstruction: $1.returnInstruction, 
            nodeInstruction: (new Nodo("INSTRUCCION")).generateProduction([$1.nodeInstruction]) 
        };
            }
            | INCREDECRE  {
                $$={
                returnInstruction: $1.returnInstruction, 
                nodeInstruction: (new Nodo("INSTRUCCION")).generateProduction([$1.nodeInstruction]) 
        };
            }
            | DECLARACIONVECTOR     {
             $$={
                returnInstruction: $1.returnInstruction, 
                nodeInstruction: (new Nodo("INSTRUCCION")).generateProduction([$1.nodeInstruction]) 
            };
            }
            | MODIFICACIONVECTOR {
                $$={
                    returnInstruction: $1.returnInstruction, 
                    nodeInstruction: (new Nodo("INSTRUCCION")).generateProduction([$1.nodeInstruction]) 
                }
            }

            | IF {
                $$={
                    returnInstruction: $1.returnInstruction, 
                    nodeInstruction: (new Nodo("INSTRUCCION")).generateProduction([$1.nodeInstruction]) 
                }
            }
            | INVALID {
                console.log("Un error lexico");
                $$={
                   returnInstruction: new errorr.default("->Error Lexico<-", $1, @1.first_line, @1.first_column), 
                   nodeInstruction: new Nodo("ERROR LEXICO")
                   
                }
                } //Errores lexicos
            | error  {console.log("Un error sintactico"); 
            $$={
               returnInstruction: new errorr.default("->Error Sintactico<-", $1, @1.first_line, @1.first_column),
               nodeInstruction: new Nodo("ERROR SEMANTICO")

            }} //Errores sintacticos
;



PRINT : t_print parentesisAbre IMPRIMIBLE parentesisCierra puntoycoma { 
    nodoprint0 = new Nodo("t_print")
    nodoprint0.setHijos([new Nodo($1)])

    nodoprint1 = new Nodo("parentesisAbre")
    nodoprint1.setHijos([new Nodo($2)])

    nodoprint2 = new Nodo("parentesisCierra")
    nodoprint2.setHijos([new Nodo($4)])

    nodoprint3 = new Nodo("puntoycoma")
    nodoprint3.setHijos([new Nodo($5)])
    $$={
    returnInstruction: new print.default($3.returnInstruction,@1.first_line,@1.first_column),
     nodeInstruction: (new Nodo('PRINT')).generateProduction([nodoprint0, nodoprint1, $3.nodeInstruction, nodoprint2, nodoprint3])
    }
    }
;

IMPRIMIBLE: EXPRESION {
    $$={
       returnInstruction: $1.returnInstruction,
       nodeInstruction: new Nodo("IMPRIMIBLE").generateProduction([$1.nodeInstruction])
        }
    }
    | TERNARIO {
        $$={
           returnInstruction: $1.returnInstruction,
           nodeInstruction: new Nodo("IMPRIMIBLE").generateProduction([$1.nodeInstruction])
        }
        }
;



EXPRESION :
        'menos' EXPRESION %prec UMENOS {
            nodemenos = new Nodo("menos")
            nodemenos.setHijos([new Nodo($1)])

            $$ = {
                returnInstruction: new aritmetica.default(aritmetica.tipoOp.NEGACION,$2.returnInstruction,$2.returnInstruction,@1.first_line,@1.first_column),
                nodeInstruction: new Nodo("EXPRESION").generateProduction([nodemenos,$2.nodeInstruction])
            
            }}
        
        | EXPRESION incremento  {
             nodoincremento= new Nodo("incremento")
             nodoincremento.setHijos([new Nodo($2)])
            $$ = {
               returnInstruction: new incredecre.default(incredecre.tipoOp.INCREMENTO,$1.returnInstruction,@1.first_line,@1.first_column),
               nodeInstruction: new Nodo("EXPRESION").generateProduction([$1.nodeInstruction,nodoincremento])
            }}
        | EXPRESION decremento  {
            nododecremento= new Nodo("decremento")
            nododecremento.setHijos([new Nodo($2)])
            $$ = {
               returnInstruction: new incredecre.default(incredecre.tipoOp.DECREMENTO,$1.returnInstruction,@1.first_line,@1.first_column),
                nodeInstruction: new Nodo("decremento").generateProduction([$1.nodeInstruction,nododecremento])
        }}

        | 'identificador' 'corcheteAbre' EXPRESION 'corcheteCierra'{
            nodoacceso0 = new Nodo("identificador").generateProduction([$1])
            nodoacceso1 = new Nodo("corcheteAbre").generateProduction([$2])
            nodoacceso2 = new Nodo("corcheteCierra").generateProduction([$4])

            $$={
                returnInstruction: new errorr.default("->Error Semántico<-","Expresión no codificada",@1.first_line,@1.first_column),
                nodeInstruction: new Nodo("EXPRESION").generateProduction([nodoacceso0,nodoacceso1,$3.nodeInstruction,nodoacceso2])
            }
        }
       
        |EXPRESION 'mas' EXPRESION {
            nodomas= new Nodo("mas")
            nodomas.setHijos([new Nodo($2)])
            $$ ={ 
               returnInstruction: new aritmetica.default(aritmetica.tipoOp.SUMA,$1.returnInstruction,$3.returnInstruction,@1.first_line,@1.first_column),
               nodeInstruction: new Nodo("EXPRESION").generateProduction([$1.nodeInstruction,nodomas,$3.nodeInstruction])}
            }
        | EXPRESION 'menos' EXPRESION {
            nodomenos= new Nodo("menos")
            nodomenos.setHijos([new Nodo($2)])
            $$ = {
               returnInstruction: new aritmetica.default(aritmetica.tipoOp.RESTA,$1.returnInstruction,$3.returnInstruction,@1.first_line,@1.first_column),
                nodeInstruction: new Nodo("EXPRESION").generateProduction([$1.nodeInstruction,nodomenos,$3.returnInstruction])
                }
            }
        | EXPRESION 'por' EXPRESION {
            nodopor= new Nodo("por")
            nodopor.setHijos([new Nodo($2)])
            $$ = {
               returnInstruction: new aritmetica.default(aritmetica.tipoOp.MULTIPLICACION,$1.returnInstruction,$3.returnInstruction,@1.first_line,@1.first_column),
               nodeInstruction: new Nodo("EXPRESION").generateProduction([$1.nodeInstruction,nodopor,$3.nodeInstruction])
            }
            }
        | EXPRESION 'dividido' EXPRESION {
            nododividido= new Nodo("dividido")
            nododividido.setHijos([new Nodo($2)])
            $$ = {
               returnInstruction: new aritmetica.default(aritmetica.tipoOp.DIVISION,$1.returnInstruction,$3.returnInstruction,@1.first_line,@1.first_column),
               nodeInstruction: new Nodo("EXPRESION").generateProduction([$1.nodeInstruction,nododividido,$3.nodeInstruction])
            }
            }
        | EXPRESION 'potencia' EXPRESION {
            nodopotencia= new Nodo("potencia")
            nodopotencia.setHijos([new Nodo($2)])
            $$ = {
               returnInstruction: new aritmetica.default(aritmetica.tipoOp.POTENCIA,$1.returnInstruction,$3.returnInstruction,@1.first_line,@1.first_column),
               nodeInstruction: new Nodo("EXPRESION").generateProduction([$1.nodeInstruction,nodopotencia,$3.nodeInstruction])

            }}
        | EXPRESION 'modulo' EXPRESION {
            nodomodulo= new Nodo("modulo")
            nodomodulo.setHijos([new Nodo($2)])
            $$ = {
               returnInstruction: new aritmetica.default(aritmetica.tipoOp.MODULO,$1.returnInstruction,$3.returnInstruction,@1.first_line,@1.first_column),
               nodeInstruction: new Nodo("EXPRESION").generateProduction([$1.nodeInstruction,nodomodulo,$3.nodeInstruction])
            }
            }

        | EXPRESION 'mayor' EXPRESION {
            nodomayor= new Nodo("mayor")
            nodomayor.setHijos([new Nodo($2)])
            $$ = {
               returnInstruction: new relacional.default(relacional.tipoOp.MAYOR,$1.returnInstruction,$3.returnInstruction,null,@1.first_line,@1.first_column),
               nodeInstruction: new Nodo("EXPRESION").generateProduction([$1.nodeInstruction,nodomayor,$3.nodeInstruction])
            }}
        | EXPRESION 'menor' EXPRESION {
            nodomenor= new Nodo("decremento")
            nodomenor.setHijos([new Nodo($2)])
            $$ = {
               returnInstruction: new relacional.default(relacional.tipoOp.MENOR,$1.returnInstruction,$3.returnInstruction,null,@1.first_line,@1.first_column),
               nodeInstruction: new Nodo("EXPRESION").generateProduction([$1.nodeInstruction,nodomenor,$3.nodeInstruction])
            }}
        | EXPRESION 'mayorIgual' EXPRESION {
            nodomayorigual= new Nodo("mayorIgual")
            nodomayorigual.setHijos([new Nodo($2)])
            $$ = {
               returnInstruction: new relacional.default(relacional.tipoOp.MAYOR_IGUAL,$1.returnInstruction,$3.returnInstruction,null,@1.first_line,@1.first_column),
               nodeInstruction: new Nodo("EXPRESION").generateProduction([$1.nodeInstruction,nodomayorigual,$3.nodeInstruction])
            }}
        | EXPRESION 'menorIgual' EXPRESION {
            nodomenorigual = new Nodo("menorIgual")
            nodomenorigual.setHijos([new Nodo($2)])
            $$ ={
               returnInstruction: new relacional.default(relacional.tipoOp.MENOR_IGUAL,$1.returnInstruction,$3.returnInstruction,null,@1.first_line,@1.first_column),
               nodeInstruction: new Nodo("EXPRESION").generateProduction([$1.nodeInstruction,nodomenorigual,$3.nodeInstruction])
            }}
        | EXPRESION 'igualIgual' EXPRESION {
            nodoigual = new Nodo("igualIgual")
            nodoigual.setHijos([new Nodo($2)])
            $$ = {
               returnInstruction: new relacional.default(relacional.tipoOp.IGUAL,$1.returnInstruction,$3.returnInstruction,null,@1.first_line,@1.first_column),
               nodeInstruction: new Nodo("EXPRESION").generateProduction([$1.nodeInstruction,nodoigual,$3.nodeInstruction])
            }}
        | EXPRESION 'diferente' EXPRESION {
            nododiferente = new Nodo("diferente")
            nododiferente.setHijos([new Nodo($2)])
            $$ = {
               returnInstruction: new relacional.default(relacional.tipoOp.DIFERENTE,$1.returnInstruction,$3.returnInstruction,null,@1.first_line,@1.first_column),
               nodeInstruction: new Nodo("EXPRESION").generateProduction([$1.nodeInstruction,nododiferente,$3.nodeInstruction])
            }
            }

        | EXPRESION 'or' EXPRESION{
            nodoor = new Nodo("or")
            nodoor.setHijos([new Nodo($2)])
            $$ = {
               returnInstruction: new logica.default(logica.tipoOp.OR,$1.returnInstruction,$3.returnInstruction,@1.first_line,@1.first_column),
               nodeInstruction: new Nodo("EXPRESION").generateProduction([$1.nodeInstruction,nodoor,$3.nodeInstruction])
            }}
        | EXPRESION 'and' EXPRESION{
            nodoand = new Nodo("and")
            nodoand.setHijos([new Nodo($2)])
            $$ = {
               returnInstruction: new logica.default(logica.tipoOp.AND,$1.returnInstruction,$3,returnInstruction,@1.first_line,@1.first_column),
               nodeInstruction: new Nodo("EXPRESION").generateProduction([$1.nodeInstruction,nodoand,$3.nodeInstruction])
            }}
        | 'not' EXPRESION{
            nodonot = new Nodo("not")
            nodonot.setHijos([new Nodo($1)])
            $$ = {
               returnInstruction: new logica.default(logica.tipoOp.NOT,$2.returnInstruction,$2.returnInstruction,@1.first_line,@1.first_column),
               nodeInstruction: new Nodo("EXPRESION").generateProduction([nodonot,$2.nodeInstruction])
            }
            }

        | 'parentesisAbre' EXPRESION 'parentesisCierra' {
            nodopara = new Nodo("parentesisAbre")
            nodopara.setHijos([new Nodo($1)])

            nodoparc = new Nodo("parentesisCierra")
            nodoparc.setHijos([new Nodo($3)])

            $$ = {
               returnInstruction: $2.returnInstruction,
               nodeInstruction: new Nodo("EXPRESION").generateProduction([nodopara,$2.nodeInstruction,nodoparc])
                }
            }

        | NATIVA{
            $$={
               returnInstruction: $1.returnInstruction,
               nodeInstruction: new Nodo("EXPRESION").generateProduction([$1.nodeInstruction])
                }
            }

        | 'parentesisAbre' TIPO 'parentesisCierra' EXPRESION {
            nodopara1 = new Nodo("parentesisAbre")
            nodopara1.setHijos([new Nodo($1)])

            nodoparc1 = new Nodo("parentesisCierra")
            nodoparc1.setHijos([new Nodo($3)])
            $$ = {
               returnInstruction: new casteo.default($2.returnInstruction,$4.returnInstruction,@1.first_line,@1.first_column),
               nodeInstruction: new Nodo("EXPRESION").generateProduction([nodopara1,$2.nodeInstruction,nodoparc1,$3.nodeInstruction])
               }
            }

      
;        

NATIVA :
    'entero' {
        nodonativa0 = new Nodo("entero")
        nodonativa0.setHijos([new Nodo($1)])
        $$= {
           returnInstruction: new nativo.default(new Tipo.default(Tipo.DataType.ENTERO),$1, @1.first_line, @1.first_column),
           nodeInstruction: new Nodo("NATIVA").generateProduction([nodonativa0])
        }
        }
    | 'decimal' {
        nodonativa1 = new Nodo("decimal")
        nodonativa1.setHijos([new Nodo($1)])
        $$= {
           returnInstruction: new nativo.default(new Tipo.default(Tipo.DataType.DECIMAL),$1, @1.first_line, @1.first_column),
           nodeInstruction: new Nodo("NATIVA").generateProduction([nodonativa1])
        }
        }  
    | 'logico' {
        nodonativa2 = new Nodo("logico")
        nodonativa2.setHijos([new Nodo($1)])
        $$= {
           returnInstruction: new nativo.default(new Tipo.default(Tipo.DataType.BOOLEANO),$1, @1.first_line, @1.first_column),
           nodeInstruction: new Nodo("Nativa").generateProduction([nodonativa2])
        }
    }
    | 'caracter' {
        nodonativa3 = new Nodo("caracter")
        nodonativa3.setHijos([new Nodo($1)])
        $$= {
           returnInstruction: new nativo.default(new Tipo.default(Tipo.DataType.CARACTER),$1, @1.first_line, @1.first_column),
           nodeInstruction: new Nodo("Nativa").generateProduction([nodonativa3])
        }
        }
    | 'cadena' {
        nodonativa4 = new Nodo("cadena")
        nodonativa4.setHijos([new Nodo($1)])
        $$={ 
            returnInstruction: new nativo.default(new Tipo.default(Tipo.DataType.CADENA),$1, @1.first_line, @1.first_column),
            nodeInstruction: new Nodo("NATIVA").generateProduction([nodonativa4])
        }
        }
    | 'identificador' {
        nodonativa5 = new Nodo("identificador")
        nodonativa5.setHijos([new Nodo($1)])
        $$ = {
            returnInstruction: new nativo.default(new Tipo.default(Tipo.DataType.IDENTIFICADOR),$1, @1.first_line, @1.first_column),
            nodeInstruction: new Nodo("NATIVA").generateProduction([nodonativa5])
        }
        }
;

TERNARIO: EXPRESION 'interrogacionCierra' EXPRESION 'dosPuntos' EXPRESION {
    nodoternario0 = new Nodo("interrogacionCierra")
    nodoternario0.setHijos([new Nodo($2)])

    nodoternario1 = new Nodo("dosPuntos")
    nodoternario1.setHijos([new Nodo($4)])
    $$ = {
        returnInstruction: new relacional.default(relacional.tipoOp.TERNARIO,$3.returnInstruction,$5.returnInstruction,$1.returnInstruction,@1.first_line,@1.first_column),
        nodeInstruction: new Nodo("TERNARIO").generateProduction($1.nodeInstruction,nodoternario0,$3.nodeInstruction,nodoternario1,$5.nodeInstruction)
        }
    }
;

DECLARACION: TIPO IDENTIFICADORES VALOR 'puntoycoma' {
    nododeclaracion0 = new Nodo("puntoycoma")
    nododeclaracion0.setHijos([new Nodo($4)])
    $$ = {
            returnInstruction: new declaracion.default($2.returnInstruction,$1.returnInstruction,$3.returnInstruction, @1.first_line,@1.first_column),
            nodeInstruction: new Nodo("DECLARACION").generateProduction([$1.nodeInstruction,$2.nodeInstruction,$3.nodeInstruction,nododeclaracion0])
        }
    }
;

VALOR: 'igual' IMPRIMIBLE {
    nodovalor0 = new Nodo("igual")
    nodovalor0.setHijos([new Nodo($1)])
    $$ ={
        returnInstruction: $2.returnInstruction,
        nodeInstruction: new Nodo("VALOR").generateProduction([nodovalor0,$2.nodeInstruction])
        }
    }
| {
    $$={
        returnInstruction: null,
        nodeInstruction: null
    }
}
;

//returnInstruction: [...$1.returnInstruction, $2.returnInstruction], 
IDENTIFICADORES: IDENTIFICADORES 'coma' 'identificador' {
    nodoidentificador0 = new Nodo("coma")
    nodoidentificador0.setHijos([new Nodo($2)])

    nodoidentificador1 = new Nodo("identificador")
    nodoidentificador1.setHijos([new Nodo($3)])
    $$= {
      returnInstruction:  [...$1.returnInstruction, $3],
      nodeInstruction: new Nodo("IDENTIFICADORES").generateProduction([$1.nodeInstruction,nodoidentificador0,nodoidentificador1])
        }
    }

| 'identificador' {
    nodoidentificador2 = new Nodo("identificador")
    nodoidentificador2.setHijos([new Nodo($1)])
    $$={
        returnInstruction: [$1],
        nodeInstruction: new Nodo("IDENTIFICADORES").generateProduction([nodoidentificador2])
        }
    }
;

ASIGNACION: 'identificador' 'igual' IMPRIMIBLE 'puntoycoma' {
    nodoasignacion0 = new Nodo("identificador")
    nodoasignacion0.setHijos([new Nodo($1)])

    nodoasignacion1 = new Nodo("igual")
    nodoasignacion1.setHijos([new Nodo($2)])

    nodoasignacion2 = new Nodo("puntoycoma")
    nodoasignacion2.setHijos([new Nodo($4)])
    $$={
        returnInstruction: new asignacion.default($1,$3.returnInstruction,@1.first_line, @1.first_column),
        nodeInstruction: new Nodo("ASIGNACION").generateProduction([nodoasignacion0,nodoasignacion1,$3.nodeInstruction,nodoasignacion2])
    }
    }
;


INCREDECRE: EXPRESION 'incremento' 'puntoycoma' {
    nodoincre0 = new Nodo("incremento")
    nodoincre0.setHijos([new Nodo("++")])

    nodoincre1 = new Nodo("puntoycoma")
    nodoincre1.setHijos([new Nodo(";")])


    $$ = {returnInstruction: new incredecre.default(incredecre.tipoOp.INCREMENTO,$1.returnInstruction,@1.first_line,@1.first_column),
         nodeInstruction: new Nodo("INCREDECRE").generateProduction([$1.nodeInstruction,nodoincre0,nodoincre1])}
    }
| EXPRESION 'decremento' 'puntoycoma' {
    nododecre0 = new Nodo("decremento")
    nododecre0.setHijos([new Nodo("--")])

    nododecre1 = new Nodo("puntoycoma")
    nododecre1.setHijos([new Nodo(";")])

    $$ ={   returnInstruction: new incredecre.default(incredecre.tipoOp.DECREMENTO,$1.returnInstruction,@1.first_line,@1.first_column),
            nodeInstruction: new Nodo("INCREDECRE").generateProduction([$1.nodeInstruction,nododecre0,nododecre1])
    }
    }
;


TIPO: 
    'int' {
        nodotipo0 = new Nodo("int")
        nodotipo0.setHijos([new Nodo($1)])
        $$={returnInstruction: new Tipo.default(Tipo.DataType.ENTERO),
            nodeInstruction: new Nodo("TIPO").generateProduction([nodotipo0])
        }
        }
    | 'double' {
        nodotipo1 = new Nodo("double")
        nodotipo1.setHijos([new Nodo($1)])
        $$={
           returnInstruction: new Tipo.default(Tipo.DataType.DECIMAL),
           nodeInstruction: new Nodo("TIPO").generateProduction([nodotipo1])
        }
        }
    | 'boolean' {
        nodotipo2 = new Nodo("double")
        nodotipo2.setHijos([new Nodo($1)])
        $$={
           returnInstruction: new Tipo.default(Tipo.DataType.BOOLEANO),
           nodeInstruction: new Nodo("TIPO").generateProduction([nodotipo2])
        }
        }
    | 'char' {
        nodotipo3 = new Nodo("char")
        nodotipo3.setHijos([new Nodo($1)])
        $$={
           returnInstruction: new Tipo.default(Tipo.DataType.CARACTER),
           nodeInstruction: new Nodo("TIPO").generateProduction([nodotipo3])
        }
        }
    
    | 'string' {
        nodotipo4 = new Nodo("string")
        nodotipo4.setHijos([new Nodo($1)])
        $$={
           returnInstruction: new Tipo.default(Tipo.DataType.CADENA),
           nodeInstruction: new Nodo("TIPO").generateProduction([nodotipo4])
        }
        }
;
/*VECTORES*/
DECLARACIONVECTOR: TIPO 'corcheteAbre' 'corcheteCierra'  DIMENSION2 'identificador' 'igual' 'new' TIPO 'corcheteAbre' EXPRESION 'corcheteCierra' DIMENSION2EXPRESION puntoycoma {
   let dimen
   if($4==null && $12==null ){
    dimen = 1
   }
   else{
   dimen = 2
   }

    declaracionvec10 = new Nodo("corcheteAbre")
    declaracionvec10.setHijos([new Nodo($2)])

    declaracionvec11 = new Nodo("corcheteCierra")
    declaracionvec11.setHijos([new Nodo($3)])

    declaracionvec12 = new Nodo("identificador")
    declaracionvec12.setHijos([new Nodo($5)])

    declaracionvec13 = new Nodo("igual")
    declaracionvec13.setHijos([new Nodo($6)])

    declaracionvec14 = new Nodo("new")
    declaracionvec14.setHijos([new Nodo($7)])


    declaracionvec16 = new Nodo("puntoycoma")
    declaracionvec16.setHijos([new Nodo($13)])
    $$={
       returnInstruction: new declaracionvec.default($5,$1.returnInstruction,dimen,$8.returnInstruction,$10.returnInstruction,$12.returnInstruction,null,@1.first_line,@1.first_column),
       nodeInstruction: new Nodo("DECLARACIONVECTOR").generateProduction([$1.nodeInstruction,declaracionvec10,declaracionvec11,$4.nodeInstruction,declaracionvec12,declaracionvec13,declaracionvec14,$8.nodeInstruction,declaracionvec10,$10.nodeInstruction,declaracionvec11,$12.nodeInstruction,declaracionvec16])
        }
    }
| TIPO 'corcheteAbre' 'corcheteCierra' DIMENSION2 'identificador' 'igual' 'llaveAbre' LISTA 'llaveCierra' puntoycoma {
    let dimen2
    if($4==null){
       dimen2=1 
    }
    else{
        dimen2 = 2
    }
    declaracionvec20 = new Nodo("corcheteAbre")
    declaracionvec20.setHijos([new Nodo($2)])

    declaracionvec21 = new Nodo("corcheteCierra")
    declaracionvec21.setHijos([new Nodo($3)])

    declaracionvec22 = new Nodo("identificador")
    declaracionvec22.setHijos([new Nodo($5)])

    declaracionvec23 = new Nodo("igual")
    declaracionvec23.setHijos([new Nodo($6)])

    declaracionvec24 = new Nodo("llaveAbre")
    declaracionvec24.setHijos([new Nodo($7)])

    declaracionvec25 = new Nodo("llaveCierra")
    declaracionvec25.setHijos([new Nodo($9)])

    declaracionvec26 = new Nodo("puntoycoma")
    declaracionvec26.setHijos([new Nodo($10)])
    $$={
        returnInstruction: new declaracionvec.default($5,$1.returnInstruction,dimen2,$1.returnInstruction,null,null,$8.returnInstruction,@1.first_line,@1.first_column),
        nodeInstruction: new Nodo("DECLARACIONVECTOR").generateProduction([$1.nodeInstruction,declaracionvec20,declaracionvec21,$4.nodeInstruction,declaracionvec22,declaracionvec23,declaracionvec24,$8.nodeInstruction,declaracionvec25,declaracionvec26])
    }
    }
;

LISTA:LISTA1 {
    $$={
        returnInstruction: $1.returnInstruction,
        nodeInstruction: new Nodo("LISTA").generateProduction([$1.nodeInstruction])
        }
    }
| LISTA2 {
    $$={
        returnInstruction: $1.returnInstruction,
        nodeInstruction: new Nodo("LISTA").generateProduction([$1.nodeInstruction])
        }
    }
;
//returnInstruction: [...$1.returnInstruction, $2.returnInstruction], 
LISTA1: LISTA1 'coma' EXPRESION {
    nodolista10 = new Nodo("coma")
    nodolista10.setHijos([new Nodo($2)])


    $$={
        returnInstruction: [...$1.returnInstruction, $3.returnInstruction],
        nodeInstruction: new Nodo("LISTA1").generateProduction([$1.nodeInstruction,nodolista10,$3.nodeInstruction])
    }
    }
| EXPRESION {
    $$={
       returnInstruction: [$1.returnInstruction],
       nodeInstruction : new Nodo("LISTA1").generateProduction[$1.nodeInstruction]
    }
    }
;

LISTA2: 'llaveAbre' LISTA1 'llaveCierra' 'coma' 'llaveAbre' LISTA1 llaveCierra {
    nodolista20 = new Nodo("llaveAbre")
    nodolista20.setHijos([new Nodo($1)])

    nodolista21 = new Nodo("LlaveCierra")
    nodolista21.setHijos([new Nodo($3)])

    nodolista22 = new Nodo("coma")
    nodolista22.setHijos([new Nodo($4)])

    
    $$={
        returnInstruction: [$2.returnInstruction,$6.returnInstruction],
        nodeInstruction: new Nodo("LISTA2").generateProduction([nodolista20,$2.nodeInstruction,nodolista21,nodolista22,nodolista20,$6.nodeInstruction, nodolista21])
        }
    }
;

DIMENSION2: 'corcheteAbre' 'corcheteCierra' {
    nododimen0 = new Nodo("corcheteAbre")
    nododimen0.setHijos([new Nodo($1)])

    nododimen1 = new Nodo("corcheteCierra")
    nododimen1.setHijos([new Nodo($2)])
    $$={returnInstruction: 2,
        nodeInstruction: new Nodo("DIMENSION2").generateProduction([nododimen0,nododimen1])}
    }
| {
    $$={
        returnInstruction: null,
        nodeInstruction: null
    }
}
;

DIMENSION2EXPRESION: 'corcheteAbre' EXPRESION 'corcheteCierra' {
    nododimene0 = new Nodo("corcheteAbre")
    nododimene0.setHijos([new Nodo($1)])

    nododimene1 = new Nodo("corcheteCierra")
    nododimene1.setHijos([new Nodo($3)])
    $$={returnInstruction:$2.returnInstruction,
        nodeInstruction: new Nodo("DIMENSION2EXPRESION").generateProduction([nododimene0,$2.nodeInstruction,nododimene1]) }
    }
|{
    $$={
        returnInstruction: null,
        nodeInstruction: null
    }
}
;

MODIFICACIONVECTOR: 'identificador' 'corcheteAbre' EXPRESION 'corcheteCierra' DIMENSION2EXPRESION 'igual' EXPRESION 'puntoycoma'
{
    nodomodifica0 = new Nodo("identificador").generateProduction([$1])
    nodomodifica1 = new Nodo("corcheteAbre").generateProduction([$2])
    nodomodifica2 = new Nodo("corcheteCierra").generateProduction([$4])
    nodomodifica3 = new Nodo("igual").generateProduction([$6])
    nodomodifica4 = new Nodo("puntoycoma").generateProduction([$8])

    $$={
        returnInstruction: new errorr.default("->Error Semántico<-","Instrucción no codificadoa",@1.first_line,@1.first_column),
        nodeInstruction : new Nodo("MODIFICACIONVECTOR").generateProduction([nodomodifica0,nodomodifica1,$3.nodeInstruction,nodomodifica2,$5.nodeInstruction,nodomodifica3,$7.nodeInstruction,nodomodifica4])
    }
}
;

IF: 'if' 'parentesisAbre' EXPRESION 'parentesisCierra' 'llaveAbre' INSTRUCCIONESBLOQUE 'llaveCierra' SIANIDADO SINO
{
    nodoif0 = new Nodo("if").generateProduction([$1])
    nodoif1 = new Nodo("parentesisAbre").generateProduction([$2])
    nodoif2 = new Nodo("parentesisCierra").generateProduction([$4])
    nodoif3 = new Nodo("llaveAbre").generateProduction([$5])
    nodoif4 = new Nodo("llaveCierra").generateProduction([$7])
    $$={
        returnInstruction: new errorr.default("->Error Semántico<-","Instrucción no codificada",@1.first_line,@1.first_column),
        nodeInstruction: new Nodo("IF").generateProduction([nodoif0,nodoif1,$3.nodeInstruction,nodoif2,nodoif3,$6.nodeInstruction,nodoif4,$8.nodeInstruction,$9.nodeInstruction])
    }
    }

;

SIANIDADO: ANIDADO {
    $$={
        returnInstruction: $1.returnInstruction,
        nodeInstruction: new Nodo("SIANIDADO").generateProduction([$1.nodeInstruction])
    }
}
| {
    $$={
        returnInstruction:null,
        nodeInstruction: null
    }
}
;

ANIDADO: ANIDADO ELIF {
    $$={
        returnInstruction: null,
        nodeInstruction: new Nodo("ANIDADO").generateProduction([$1.nodeInstruction,$2.nodeInstruction])
    }
}
|ELIF{
    $$={
        returnInstruction: $1.returnInstruction,
        nodeInstruction: new Nodo("ANIDADO").generateProduction([$1.nodeInstruction])
    }
}
;
ELIF: 'elif' 'parentesisAbre' EXPRESION 'parentesisCierra' 'llaveAbre' INSTRUCCIONBLOQUE 'llaveCierra' {
    nodoelif0 = new Nodo("elif").generateProduction([$1])
    nodoelif1 = new Nodo("parentesisAbre").generateProduction([$2])
    nodoelif2 = new Nodo("parentesisCierra").generateProduction([$4])
    nodoelif3 = new Nodo("llaveAbre").generateProduction([$5])
    nodoelif4 = new Nodo("llavecierra").generateProduction([$7])
    $$={
        returnInstruction: new errorr.default("->Error Semántico<-","Instrucción no codificadoa",@1.first_line,@1.first_column),
        nodeInstruction: new Nodo("ELIF").generateProduction([nodoelif0,nodoelif1,$3.nodeInstruction,nodoelif2,nodoelif3,$6.nodeInstruction,nodoelif4])
    }
}
;

SINO: ELSE {
    $$={
        returnInstruction: $1.returnInstruction,
        nodeInstruction: new Nodo("SINO").generateProduction([$1.nodeInstruction])
    }
}
| {
    $$={
        returnInstruction:null,
        nodeInstruction: null
    }
}
;

ELSE: 'else' 'llaveAbre' INSTRUCCIONBLOQUE 'llaveCierra'{
    nodoelse0 = new Nodo("else").generateProduction([$1])
    nodoelse1 = new Nodo("llaveAbre").generateProduction([$2])
    nodoelse2 = new Nodo("llaveCierra").generateProduction([$4])

    $$={
        returnInstruction: null,
        nodeInstruction: new Nodo("ELSE").generateProduction([nodoelse0,nodoelse1,$3.nodeInstruction,nodoelse2])
    }
}
;


INSTRUCCIONESBLOQUE: INSTRUCCIONESBLOQUE INSTRUCCIONBLOQUE  {        
        $$={
            returnInstruction: [...$1.returnInstruction, $2.returnInstruction], 
            nodeInstruction: (new Nodo("INSTRUCCIONESBLOQUE")).generateProduction([$1.nodeInstruction,  $2.nodeInstruction]) 
        };
    }
             | INSTRUCCIONBLOQUE               {
        $$={
            returnInstruction: [$1.returnInstruction],
            nodeInstruction: (new Nodo("INTRUCCIONESBLOQUE")).generateProduction([$1.nodeInstruction])
        };
    }
;

INSTRUCCIONBLOQUE: PRINT   {
        $$={
            returnInstruction: $1.returnInstruction, 
            nodeInstruction: (new Nodo("INSTRUCCIONBLOQUE")).generateProduction([$1.nodeInstruction]) 
        };
    }
            | DECLARACION{
        $$={
            returnInstruction: $1.returnInstruction, 
            nodeInstruction: (new Nodo("INSTRUCCIONBLOQUE")).generateProduction([$1.nodeInstruction]) 
        };
            }
            | ASIGNACION {
        $$={
            returnInstruction: $1.returnInstruction, 
            nodeInstruction: (new Nodo("INSTRUCCIONBLOQUE")).generateProduction([$1.nodeInstruction]) 
        };
            }
            | INCREDECRE  {
                $$={
                returnInstruction: $1.returnInstruction, 
                nodeInstruction: (new Nodo("INSTRUCCIONBLOQUE")).generateProduction([$1.nodeInstruction]) 
        };
            }
            | DECLARACIONVECTOR     {
             $$={
                returnInstruction: $1.returnInstruction, 
                nodeInstruction: (new Nodo("INSTRUCCIONBLOQUE")).generateProduction([$1.nodeInstruction]) 
            };
            }
            | MODIFICACIONVECTOR {
                $$={
                    returnInstruction: $1.returnInstruction, 
                    nodeInstruction: (new Nodo("INSTRUCCIONBLOQUE")).generateProduction([$1.nodeInstruction]) 
                }
            }

            | IF {
                $$={
                    returnInstruction: $1.returnInstruction, 
                    nodeInstruction: (new Nodo("INSTRUCCIONBLOQUE")).generateProduction([$1.nodeInstruction]) 
                }
            }
;