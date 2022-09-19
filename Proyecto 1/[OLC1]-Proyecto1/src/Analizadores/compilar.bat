java -jar jflex-full-1.7.0.jar Lexico.jflex
java -jar java-cup-11b.jar -parser Sintactico -symbols Simbolos Sintactico.cup
java -jar java-cup-11b.jar -parser ArbolSintactico -symbols Simbolos ArbolSintactico.cup
PAUSE