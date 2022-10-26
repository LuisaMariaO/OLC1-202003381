%{
    //codigo js
    const nativo = require('./Expresions/Native');
    const aritmetica = require('./Expresions/Aritmetica')
    const relacional = require('./Expresions/Relacional')
    const logica = require('./Expresions/Logica')

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
"print"                                                     { return 't_print';}

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

//Precedencias
%left 'or'
%left 'and'
%left 'not'
%left 'igualIgual' 'diferente' 'menor' 'menorIgual' 'mayor' 'mayorIgual'
%left 'mas' 'menos'
%left 'por' 'dividido'
%left 'potencia' 'modulo'
%left 'menos'


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
            | error                 {console.log("Un error sintactico"); $$=new errorr.default("->Error Sintactico<-", $1, @1.first_line, @1.first_column);} //Errores sintacticos, recuperacion con ;
;



PRINT : t_print parentesisAbre IMPRIMIBLE parentesisCierra puntoycoma { $$=new print.default($3,@1.first_line,@1.first_column);}
;

IMPRIMIBLE: EXPRESION {$$=$1}
    | TERNARIO {$$=$1}
;



EXPRESION :
        'menos' EXPRESION %prec UMENOS {$$ = new aritmetica.default(aritmetica.tipoOp.NEGACION,$2,$2,@1.first_line,@1.first_column);}
        |EXPRESION 'mas' EXPRESION {$$ = new aritmetica.default(aritmetica.tipoOp.SUMA,$1,$3,@1.first_line,@1.first_column);}
        | EXPRESION 'menos' EXPRESION {$$ = new aritmetica.default(aritmetica.tipoOp.RESTA,$1,$3,@1.first_line,@1.first_column);}
        | EXPRESION 'por' EXPRESION {$$ = new aritmetica.default(aritmetica.tipoOp.MULTIPLICACION,$1,$3,@1.first_line,@1.first_column);}
        | EXPRESION 'dividido' EXPRESION {$$ = new aritmetica.default(aritmetica.tipoOp.DIVISION,$1,$3,@1.first_line,@1.first_column);}
        | EXPRESION 'potencia' EXPRESION {$$ = new aritmetica.default(aritmetica.tipoOp.POTENCIA,$1,$3,@1.first_line,@1.first_column);}
        | EXPRESION 'modulo' EXPRESION {$$ = new aritmetica.default(aritmetica.tipoOp.MODULO,$1,$3,@1.first_line,@1.first_column);}

        | EXPRESION 'mayor' EXPRESION {$$ = new relacional.default(relacional.tipoOp.MAYOR,$1,$3,null,@1.first_line,@1.first_column)}
        | EXPRESION 'menor' EXPRESION {$$ = new relacional.default(relacional.tipoOp.MENOR,$1,$3,null,@1.first_line,@1.first_column)}
        | EXPRESION 'mayorIgual' EXPRESION {$$ = new relacional.default(relacional.tipoOp.MAYOR_IGUAL,$1,$3,null,@1.first_line,@1.first_column)}
        | EXPRESION 'menorIgual' EXPRESION {$$ = new relacional.default(relacional.tipoOp.MENOR_IGUAL,$1,$3,null,@1.first_line,@1.first_column)}
        | EXPRESION 'igualIgual' EXPRESION {$$ = new relacional.default(relacional.tipoOp.IGUAL,$1,$3,null,@1.first_line,@1.first_column)}
        | EXPRESION 'diferente' EXPRESION {$$ = new relacional.default(relacional.tipoOp.DIFERENTE,$1,$3,null,@1.first_line,@1.first_column)}

        | EXPRESION 'or' EXPRESION{$$ = new logica.default(logica.tipoOp.OR,$1,$3,@1.first_line,@1.first_column);}
        | EXPRESION 'and' EXPRESION{$$ = new logica.default(logica.tipoOp.AND,$1,$3,@1.first_line,@1.first_column);}
        | 'not' EXPRESION{$$ = new logica.default(logica.tipoOp.NOT,$2,$2,@1.first_line,@1.first_column);}

        | NATIVA{$$=$1}
;        

NATIVA :
    'entero' {$$= new nativo.default(new Tipo.default(Tipo.DataType.ENTERO),$1, @1.first_line, @1.first_column);}
    | 'decimal' {$$= new nativo.default(new Tipo.default(Tipo.DataType.DECIMAL),$1, @1.first_line, @1.first_column);}  
    | 'logico' {$$= new nativo.default(new Tipo.default(Tipo.DataType.BOOLEANO),$1, @1.first_line, @1.first_column);}
    | 'caracter' {$$= new nativo.default(new Tipo.default(Tipo.DataType.CARACTER),$1, @1.first_line, @1.first_column);}
    | 'cadena' {$$= new nativo.default(new Tipo.default(Tipo.DataType.CADENA),$1, @1.first_line, @1.first_column);}
;

TERNARIO: EXPRESION 'interrogacionCierra' EXPRESION 'dosPuntos' EXPRESION {$$ = new relacional.default(relacional.tipoOp.TERNARIO,$3,$5,$1,@1.first_line,@1.first_column)}
;

