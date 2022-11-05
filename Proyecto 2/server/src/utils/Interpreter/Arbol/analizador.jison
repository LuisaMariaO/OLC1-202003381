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
\/\*[^\/]+\*\/              {console.log(yytext)}
\/\/.+                      {console.log(yytext)}

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

"&&"                                                        {return 'and';}


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
"switch"                                                    return 'switch'
"case"                                                      return 'case'
"default"                                                   return 'default'

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

"void"                                                      return 'void'

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

/*IDENTIFICADORES*/
([A-Z0-9_])+                                                return 'identificador';
","                                                         return 'coma'



/*ESTRUCTURAS DE DATOS*/
//Vector
"["                                                         return 'corcheteAbre'
"]"                                                         return 'corcheteCierra'













[ \r\t]+ { }
[\n]+ {}



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
            | SWITCH {
                $$={
                    returnInstruction: $1.returnInstruction, 
                    nodeInstruction: (new Nodo("INSTRUCCION")).generateProduction([$1.nodeInstruction]) 
                }
            }
            | WHILE {
                    $$={
                    returnInstruction: $1.returnInstruction, 
                    nodeInstruction: (new Nodo("INSTRUCCION")).generateProduction([$1.nodeInstruction]) 
                }
            }
            | FOR {
                    $$={
                    returnInstruction: $1.returnInstruction, 
                    nodeInstruction: (new Nodo("INSTRUCCION")).generateProduction([$1.nodeInstruction]) 
                }
            }
            | DOWHILE {
                    $$={
                    returnInstruction: $1.returnInstruction, 
                    nodeInstruction: (new Nodo("INSTRUCCION")).generateProduction([$1.nodeInstruction]) 
                }
            }
            | DOUNTIL{
                    $$={
                    returnInstruction: $1.returnInstruction, 
                    nodeInstruction: (new Nodo("INSTRUCCION")).generateProduction([$1.nodeInstruction]) 
                }
            }
            | FUNCION{
                    $$={
                    returnInstruction: $1.returnInstruction, 
                    nodeInstruction: (new Nodo("INSTRUCCION")).generateProduction([$1.nodeInstruction]) 
                }
            }
            | METODO{
                    $$={
                    returnInstruction: $1.returnInstruction, 
                    nodeInstruction: (new Nodo("INSTRUCCION")).generateProduction([$1.nodeInstruction]) 
                }
            }

            | LLAMADA {
                    $$={
                    returnInstruction: $1.returnInstruction, 
                    nodeInstruction: (new Nodo("INSTRUCCIONBLOQUE")).generateProduction([$1.nodeInstruction]) 
                }
            }
            | PUSH {
                    $$={
                    returnInstruction: $1.returnInstruction, 
                    nodeInstruction: (new Nodo("INSTRUCCION")).generateProduction([$1.nodeInstruction]) 
                }
            }

            | POP {
                    $$={
                    returnInstruction: $1.returnInstruction, 
                    nodeInstruction: (new Nodo("INSTRUCCION")).generateProduction([$1.nodeInstruction]) 
                }
            }

            | RUN {
                    $$={
                    returnInstruction: $1.returnInstruction, 
                    nodeInstruction: (new Nodo("INSTRUCCION")).generateProduction([$1.nodeInstruction]) 
                }
            }
            
            | PRINTLN{
                    $$={
                    returnInstruction: $1.returnInstruction, 
                    nodeInstruction: (new Nodo("INSTRUCCION")).generateProduction([$1.nodeInstruction]) 
                }
            }
            | INVALID {
                console.log("Un error lexico");
                $$={
                   returnInstruction: new errorr.default("->Error Lexico<-", $1, @1.first_line, @1.first_column), 
                   nodeInstruction: null
                   
                }
                } //Errores lexicos
            | error  {console.log("Un error sintactico"); 
            $$={
               returnInstruction: new errorr.default("->Error Sintactico<-", $1, @1.first_line, @1.first_column),
               nodeInstruction: null

            }} //Errores sintacticos
;



PRINT : 't_print' 'parentesisAbre' IMPRIMIBLE 'parentesisCierra' 'puntoycoma' { 
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

PRINTLN : 'println' 'parentesisAbre' IMPRIMIBLE 'parentesisCierra' 'puntoycoma' { 
    nodoprintl0 = new Nodo("println")
    nodoprintl0.setHijos([new Nodo($1)])

    nodoprintl1 = new Nodo("parentesisAbre")
    nodoprintl1.setHijos([new Nodo($2)])

    nodoprintl2 = new Nodo("parentesisCierra")
    nodoprintl2.setHijos([new Nodo($4)])

    nodoprintl3 = new Nodo("puntoycoma")
    nodoprintl3.setHijos([new Nodo($5)])
    $$={
    returnInstruction: new errorr.default("->Error Semántico<-","Instrucción no codificada",@1.first_line,@1.first_column),
     nodeInstruction: (new Nodo('PRINTLN')).generateProduction([nodoprintl0, nodoprintl1, $3.nodeInstruction, nodoprintl2, nodoprintl3])
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
               returnInstruction: new incredecre.default(incredecre.tipoOp.INCREMENTO,$1.returnInstruction,$1.returnInstruction,@1.first_line,@1.first_column),
               nodeInstruction: new Nodo("EXPRESION").generateProduction([$1.nodeInstruction,nodoincremento])
            }}
        | EXPRESION decremento  {
            nododecremento= new Nodo("decremento")
            nododecremento.setHijos([new Nodo($2)])
            $$ = {
               returnInstruction: new incredecre.default(incredecre.tipoOp.DECREMENTO,$1.returnInstruction,$1.returnInstruction,@1.first_line,@1.first_column),
                nodeInstruction: new Nodo("EXPRESION").generateProduction([$1.nodeInstruction,nododecremento])
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
            nodomenor= new Nodo("menor")
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
            }
            }
        | EXPRESION 'and' EXPRESION{
            nodoand = new Nodo("and")
            nodoand.setHijos([new Nodo($2)])
            $$ = {
               returnInstruction: new logica.default(logica.tipoOp.AND,$1.returnInstruction,$3.returnInstruction,@1.first_line,@1.first_column),
               nodeInstruction: new Nodo("EXPRESION").generateProduction([$1.nodeInstruction,nodoand,$3.nodeInstruction])
            }
            }
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

        | 'toLower' 'parentesisAbre' 'cadena' 'parentesisCierra'{
            nodolower0 = new Nodo("toLower").generateProduction([$1])
            nodolower1 = new Nodo("parentesisAbre").generateProduction([$2])
            nodolower2 = new Nodo("cadena").generateProduction([$3])
            nodolower3 = new Nodo("parentesisCierra").generateProduction([$4])

            $$={
                returnInstruction: new errorr.default("->Error Semántico<-","Expresión no codificada",@1.first_line,@1.first_column),
                nodeInstruction: new Nodo("EXPRESION").generateProduction([nodolower0,nodolower1,nodolower2,nodolower3])
            }
        }

        | 'toUpper' 'parentesisAbre' 'cadena' 'parentesisCierra'{
            nodoupper0 = new Nodo("toUpper").generateProduction([$1])
            nodoupper1 = new Nodo("parentesisAbre").generateProduction([$2])
            nodoupper2 = new Nodo("cadena").generateProduction([$3])
            nodoupper3 = new Nodo("parentesisCierra").generateProduction([$4])

            $$={
                returnInstruction: new errorr.default("->Error Semántico<-","Expresión no codificada",@1.first_line,@1.first_column),
                nodeInstruction: new Nodo("EXPRESION").generateProduction([nodoupper0,nodoupper1,nodoupper2,nodoupper3])
            }
        }

        | 'round' 'parentesisAbre' EXPRESION 'parentesisCierra'{
            nodoround0 = new Nodo("round").generateProduction([$1])
            nodoround1 = new Nodo("parentesisAbre").generateProduction([$2])
            
            nodoround3 = new Nodo("parentesisCierra").generateProduction([$4])

            $$={
                returnInstruction: new errorr.default("->Error Semántico<-","Expresión no codificada",@1.first_line,@1.first_column),
                nodeInstruction: new Nodo("EXPRESION").generateProduction([nodoround0,nodoround1,$3.nodeInstruction,nodoround3])
            }
        }

        | 'length' 'parentesisAbre' EXPRESION 'parentesisCierra'{
            nodolength0 = new Nodo("length").generateProduction([$1])
            nodolength1 = new Nodo("parentesisAbre").generateProduction([$2])
            
            nodolength3 = new Nodo("parentesisCierra").generateProduction([$4])

            $$={
                returnInstruction: new errorr.default("->Error Semántico<-","Expresión no codificada",@1.first_line,@1.first_column),
                nodeInstruction: new Nodo("EXPRESION").generateProduction([nodolength0,nodolength1,$3.nodeInstruction,nodolength3])
            }
        }

        | 'typeof' 'parentesisAbre' EXPRESION 'parentesisCierra'{
            nodotypeof0 = new Nodo("Typeof").generateProduction([$1])
            nodotypeof1 = new Nodo("parentesisAbre").generateProduction([$2])
            
            nodotypeof3 = new Nodo("parentesisCierra").generateProduction([$4])

            $$={
                returnInstruction: new errorr.default("->Error Semántico<-","Expresión no codificada",@1.first_line,@1.first_column),
                nodeInstruction: new Nodo("EXPRESION").generateProduction([nodotypeof0,nodotypeof1,$3.nodeInstruction,nodotypeof3])
            }
        }

        | 'toStringg' 'parentesisAbre' EXPRESION 'parentesisCierra'{
            nodotostring0 = new Nodo("ToString").generateProduction([$1])
            nodotostring1 = new Nodo("parentesisAbre").generateProduction([$2])
            
            nodotostring3 = new Nodo("parentesisCierra").generateProduction([$4])

            $$={
                returnInstruction: new errorr.default("->Error Semántico<-","Expresión no codificada",@1.first_line,@1.first_column),
                nodeInstruction: new Nodo("EXPRESION").generateProduction([nodotostring0,nodotostring1,$3.nodeInstruction,nodotostring3])

            }
        }

        | 'toCharArray' 'parentesisAbre' cadena 'parentesisCierra'{
            nodochar0 = new Nodo("ToCharArray").generateProduction([$1])
            nodochar1 = new Nodo("parentesisAbre").generateProduction([$2])
            nodochar2 = new Nodo("cadena").generateProduction([$3])
            nodochar3 = new Nodo("parentesisCierra").generateProduction([$4])

            $$={
                returnInstruction: new errorr.default("->Error Semántico<-","Expresión no codificada",@1.first_line,@1.first_column),
                nodeInstruction: new Nodo("EXPRESION").generateProduction([nodochar0,nodochar1,nodochar2,nodochar3])

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

    | 'identificador' 'parentesisAbre' PARAMETROS 'parentesisCierra'{
            nodonllamada0 = new Nodo("identificador").generateProduction([$1])
            nodonllamada1 = new Nodo("parentesisAbre").generateProduction([$2])
            nodonllamada2 = new Nodo("parentesisCierra").generateProduction([$4])

            $$={
                returnInstruction: new errorr.default("->Error Semántico<-","Expresión no codificada",@1.first_line,@1.first_column),
                nodeInstruction: new Nodo("NATIVA").generateProduction([nodonllamada0,nodonllamada1,$3.nodeInstruction,nodonllamada2])
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
        nodeInstruction: new Nodo("TERNARIO").generateProduction([$1.nodeInstruction,nodoternario0,$3.nodeInstruction,nodoternario1,$5.nodeInstruction])
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


    $$ = {returnInstruction: new incredecre.default(incredecre.tipoOp.INCREMENTO,$1.returnInstruction,$1.returnInstruction,@1.first_line,@1.first_column),
         nodeInstruction: new Nodo("INCREDECRE").generateProduction([$1.nodeInstruction,nodoincre0,nodoincre1])}
    }
| EXPRESION 'decremento' 'puntoycoma' {
    nododecre0 = new Nodo("decremento")
    nododecre0.setHijos([new Nodo("--")])

    nododecre1 = new Nodo("puntoycoma")
    nododecre1.setHijos([new Nodo(";")])

    $$ ={   returnInstruction: new incredecre.default(incredecre.tipoOp.DECREMENTO,$1.returnInstruction,$1.returnInstruction,@1.first_line,@1.first_column),
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
ELIF: 'elif' 'parentesisAbre' EXPRESION 'parentesisCierra' 'llaveAbre' INSTRUCCIONESBLOQUE 'llaveCierra' {
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

ELSE: 'else' 'llaveAbre' INSTRUCCIONESBLOQUE 'llaveCierra'{
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
            | SWITCH {
                $$={
                    returnInstruction: $1.returnInstruction, 
                    nodeInstruction: (new Nodo("INSTRUCCIONBLOQUE")).generateProduction([$1.nodeInstruction]) 
                }
            }
            | TRANSFERENCIA {
                    $$={
                    returnInstruction: $1.returnInstruction, 
                    nodeInstruction: (new Nodo("INSTRUCCIONBLOQUE")).generateProduction([$1.nodeInstruction]) 
                }
            }
            | WHILE {
                    $$={
                    returnInstruction: $1.returnInstruction, 
                    nodeInstruction: (new Nodo("INSTRUCCIONBLOQUE")).generateProduction([$1.nodeInstruction]) 
                }
            }
            | FOR {
                    $$={
                    returnInstruction: $1.returnInstruction, 
                    nodeInstruction: (new Nodo("INSTRUCCIONBLOQUE")).generateProduction([$1.nodeInstruction]) 
                }
            }
            | DOWHILE {
                    $$={
                    returnInstruction: $1.returnInstruction, 
                    nodeInstruction: (new Nodo("INSTRUCCIONBLOQUE")).generateProduction([$1.nodeInstruction]) 
                }
            }
            | DOUNTIL {
                    $$={
                    returnInstruction: $1.returnInstruction, 
                    nodeInstruction: (new Nodo("INSTRUCCIONBLOQUE")).generateProduction([$1.nodeInstruction]) 
                }
            }
            | LLAMADA {
                    $$={
                    returnInstruction: $1.returnInstruction, 
                    nodeInstruction: (new Nodo("INSTRUCCIONBLOQUE")).generateProduction([$1.nodeInstruction]) 
                }
            }
            | PUSH {
                    $$={
                    returnInstruction: $1.returnInstruction, 
                    nodeInstruction: (new Nodo("INSTRUCCIONBLOQUE")).generateProduction([$1.nodeInstruction]) 
                }
            }
            | POP {
                    $$={
                    returnInstruction: $1.returnInstruction, 
                    nodeInstruction: (new Nodo("INSTRUCCIONBLOQUE")).generateProduction([$1.nodeInstruction]) 
                }
            }
            | PRINTLN{
                    $$={
                    returnInstruction: $1.returnInstruction, 
                    nodeInstruction: (new Nodo("INSTRUCCIONBLOQUE")).generateProduction([$1.nodeInstruction]) 
                }
            }
/*
            | INVALID {
                console.log("Un error lexico");
                $$={
                   returnInstruction: new errorr.default("->Error Lexico<-", $1, @1.first_line, @1.first_column), 
                   nodeInstruction: null
                   
                }
                } //Errores lexicos
            | error  {console.log("Un error sintactico"); 
            $$={
               returnInstruction: new errorr.default("->Error Sintactico<-", $1, @1.first_line, @1.first_column),
               nodeInstruction: null

            }} //Errores sintacticos
*/
;
SWITCH: 'switch' 'parentesisAbre' EXPRESION 'parentesisCierra' 'llaveAbre' CASES_LIST DEFAULT 'llaveCierra'{
    nodoswitch0 = new Nodo("switch").generateProduction([$1])
    nodoswitch1 = new Nodo("parentesisAbre").generateProduction([$2])
    nodoswitch2 = new Nodo("parentesisCierra").generateProduction([$4])
    nodoswitch3 = new Nodo("llaveAbre").generateProduction([$5])
    nodoswitch4 = new Nodo("llaveCierra").generateProduction([$8])

    $$={
        returnInstruction: new errorr.default("->Error Semántico<-","Instrucción no codificada",@1.first_line,@1.first_column),
        nodeInstruction : new Nodo("SWITCH").generateProduction([nodoswitch0,nodoswitch1,$3.nodeInstruction,nodoswitch2,nodoswitch3,$6.nodeInstruction,$7.nodeInstruction,nodoswitch4])
    }
}
;

CASES_LIST: CASES{
    $$={
        returnInstruction:null,
        nodeInstruction: new Nodo("CASES_LIST").generateProduction([$1.nodeInstruction])
    }
}
|{
    $$={
        returnInstruction:null,
        nodeInstruction:null
    }
}
;

CASES: CASES CASE{
    $$={
        returnInstruction:null,
        nodeInstruction: new Nodo("CASES").generateProduction([$1.nodeInstruction,$2.nodeInstruction])
    }
}
|CASE {
    $$={
        returnInstruction:null,
        nodeInstruction: new Nodo("CASES").generateProduction([$1.nodeInstruction])
    }
}
;

CASE: 'case' EXPRESION 'dosPuntos' INSTRUCCIONESBLOQUE  {
    nodocase0 = new Nodo("case").generateProduction([$1])
    nodocase1 = new Nodo("dosPuntos").generateProduction([$3])

    $$={
        returnInstruction:null,
        nodeInstruction: new Nodo("CASE").generateProduction([nodocase0,$2.nodeInstruction,nodocase1,$4.nodeInstruction])
    }
}
;

DEFAULT: 'default' 'dosPuntos' INSTRUCCIONESBLOQUE {
    nododefault0 = new Nodo("default").generateProduction([$1])
    nododefault1 = new Nodo("dosPuntos").generateProduction([$2])
    $$={
        returnInstruction:null,
        nodeInstruction: new Nodo("DEFAULT").generateProduction([nododefault0,nododefault1,$3.nodeInstruction])
    }
}
|{
    $$={
        returnInstruction:null,
        nodeInstruction: null
    }
}
;

TRANSFERENCIA: 'break' 'puntoycoma' {
    nodobreak = new Nodo("break").generateProduction([$1])
    nodobreak2 = new Nodo ("puntoycoma").generateProduction([$2])
    $$={
        returnInstruction: new errorr.default("->Error Semántico<-","Instrucción no codificada",@1.first_line,@1.first_column),
        nodeInstruction: new Nodo("TRANSFERENCIA").generateProduction([nodobreak,nodobreak2])
    }
}
| 'continue' 'puntoycoma' {
    nodocontinue = new Nodo("continue").generateProduction([$1])
    nodocontinue2 = new Nodo ("puntoycoma").generateProduction([$2])
    $$={
        returnInstruction: new errorr.default("->Error Semántico<-","Instrucción no codificada",@1.first_line,@1.first_column),
        nodeInstruction: new Nodo("TRANSFERENCIA").generateProduction([nodocontinue,nodocontinue2])
    }
}
| 'return' 'puntoycoma'{
    nodoreturn = new Nodo("return").generateProduction([$1])
    nodoreturn2 = new Nodo ("puntoycoma").generateProduction([$2])
    $$={
        returnInstruction: new errorr.default("->Error Semántico<-","Instrucción no codificada",@1.first_line,@1.first_column),
        nodeInstruction: new Nodo("TRANSFERENCIA").generateProduction([nodoreturn,nodoreturn2])
    }
}
| 'return' EXPRESION 'puntoycoma'{
    nodoreturn = new Nodo("return").generateProduction([$1])
    nodoreturn2 = new Nodo ("puntoycoma").generateProduction([$3])
    $$={
        returnInstruction: new errorr.default("->Error Semántico<-","Instrucción no codificada",@1.first_line,@1.first_column),
        nodeInstruction: new Nodo("TRANSFERENCIA").generateProduction([nodoreturn,$2.nodeInstruction,nodoreturn2])
    }
}
;

WHILE: 'while' 'parentesisAbre' EXPRESION 'parentesisCierra' 'llaveAbre' INSTRUCCIONESBLOQUE 'llaveCierra'{
    nodowhile0 = new Nodo("while").generateProduction([$1])
    nodowhile1 = new Nodo("parentesisAbre").generateProduction([$2])
    nodowhile2 = new Nodo("parentesisCierra").generateProduction([$4])
    nodowhile3 = new Nodo("llaveAbre").generateProduction([$5])
    nodowhile4 = new Nodo("llaveCierra").generateProduction([$7])

    $$={
        returnInstruction: new errorr.default("->Error Semántico<-","Instrucción no codificada", @1.first_line,@1.first_column),
        nodeInstruction: new Nodo("WHILE").generateProduction([nodowhile0,nodowhile1,$3.nodeInstruction,nodowhile2,nodowhile3,$6.nodeInstruction,nodowhile4])
    }
}
;
FOR: 'for' 'parentesisAbre' FORVALOR EXPRESION 'puntoycoma' ACTUALIZACION 'parentesisCierra' 'llaveAbre' INSTRUCCIONESBLOQUE 'llaveCierra'{
    nodofor0 = new Nodo("for").generateProduction([$1])
    nodofor1 = new Nodo("parentesisAbre").generateProduction([$2])
    nodofor3 = new Nodo("puntoycoma").generateProduction([$5])
    nodofor4 = new Nodo("parentesisCierra").generateProduction([$7])
    nodofor5 = new Nodo("llaveAbre").generateProduction([$8])
    nodofor6 = new Nodo("llaveCierra").generateProduction([$10])

    $$={
        returnInstruction: new errorr.default("->Error Semántico<-","Instrucción no codificada", @1.first_line,@1.first_column),
        nodeInstruction: new Nodo("FOR").generateProduction([nodofor0,nodofor1,$3.nodeInstruction,$4.nodeInstruction,nodofor3,$6.nodeInstruction,nodofor4,nodofor5,$9.nodeInstruction,nodofor6])
}}
;

FORVALOR: DECLARACION{
    $$={
        returnInstruction:null,
        nodeInstruction: new Nodo("FORVALOR").generateProduction([$1.nodeInstruction])
    }
}
| ASIGNACION{
    $$={
        returnInstruction:null,
        nodeInstruction: new Nodo("FORVALOR").generateProduction([$1.nodeInstruction])
    }
}
;

FORINCREDECRE: EXPRESION 'incremento' {
    nodoforincre = new Nodo("incremento").generateProduction([$2])
    $$={
        returnInstruction: null,
        nodeInstruction: new Nodo("FORINCREDECRE").generateProduction([$1.nodeInstruction,nodoforincre])
    }
}
| EXPRESION 'decremento'  {
    nodofordecre = new Nodo("decremento").generateProduction([$2])
    $$={
    returnInstruction: null,
    nodeInstruction: new Nodo("FORINCRE").generateProduction([$1.nodeInstruction,nodofordecre])
    }
}
;
ACTUALIZACION: 'identificador' 'igual' EXPRESION {
    nodoact0 = new Nodo("identificador").generateProduction([$1])
    nodoact1 = new Nodo("igual").generateProduction([$2])
    $$={
        returnInstruction:null,
        nodeInstruction: new Nodo("ACTUALIZACION").generateProduction([nodoact0,nodoact1,$3.nodeInstruction])
    }
}
|EXPRESION{
    $$={
        returnInstruction:null,
        nodeInstruction : new Nodo("ACTUALIZACION").generateProduction([$1.nodeInstruction])
    }
}

;

DOWHILE: 'do' 'llaveAbre' INSTRUCCIONESBLOQUE 'llaveCierra' 'while' 'parentesisAbre' EXPRESION 'parentesisCierra' 'puntoycoma'{
    nododo0 = new Nodo("do").generateProduction([$1])
    nododo1 = new Nodo("llaveAbre").generateProduction([$2])
    nododo2 = new Nodo("llaveCierra").generateProduction([$4])
    nododo3 = new Nodo("while").generateProduction([$5])
    nododo4 = new Nodo("parentesisAbre").generateProduction([$6])
    nododo5 = new Nodo("parentesisCierra").generateProduction([$8])
    nododo6 = new Nodo("puntoycoma").generateProduction([$9]) 

    $$={
        returnInstruction: new errorr.default("->Error Semántico<-","Instrucción no codificada", @1.first_line,@1.first_column),
        nodeInstruction: new Nodo("DOWHILE").generateProduction([nododo0,nododo1,$3.nodeInstruction,nododo2,nododo3,nododo4,$7.nodeInstruction,nododo5,nododo6])
    }
}
;

DOUNTIL: 'do' 'llaveAbre' INSTRUCCIONESBLOQUE 'llaveCierra' 'until' 'parentesisAbre' EXPRESION 'parentesisCierra' 'puntoycoma'{
    nododou0 = new Nodo("do").generateProduction([$1])
    nododou1 = new Nodo("llaveAbre").generateProduction([$2])
    nododou2 = new Nodo("llaveCierra").generateProduction([$4])
    nododou3 = new Nodo("until").generateProduction([$5])
    nododou4 = new Nodo("parentesisAbre").generateProduction([$6])
    nododou5 = new Nodo("parentesisCierra").generateProduction([$8])
    nododou6 = new Nodo("puntoycoma").generateProduction([$9]) 

    $$={
        returnInstruction: new errorr.default("->Error Semántico<-","Instrucción no codificada", @1.first_line,@1.first_column),
        nodeInstruction: new Nodo("DOUNTIL").generateProduction([nododou0,nododou1,$3.nodeInstruction,nododou2,nododou3,nododou4,$7.nodeInstruction,nododou5,nododou6])
    }
}
;

FUNCION: 'identificador' 'parentesisAbre' PARAMETROS 'parentesisCierra' 'dosPuntos' TIPO 'llaveAbre' INSTRUCCIONESBLOQUE 'llaveCierra'{
    nodofuncion0 = new Nodo("identificador").generateProduction([$1])
    nodofuncion1 = new Nodo("parentesisAbre").generateProduction([$2])
    nodofuncion2 = new Nodo("parentesisCierra").generateProduction([$4])
    nodofuncion3 = new Nodo("dosPuntos").generateProduction([$5])
    nodofuncion4 = new Nodo("llaveAbre").generateProduction([$7])
    nodofuncion5 = new Nodo("llaveCierra").generateProduction([$9])

    $$={
        returnInstruction: new errorr.default("->Error Semántico<-","Instrucción no codificada", @1.first_line,@1.first_column),
        nodeInstruction: new Nodo("FUNCION").generateProduction([nodofuncion0,nodofuncion1,$3.nodeInstruction,nodofuncion2,nodofuncion3,$6.nodeInstruction,nodofuncion4,$8.nodeInstruction,nodofuncion5])
    }
}
;

PARAMETROS: LISTA_PARAMETROS {
    $$={
        returnInstruction:null,
        nodeInstruction: new Nodo("PARAMETROS").generateProduction([$1.nodeInstruction])
    }
}
| PARAMETROS_LLAMADA
|{
    $$={
        returnInstruction:null,
        nodeInstruction:null
    }
}
;

LISTA_PARAMETROS: LISTA_PARAMETROS 'coma' TIPO 'identificador' {
    nodolistap2 = new Nodo("coma").generateProduction([$2])
   
    nodolistap4 = new Nodo("identificador").generateProduction([$4])

    $$={
        returnInstruction:null,
        nodeInstruction: new Nodo("LISTA_PARAMETROS").generateProduction([$1.nodeInstruction,nodolistap2,$3.nodeInstruction,nodolistap4])
    }
}
| TIPO 'identificador' {
    
    nodolistap1 = new Nodo("identificador").generateProduction([$2])

    $$={
        returnInstruction: null,
        nodeInstruction: new Nodo("LISTA_PARAMETROS").generateProduction([$1.nodeInstruction,nodolistap1])
    }
}
;



METODO: 'identificador' 'parentesisAbre' PARAMETROS 'parentesisCierra' VOID 'llaveAbre' INSTRUCCIONESBLOQUE 'llaveCierra'{
    nodometodo0 = new Nodo("identificador").generateProduction([$1])
    nodometodo1 = new Nodo("parentesisAbre").generateProduction([$2])
    nodometodo2 = new Nodo("parentesisCierra").generateProduction([$4])
   
    nodometodo4 = new Nodo("llaveAbre").generateProduction([$6])
    nodometodo5 = new Nodo("llaveCierra").generateProduction([$8])

    $$={
        returnInstruction: new errorr.default("->Error Semántico<-","Instrucción no codificada", @1.first_line,@1.first_column),
        nodeInstruction: new Nodo("METODO").generateProduction([nodometodo0,nodometodo1,$3.nodeInstruction,nodometodo2,$5.nodeInstruction,nodometodo4,$7.nodeInstruction,nodometodo5])
    }
}
;

VOID: 'dosPuntos' 'void'{
    nodovoid0 = new Nodo("dosPuntos").generateProduction([$1])
    nodovoid1 = new Nodo("void").generateProduction([$2])

    $$={
        returnInstruction:null,
        nodeInstruction: new Nodo("VOID").generateProduction([nodovoid0,nodovoid1])
    }
}
| {
    $$={
        returnInstruction:null,
        nodeInstruction:null
    }
}
;

LLAMADA: 'identificador' 'parentesisAbre' PARAMETROS 'parentesisCierra' 'puntoycoma' {
    nodollamada0 = new Nodo("identificador").generateProduction([$1])
    nodollamada1 = new Nodo("parentesisAbre").generateProduction([$2])
    nodollamada2 = new Nodo("parentesisCierra").generateProduction([$4])
    nodollamada3 = new Nodo("puntoycoma").generateProduction([$5])

    $$={
        returnInstruction: new errorr.default("->Error Semántico<-","Instrucción no codificada", @1.first_line,@1.first_column),
        nodeInstruction: new Nodo("LLAMADA").generateProduction([nodollamada0,nodollamada1,$3.nodeInstruction,nodollamada2,nodollamada3])
    }

}
;



EXPRESIONES: PARAMETROS_LLAMADA{
    $$={
        returnInstruction:null,
        nodeInstruction: new Nodo("EXPRESIONES").generateProduction([$1.nodeInstruction])
    }
}
| {
    $$={returnInstruction:null,
    nodeInstruction:null
    }
}
;

PARAMETROS_LLAMADA: PARAMETROS_LLAMADA 'coma' EXPRESION {
    nodocoma = new Nodo("coma").generateProduction([$2])
    $$={
        returnInstruction:null,
        nodeInstruction: new Nodo("PARAMETROS_LLAMADA").generateProduction([$1.nodeInstruction,nodocoma,$3.nodeInstruction])
    }
}
| EXPRESION {
    $$={
        returnInstruction:null,
        nodeInstruction: new Nodo("PARAMETROS_LLAMADA").generateProduction([$1.nodeInstruction])
    }
}
;

PUSH: 'identificador' 'punto' 'push' 'parentesisAbre' EXPRESION 'parentesisCierra' 'puntoycoma'{
    nodopush0 = new Nodo("identificador").generateProduction([$1])
    nodopush1 = new Nodo("punto").generateProduction([$2])
    nodopush2 = new Nodo("push").generateProduction([$3])
    nodopush3 = new Nodo("parentesisAbre").generateProduction([$4])
    nodopush4 = new Nodo("parentesisCierra").generateProduction([$6])
    nodopush5 = new Nodo("puntoycoma").generateProduction([$7])

    $$={
         returnInstruction: new errorr.default("->Error Semántico<-","Instrucción no codificada", @1.first_line,@1.first_column),
         nodeInstruction: new Nodo("PUSH").generateProduction([nodopush0,nodopush1,nodopush2,nodopush3,$5.nodeInstruction,nodopush4,nodopush5])
    } 
}
;

POP: 'identificador' 'punto' 'pop' 'parentesisAbre' 'parentesisCierra' 'puntoycoma'{
    nodopop0 = new Nodo("identificador").generateProduction([$1])
    nodopop1 = new Nodo("punto").generateProduction([$2])
    nodopop2 = new Nodo("pop").generateProduction([$3])
    nodopop3 = new Nodo("parentesisAbre").generateProduction([$4])
    nodopop4 = new Nodo("parentesisCierra").generateProduction([$5])
    nodopop5 = new Nodo("puntoycoma").generateProduction([$6])

    $$={
         returnInstruction: new errorr.default("->Error Semántico<-","Instrucción no codificada", @1.first_line,@1.first_column),
         nodeInstruction: new Nodo("POP").generateProduction([nodopop0,nodopop1,nodopop2,nodopop3,nodopop4,nodopop5])
    } 
}
;

RUN: 'run' LLAMADA {
    nodorun = new Nodo("run").generateProduction([$1])

    $$={
        returnInstruction: new errorr.default("->Error Semántico<-","Instrucción no codificada", @1.first_line,@1.first_column),
        nodeInstruction: new Nodo("RUN").generateProduction([nodorun,$2.nodeInstruction])
    }
}
;