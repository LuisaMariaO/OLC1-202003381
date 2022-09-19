package Analizadores;
import java_cup.runtime.*;
import Structures.Instructions.Errorr;
import java.util.LinkedList;

%%

%{
	public LinkedList<Errorr> errores = new LinkedList<Errorr>();
%}
%public
%class Lexico
%cupsym Simbolos
%cup
%char
%column
%full
%ignorecase
%line
%unicode
entero=[0-9]+
decimal=[0-9]+\.[0-9]+
cadena=\"[^\"]+\"
booleano=(verdadero|falso)
caracter=\'([ -~]|\$\{[0-9]+\})\'
comentariosimple=\/\/.+
comentariomultiple=\/\*[^\/]+\*\/
identificador=_[a-zA-Z0-9]+_
tipodedato="numero"|"cadena"|"boolean"|"caracter"
interrogacionabre=[\¿]

%%
<YYINITIAL> {comentariomultiple} {
System.out.println("Reconocio token:<comentarioMultiple> lexema:"+yytext());
return new Symbol(Simbolos.comentarioMultiple, yycolumn, yyline, yytext());
}
<YYINITIAL> {comentariosimple} {
System.out.println("Reconocio token:<comentarioSimple> lexema:"+yytext());
return new Symbol(Simbolos.comentarioSimple, yycolumn, yyline, yytext());
}


<YYINITIAL> {entero} {
System.out.println("Reconocio token:<entero> lexema:"+yytext());
return new Symbol(Simbolos.entero, yycolumn, yyline, yytext());
}
<YYINITIAL> {decimal} {
System.out.println("Reconocio token:<decimal> lexema:"+yytext());
return new Symbol(Simbolos.decimal, yycolumn, yyline, yytext());
}
<YYINITIAL> {cadena} {
System.out.println("Reconocio token:<cadena> lexema:"+yytext());
return new Symbol(Simbolos.cadena, yycolumn, yyline, yytext());
}
<YYINITIAL> {booleano} {
System.out.println("Reconocio token:<booleano> lexema:"+yytext());
return new Symbol(Simbolos.booleano, yycolumn, yyline, yytext());
}
<YYINITIAL> {caracter} {
System.out.println("Reconocio token:<caracter> lexema:"+yytext());
return new Symbol(Simbolos.caracter, yycolumn, yyline, yytext());
}
<YYINITIAL> "+" {
System.out.println("Reconocio token:<mas> lexema:"+yytext());
return new Symbol(Simbolos.mas, yycolumn, yyline, yytext());
}
<YYINITIAL> "-" {
System.out.println("Reconocio token:<menos> lexema:"+yytext());
return new Symbol(Simbolos.menos, yycolumn, yyline, yytext());
}
<YYINITIAL> "*" {
System.out.println("Reconocio token:<por> lexema:"+yytext());
return new Symbol(Simbolos.por, yycolumn, yyline, yytext());
}
<YYINITIAL> "/" {
System.out.println("Reconocio token:<dividido> lexema:"+yytext());
return new Symbol(Simbolos.dividido, yycolumn, yyline, yytext());
}
<YYINITIAL> "potencia" {
System.out.println("Reconocio token:<potencia> lexema:"+yytext());
return new Symbol(Simbolos.potencia, yycolumn, yyline, yytext());
}
<YYINITIAL> "modulo" {
System.out.println("Reconocio token:<modulo> lexema:"+yytext());
return new Symbol(Simbolos.modulo, yycolumn, yyline, yytext());
}
<YYINITIAL> "inicio" {
System.out.println("Reconocio token:<inicio> lexema:"+yytext());
return new Symbol(Simbolos.t_inicio, yycolumn, yyline, yytext());
}
<YYINITIAL> "fin" {
System.out.println("Reconocio token:<fin> lexema:"+yytext());
return new Symbol(Simbolos.t_fin, yycolumn, yyline, yytext());
}
<YYINITIAL> "(" {
System.out.println("Reconocio token:<parentesisAbre> lexema:"+yytext());
return new Symbol(Simbolos.parentesisAbre, yycolumn, yyline, yytext());
}
<YYINITIAL> ")" {
System.out.println("Reconocio token:<parentesisCierra> lexema:"+yytext());
return new Symbol(Simbolos.parentesisCierra, yycolumn, yyline, yytext());
}
<YYINITIAL> "[" {
System.out.println("Reconocio token:<corcheteAbre> lexema:"+yytext());
return new Symbol(Simbolos.corcheteAbre, yycolumn, yyline, yytext());
}
<YYINITIAL> "]" {
System.out.println("Reconocio token:<corcheteCierra> lexema:"+yytext());
return new Symbol(Simbolos.corcheteCierra, yycolumn, yyline, yytext());
}

<YYINITIAL> "mayor" {
System.out.println("Reconocio token:<mayor> lexema:"+yytext());
return new Symbol(Simbolos.mayor, yycolumn, yyline, yytext());
}
<YYINITIAL> "menor" {
System.out.println("Reconocio token:<menor> lexema:"+yytext());
return new Symbol(Simbolos.menor, yycolumn, yyline, yytext());
}
<YYINITIAL> "mayor_o_igual" {
System.out.println("Reconocio token:<mayorIgual> lexema:"+yytext());
return new Symbol(Simbolos.mayorIgual, yycolumn, yyline, yytext());
}
<YYINITIAL> "menor_o_igual" {
System.out.println("Reconocio token:<menorIgual> lexema:"+yytext());
return new Symbol(Simbolos.menorIgual, yycolumn, yyline, yytext());
}
<YYINITIAL> "es_igual" {
System.out.println("Reconocio token:<esIgual> lexema:"+yytext());
return new Symbol(Simbolos.esIgual, yycolumn, yyline, yytext());
}
<YYINITIAL> "es_diferente" {
System.out.println("Reconocio token:<esDiferente> lexema:"+yytext());
return new Symbol(Simbolos.esDiferente, yycolumn, yyline, yytext());
}

<YYINITIAL> "or" {
System.out.println("Reconocio token:<or> lexema:"+yytext());
return new Symbol(Simbolos.or, yycolumn, yyline, yytext());
}
<YYINITIAL> "and" {
System.out.println("Reconocio token:<and> lexema:"+yytext());
return new Symbol(Simbolos.and, yycolumn, yyline, yytext());
}
<YYINITIAL> "not" {
System.out.println("Reconocio token:<not> lexema:"+yytext());
return new Symbol(Simbolos.not, yycolumn, yyline, yytext());
}



<YYINITIAL> "ingresar" {
System.out.println("Reconocio token:<ingresar> lexema:"+yytext());
return new Symbol(Simbolos.ingresar, yycolumn, yyline, yytext());
}
<YYINITIAL> {identificador} {
System.out.println("Reconocio token:<identificador> lexema:"+yytext());
return new Symbol(Simbolos.identificador, yycolumn, yyline, yytext());
}
<YYINITIAL> "como" {
System.out.println("Reconocio token:<como> lexema:"+yytext());
return new Symbol(Simbolos.como, yycolumn, yyline, yytext());
}
<YYINITIAL> {tipodedato} {
System.out.println("Reconocio token:<tipoDato> lexema:"+yytext());
return new Symbol(Simbolos.tipoDato, yycolumn, yyline, yytext());
}
<YYINITIAL> "con_valor" {
System.out.println("Reconocio token:<conValor> lexema:"+yytext());
return new Symbol(Simbolos.conValor, yycolumn, yyline, yytext());
}
<YYINITIAL> ";" {
System.out.println("Reconocio token:<puntoycoma> lexema:"+yytext());
return new Symbol(Simbolos.puntoycoma, yycolumn, yyline, yytext());
}
<YYINITIAL> "," {
System.out.println("Reconocio token:<coma> lexema:"+yytext());
return new Symbol(Simbolos.coma, yycolumn, yyline, yytext());
}

<YYINITIAL> "->" {
System.out.println("Reconocio token:<flecha> lexema:"+yytext());
return new Symbol(Simbolos.flecha, yycolumn, yyline, yytext());
}

<YYINITIAL> "si" {
System.out.println("Reconocio token:<si> lexema:"+yytext());
return new Symbol(Simbolos.si, yycolumn, yyline, yytext());
}
<YYINITIAL> "entonces" {
System.out.println("Reconocio token:<entonces> lexema:"+yytext());
return new Symbol(Simbolos.entonces, yycolumn, yyline, yytext());
}
<YYINITIAL> "fin_si" {
System.out.println("Reconocio token:<finSi> lexema:"+yytext());
return new Symbol(Simbolos.finSi, yycolumn, yyline, yytext());
}
<YYINITIAL> "de_lo_contrario" {
System.out.println("Reconocio token:<deLoContrario> lexema:"+yytext());
return new Symbol(Simbolos.deLoContrario, yycolumn, yyline, yytext());
}
<YYINITIAL> "o_si" {
System.out.println("Reconocio token:<oSi> lexema:"+yytext());
return new Symbol(Simbolos.oSi, yycolumn, yyline, yytext());
}

<YYINITIAL> "segun" {
System.out.println("Reconocio token:<segun> lexema:"+yytext());
return new Symbol(Simbolos.segun, yycolumn, yyline, yytext());
}
<YYINITIAL> "hacer" {
System.out.println("Reconocio token:<hacer> lexema:"+yytext());
return new Symbol(Simbolos.hacer, yycolumn, yyline, yytext());
}

<YYINITIAL> "?" {
System.out.println("Reconocio token:<interrogacionCierra> lexema:"+yytext());
return new Symbol(Simbolos.interrogacionCierra, yycolumn, yyline, yytext());
}
<YYINITIAL> {interrogacionabre} {
System.out.println("Reconocio token:<interrogacionAbre> lexema:"+yytext());
return new Symbol(Simbolos.interrogacionAbre, yycolumn, yyline, yytext());
}
<YYINITIAL> "fin_segun" {
System.out.println("Reconocio token:<finSegun> lexema:"+yytext());
return new Symbol(Simbolos.finSegun, yycolumn, yyline, yytext());
}

<YYINITIAL> "para" {
System.out.println("Reconocio token:<para> lexema:"+yytext());
return new Symbol(Simbolos.para, yycolumn, yyline, yytext());
}
<YYINITIAL> "hasta" {
System.out.println("Reconocio token:<hasta> lexema:"+yytext());
return new Symbol(Simbolos.hasta, yycolumn, yyline, yytext());
}
<YYINITIAL> "fin_para" {
System.out.println("Reconocio token:<finPara> lexema:"+yytext());
return new Symbol(Simbolos.finPara, yycolumn, yyline, yytext());
}
<YYINITIAL> "con" {
System.out.println("Reconocio token:<con> lexema:"+yytext());
return new Symbol(Simbolos.con, yycolumn, yyline, yytext());
}
<YYINITIAL> "incremental" {
System.out.println("Reconocio token:<incremental> lexema:"+yytext());
return new Symbol(Simbolos.incremental, yycolumn, yyline, yytext());
}

<YYINITIAL> "mientras" {
System.out.println("Reconocio token:<mientras> lexema:"+yytext());
return new Symbol(Simbolos.mientras, yycolumn, yyline, yytext());
}
<YYINITIAL> "fin_mientras" {
System.out.println("Reconocio token:<finMientras> lexema:"+yytext());
return new Symbol(Simbolos.finMientras, yycolumn, yyline, yytext());
}

<YYINITIAL> "repetir" {
System.out.println("Reconocio token:<repetir> lexema:"+yytext());
return new Symbol(Simbolos.repetir, yycolumn, yyline, yytext());
}
<YYINITIAL> "hasta_que" {
System.out.println("Reconocio token:<hastaQue> lexema:"+yytext());
return new Symbol(Simbolos.hastaQue, yycolumn, yyline, yytext());
}

<YYINITIAL> "retornar" {
System.out.println("Reconocio token:<retornar> lexema:"+yytext());
return new Symbol(Simbolos.retornar, yycolumn, yyline, yytext());
}

<YYINITIAL> "metodo" {
System.out.println("Reconocio token:<metodo> lexema:"+yytext());
return new Symbol(Simbolos.metodo, yycolumn, yyline, yytext());
}
<YYINITIAL> "fin_metodo" {
System.out.println("Reconocio token:<finMetodo> lexema:"+yytext());
return new Symbol(Simbolos.finMetodo, yycolumn, yyline, yytext());
}
<YYINITIAL> "con_parametros" {
System.out.println("Reconocio token:<conParametros> lexema:"+yytext());
return new Symbol(Simbolos.conParametros, yycolumn, yyline, yytext());
}

<YYINITIAL> "funcion" {
System.out.println("Reconocio token:<funcion> lexema:"+yytext());
return new Symbol(Simbolos.funcion, yycolumn, yyline, yytext());
}
<YYINITIAL> "fin_funcion" {
System.out.println("Reconocio token:<finFuncion> lexema:"+yytext());
return new Symbol(Simbolos.finFuncion, yycolumn, yyline, yytext());
}
<YYINITIAL> "ejecutar" {
System.out.println("Reconocio token:<ejecutar> lexema:"+yytext());
return new Symbol(Simbolos.ejecutar, yycolumn, yyline, yytext());
}

<YYINITIAL> "imprimir_nl" {
System.out.println("Reconocio token:<imprimirNl> lexema:"+yytext());
return new Symbol(Simbolos.imprimirNl, yycolumn, yyline, yytext());
}
<YYINITIAL> "imprimir" {
System.out.println("Reconocio token:<imprimir> lexema:"+yytext());
return new Symbol(Simbolos.imprimir, yycolumn, yyline, yytext());
}

[ \t\r\n\f] { /* Espacios en blanco, se ignoran */ }
.
{
System.out.println("Error Lexico : "+yytext()+
"Linea "+yyline+" Columna "+yycolumn);
errores.add(new Errorr("Lexico",yytext(),yyline,yycolumn));
}

