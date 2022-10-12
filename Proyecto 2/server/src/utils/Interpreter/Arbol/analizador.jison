%{
    //codigo js
    const nativo = require('./Expresions/Native');
    const Tipo = require('./Symbol/Type');
    const print = require('./Instructions/Print');
    
%}
%lex

%options case-insensitive 
//inicio analisis lexico
%%
"print"                     return 'print';
"("                         return 'parentesisAbre';
")"                         return 'parentesisCierra';
";"                         return 'puntoycoma';

[ \r\t]+ { }
\n {}
\"[^\"]*\"                  { yytext=yytext.substr(1,yyleng-2); return 'cadena'; }
[0-9]+                      return 'entero';

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
            | INVALID               {;} //Errores lexicos
            | error  puntoycoma     {;} //Errores sintacticos, recuperacion con ;
;

PRINT : print parentesisAbre EXPRESION parentesisCierra puntoycoma {$$=new print.default($3,@1.first_line,@1.first_column);}
;

EXPRESION : entero {$$= new nativo.default(new Tipo.default(Tipo.DataType.ENTERO),$1, @1.first_line, @1.first_column);}
          | cadena {$$= new nativo.default(new Tipo.default(Tipo.DataType.CADENA),$1, @1.first_line, @1.first_column);}
;