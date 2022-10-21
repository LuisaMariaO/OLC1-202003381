%{
    //codigo js
    const nativo = require('./Expresions/Native');
    const Tipo = require('./Symbol/Type');
    const print = require('./Instructions/Print');

    const errorr = require('./Exceptions/Error')
    
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
"print"                                                     { return 'print';}

/*OPERADORES ARITMETICOS*/
"+"                                                         return 'mas';
"-"                                                         return 'menos';
"*"                                                         return 'por';
"/"                                                         return 'dividido';
"^"                                                         return 'potencia';
"%"                                                         return 'modulo';
"="                                                         return 'igual'

/*OPERADOR LOGICO UNARIO*/
"!"                                                         return 'not';

/*OPERADORES RELACIONALES*/
">"                                                         return 'mayor';
"<"                                                         return 'menor';
">="                                                        return 'mayorIgual';
"<="                                                        return 'menorIgual';
"=="                                                        return 'igualIgual';
"!="                                                        return 'diferente';

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

/*IDENTIFICADORES*/
([A-Z0-9_])+                                                return 'identificador';
","                                                         return 'coma'

/*INCREMENTOS Y DECREMENTOS*/
"++"                                                        return 'incremento'
"--"                                                        return 'decremento'

/*ESTRUCTURAS DE DATOS*/
//Vector
"["                                                         return 'corcheteAbre'
"]"                                                         return 'corcheteCierra'
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

%start INIT
//Inicio
//Definicion de gramatica
%%

INIT: INSTRUCCIONES EOF {return $1;}
;

INSTRUCCIONES: INSTRUCCIONES INSTRUCCION {$1.push($2); $$=$1;}
             | INSTRUCCION               {$$=[$1];}
;

INSTRUCCION : PRINT                 {$$=$1;}
            | INVALID               {console.log("Un error lexico");$$=new errorr.default("->Error Lexico<-", $1, @1.first_line, @1.first_column); } //Errores lexicos
            | SUMA                  {}
            | error                 {console.log("Un error sintactico"); $$=new errorr.default("->Error Sintactico<-", $1, @1.first_line, @1.first_column);} //Errores sintacticos, recuperacion con ;
;



PRINT : print parentesisAbre EXPRESION parentesisCierra puntoycoma { $$=new print.default($3,@1.first_line,@1.first_column);}
;

EXPRESION : entero {$$= new nativo.default(new Tipo.default(Tipo.DataType.ENTERO),$1, @1.first_line, @1.first_column);}
        | decimal {$$= new nativo.default(new Tipo.default(Tipo.DataType.DECIMAL),$1, @1.first_line, @1.first_column);}  
        | logico {$$= new nativo.default(new Tipo.default(Tipo.DataType.LOGICO),$1, @1.first_line, @1.first_column);}
        | caracter {$$= new nativo.default(new Tipo.default(Tipo.DataType.CARACTER),$1, @1.first_line, @1.first_column);}
        | cadena {$$= new nativo.default(new Tipo.default(Tipo.DataType.CADENA),$1, @1.first_line, @1.first_column);}
;

EXPREIONARITMETICA: EXPRESION mas EXPRESION
;