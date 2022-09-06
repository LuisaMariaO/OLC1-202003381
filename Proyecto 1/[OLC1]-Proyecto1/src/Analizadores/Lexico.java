package analizadores;
import java_cup.runtime.Symbol; 


public class Lexico implements java_cup.runtime.Scanner {
	private final int YY_BUFFER_SIZE = 512;
	private final int YY_F = -1;
	private final int YY_NO_STATE = -1;
	private final int YY_NOT_ACCEPT = 0;
	private final int YY_START = 1;
	private final int YY_END = 2;
	private final int YY_NO_ANCHOR = 4;
	private final int YY_BOL = 65536;
	private final int YY_EOF = 65537;
	private java.io.BufferedReader yy_reader;
	private int yy_buffer_index;
	private int yy_buffer_read;
	private int yy_buffer_start;
	private int yy_buffer_end;
	private char yy_buffer[];
	private int yychar;
	private int yyline;
	private boolean yy_at_bol;
	private int yy_lexical_state;

	public Lexico (java.io.Reader reader) {
		this ();
		if (null == reader) {
			throw (new Error("Error: Bad input stream initializer."));
		}
		yy_reader = new java.io.BufferedReader(reader);
	}

	public Lexico (java.io.InputStream instream) {
		this ();
		if (null == instream) {
			throw (new Error("Error: Bad input stream initializer."));
		}
		yy_reader = new java.io.BufferedReader(new java.io.InputStreamReader(instream));
	}

	private Lexico () {
		yy_buffer = new char[YY_BUFFER_SIZE];
		yy_buffer_read = 0;
		yy_buffer_index = 0;
		yy_buffer_start = 0;
		yy_buffer_end = 0;
		yychar = 0;
		yyline = 0;
		yy_at_bol = true;
		yy_lexical_state = YYINITIAL;
 
    yyline = 1; 
    yychar = 1; 
	}

	private boolean yy_eof_done = false;
	private final int YYINITIAL = 0;
	private final int yy_state_dtrans[] = {
		0
	};
	private void yybegin (int state) {
		yy_lexical_state = state;
	}
	private int yy_advance ()
		throws java.io.IOException {
		int next_read;
		int i;
		int j;

		if (yy_buffer_index < yy_buffer_read) {
			return yy_buffer[yy_buffer_index++];
		}

		if (0 != yy_buffer_start) {
			i = yy_buffer_start;
			j = 0;
			while (i < yy_buffer_read) {
				yy_buffer[j] = yy_buffer[i];
				++i;
				++j;
			}
			yy_buffer_end = yy_buffer_end - yy_buffer_start;
			yy_buffer_start = 0;
			yy_buffer_read = j;
			yy_buffer_index = j;
			next_read = yy_reader.read(yy_buffer,
					yy_buffer_read,
					yy_buffer.length - yy_buffer_read);
			if (-1 == next_read) {
				return YY_EOF;
			}
			yy_buffer_read = yy_buffer_read + next_read;
		}

		while (yy_buffer_index >= yy_buffer_read) {
			if (yy_buffer_index >= yy_buffer.length) {
				yy_buffer = yy_double(yy_buffer);
			}
			next_read = yy_reader.read(yy_buffer,
					yy_buffer_read,
					yy_buffer.length - yy_buffer_read);
			if (-1 == next_read) {
				return YY_EOF;
			}
			yy_buffer_read = yy_buffer_read + next_read;
		}
		return yy_buffer[yy_buffer_index++];
	}
	private void yy_move_end () {
		if (yy_buffer_end > yy_buffer_start &&
		    '\n' == yy_buffer[yy_buffer_end-1])
			yy_buffer_end--;
		if (yy_buffer_end > yy_buffer_start &&
		    '\r' == yy_buffer[yy_buffer_end-1])
			yy_buffer_end--;
	}
	private boolean yy_last_was_cr=false;
	private void yy_mark_start () {
		int i;
		for (i = yy_buffer_start; i < yy_buffer_index; ++i) {
			if ('\n' == yy_buffer[i] && !yy_last_was_cr) {
				++yyline;
			}
			if ('\r' == yy_buffer[i]) {
				++yyline;
				yy_last_was_cr=true;
			} else yy_last_was_cr=false;
		}
		yychar = yychar
			+ yy_buffer_index - yy_buffer_start;
		yy_buffer_start = yy_buffer_index;
	}
	private void yy_mark_end () {
		yy_buffer_end = yy_buffer_index;
	}
	private void yy_to_mark () {
		yy_buffer_index = yy_buffer_end;
		yy_at_bol = (yy_buffer_end > yy_buffer_start) &&
		            ('\r' == yy_buffer[yy_buffer_end-1] ||
		             '\n' == yy_buffer[yy_buffer_end-1] ||
		             2028/*LS*/ == yy_buffer[yy_buffer_end-1] ||
		             2029/*PS*/ == yy_buffer[yy_buffer_end-1]);
	}
	private java.lang.String yytext () {
		return (new java.lang.String(yy_buffer,
			yy_buffer_start,
			yy_buffer_end - yy_buffer_start));
	}
	private int yylength () {
		return yy_buffer_end - yy_buffer_start;
	}
	private char[] yy_double (char buf[]) {
		int i;
		char newbuf[];
		newbuf = new char[2*buf.length];
		for (i = 0; i < buf.length; ++i) {
			newbuf[i] = buf[i];
		}
		return newbuf;
	}
	private final int YY_E_INTERNAL = 0;
	private final int YY_E_MATCH = 1;
	private java.lang.String yy_error_string[] = {
		"Error: Internal error.\n",
		"Error: Unmatched input.\n"
	};
	private void yy_error (int code,boolean fatal) {
		java.lang.System.out.print(yy_error_string[code]);
		java.lang.System.out.flush();
		if (fatal) {
			throw new Error("Fatal Error.\n");
		}
	}
	private int[][] unpackFromString(int size1, int size2, String st) {
		int colonIndex = -1;
		String lengthString;
		int sequenceLength = 0;
		int sequenceInteger = 0;

		int commaIndex;
		String workString;

		int res[][] = new int[size1][size2];
		for (int i= 0; i < size1; i++) {
			for (int j= 0; j < size2; j++) {
				if (sequenceLength != 0) {
					res[i][j] = sequenceInteger;
					sequenceLength--;
					continue;
				}
				commaIndex = st.indexOf(',');
				workString = (commaIndex==-1) ? st :
					st.substring(0, commaIndex);
				st = st.substring(commaIndex+1);
				colonIndex = workString.indexOf(':');
				if (colonIndex == -1) {
					res[i][j]=Integer.parseInt(workString);
					continue;
				}
				lengthString =
					workString.substring(colonIndex+1);
				sequenceLength=Integer.parseInt(lengthString);
				workString=workString.substring(0,colonIndex);
				sequenceInteger=Integer.parseInt(workString);
				res[i][j] = sequenceInteger;
				sequenceLength--;
			}
		}
		return res;
	}
	private int yy_acpt[] = {
		/* 0 */ YY_NOT_ACCEPT,
		/* 1 */ YY_NO_ANCHOR,
		/* 2 */ YY_NO_ANCHOR,
		/* 3 */ YY_NO_ANCHOR,
		/* 4 */ YY_NO_ANCHOR,
		/* 5 */ YY_NO_ANCHOR,
		/* 6 */ YY_NO_ANCHOR,
		/* 7 */ YY_NO_ANCHOR,
		/* 8 */ YY_NO_ANCHOR,
		/* 9 */ YY_NO_ANCHOR,
		/* 10 */ YY_NO_ANCHOR,
		/* 11 */ YY_NO_ANCHOR,
		/* 12 */ YY_NO_ANCHOR,
		/* 13 */ YY_NO_ANCHOR,
		/* 14 */ YY_NO_ANCHOR,
		/* 15 */ YY_NO_ANCHOR,
		/* 16 */ YY_NO_ANCHOR,
		/* 17 */ YY_NO_ANCHOR,
		/* 18 */ YY_NO_ANCHOR,
		/* 19 */ YY_NO_ANCHOR,
		/* 20 */ YY_NO_ANCHOR,
		/* 21 */ YY_NO_ANCHOR,
		/* 22 */ YY_NO_ANCHOR,
		/* 23 */ YY_NO_ANCHOR,
		/* 24 */ YY_NO_ANCHOR,
		/* 25 */ YY_NO_ANCHOR,
		/* 26 */ YY_NO_ANCHOR,
		/* 27 */ YY_NO_ANCHOR,
		/* 28 */ YY_NO_ANCHOR,
		/* 29 */ YY_NO_ANCHOR,
		/* 30 */ YY_NO_ANCHOR,
		/* 31 */ YY_NO_ANCHOR,
		/* 32 */ YY_NO_ANCHOR,
		/* 33 */ YY_NO_ANCHOR,
		/* 34 */ YY_NO_ANCHOR,
		/* 35 */ YY_NO_ANCHOR,
		/* 36 */ YY_NO_ANCHOR,
		/* 37 */ YY_NO_ANCHOR,
		/* 38 */ YY_NO_ANCHOR,
		/* 39 */ YY_NO_ANCHOR,
		/* 40 */ YY_NO_ANCHOR,
		/* 41 */ YY_NO_ANCHOR,
		/* 42 */ YY_NO_ANCHOR,
		/* 43 */ YY_NO_ANCHOR,
		/* 44 */ YY_NO_ANCHOR,
		/* 45 */ YY_NO_ANCHOR,
		/* 46 */ YY_NO_ANCHOR,
		/* 47 */ YY_NO_ANCHOR,
		/* 48 */ YY_NO_ANCHOR,
		/* 49 */ YY_NO_ANCHOR,
		/* 50 */ YY_NO_ANCHOR,
		/* 51 */ YY_NO_ANCHOR,
		/* 52 */ YY_NO_ANCHOR,
		/* 53 */ YY_NO_ANCHOR,
		/* 54 */ YY_NO_ANCHOR,
		/* 55 */ YY_NO_ANCHOR,
		/* 56 */ YY_NO_ANCHOR,
		/* 57 */ YY_NO_ANCHOR,
		/* 58 */ YY_NO_ANCHOR,
		/* 59 */ YY_NO_ANCHOR,
		/* 60 */ YY_NO_ANCHOR,
		/* 61 */ YY_NO_ANCHOR,
		/* 62 */ YY_NO_ANCHOR,
		/* 63 */ YY_NO_ANCHOR,
		/* 64 */ YY_NO_ANCHOR,
		/* 65 */ YY_NO_ANCHOR,
		/* 66 */ YY_NO_ANCHOR,
		/* 67 */ YY_NO_ANCHOR,
		/* 68 */ YY_NO_ANCHOR,
		/* 69 */ YY_NO_ANCHOR,
		/* 70 */ YY_NO_ANCHOR,
		/* 71 */ YY_NOT_ACCEPT,
		/* 72 */ YY_NO_ANCHOR,
		/* 73 */ YY_NOT_ACCEPT,
		/* 74 */ YY_NO_ANCHOR,
		/* 75 */ YY_NOT_ACCEPT,
		/* 76 */ YY_NO_ANCHOR,
		/* 77 */ YY_NOT_ACCEPT,
		/* 78 */ YY_NO_ANCHOR,
		/* 79 */ YY_NOT_ACCEPT,
		/* 80 */ YY_NO_ANCHOR,
		/* 81 */ YY_NOT_ACCEPT,
		/* 82 */ YY_NO_ANCHOR,
		/* 83 */ YY_NOT_ACCEPT,
		/* 84 */ YY_NO_ANCHOR,
		/* 85 */ YY_NOT_ACCEPT,
		/* 86 */ YY_NO_ANCHOR,
		/* 87 */ YY_NOT_ACCEPT,
		/* 88 */ YY_NO_ANCHOR,
		/* 89 */ YY_NOT_ACCEPT,
		/* 90 */ YY_NO_ANCHOR,
		/* 91 */ YY_NOT_ACCEPT,
		/* 92 */ YY_NO_ANCHOR,
		/* 93 */ YY_NOT_ACCEPT,
		/* 94 */ YY_NO_ANCHOR,
		/* 95 */ YY_NOT_ACCEPT,
		/* 96 */ YY_NO_ANCHOR,
		/* 97 */ YY_NOT_ACCEPT,
		/* 98 */ YY_NO_ANCHOR,
		/* 99 */ YY_NOT_ACCEPT,
		/* 100 */ YY_NO_ANCHOR,
		/* 101 */ YY_NOT_ACCEPT,
		/* 102 */ YY_NO_ANCHOR,
		/* 103 */ YY_NOT_ACCEPT,
		/* 104 */ YY_NO_ANCHOR,
		/* 105 */ YY_NOT_ACCEPT,
		/* 106 */ YY_NOT_ACCEPT,
		/* 107 */ YY_NOT_ACCEPT,
		/* 108 */ YY_NOT_ACCEPT,
		/* 109 */ YY_NOT_ACCEPT,
		/* 110 */ YY_NOT_ACCEPT,
		/* 111 */ YY_NOT_ACCEPT,
		/* 112 */ YY_NOT_ACCEPT,
		/* 113 */ YY_NOT_ACCEPT,
		/* 114 */ YY_NOT_ACCEPT,
		/* 115 */ YY_NOT_ACCEPT,
		/* 116 */ YY_NOT_ACCEPT,
		/* 117 */ YY_NOT_ACCEPT,
		/* 118 */ YY_NOT_ACCEPT,
		/* 119 */ YY_NOT_ACCEPT,
		/* 120 */ YY_NOT_ACCEPT,
		/* 121 */ YY_NOT_ACCEPT,
		/* 122 */ YY_NOT_ACCEPT,
		/* 123 */ YY_NOT_ACCEPT,
		/* 124 */ YY_NOT_ACCEPT,
		/* 125 */ YY_NOT_ACCEPT,
		/* 126 */ YY_NOT_ACCEPT,
		/* 127 */ YY_NOT_ACCEPT,
		/* 128 */ YY_NOT_ACCEPT,
		/* 129 */ YY_NOT_ACCEPT,
		/* 130 */ YY_NOT_ACCEPT,
		/* 131 */ YY_NOT_ACCEPT,
		/* 132 */ YY_NOT_ACCEPT,
		/* 133 */ YY_NOT_ACCEPT,
		/* 134 */ YY_NOT_ACCEPT,
		/* 135 */ YY_NOT_ACCEPT,
		/* 136 */ YY_NOT_ACCEPT,
		/* 137 */ YY_NOT_ACCEPT,
		/* 138 */ YY_NOT_ACCEPT,
		/* 139 */ YY_NOT_ACCEPT,
		/* 140 */ YY_NOT_ACCEPT,
		/* 141 */ YY_NOT_ACCEPT,
		/* 142 */ YY_NOT_ACCEPT,
		/* 143 */ YY_NOT_ACCEPT,
		/* 144 */ YY_NOT_ACCEPT,
		/* 145 */ YY_NOT_ACCEPT,
		/* 146 */ YY_NOT_ACCEPT,
		/* 147 */ YY_NOT_ACCEPT,
		/* 148 */ YY_NOT_ACCEPT,
		/* 149 */ YY_NOT_ACCEPT,
		/* 150 */ YY_NOT_ACCEPT,
		/* 151 */ YY_NOT_ACCEPT,
		/* 152 */ YY_NOT_ACCEPT,
		/* 153 */ YY_NOT_ACCEPT,
		/* 154 */ YY_NOT_ACCEPT,
		/* 155 */ YY_NOT_ACCEPT,
		/* 156 */ YY_NOT_ACCEPT,
		/* 157 */ YY_NOT_ACCEPT,
		/* 158 */ YY_NOT_ACCEPT,
		/* 159 */ YY_NOT_ACCEPT,
		/* 160 */ YY_NOT_ACCEPT,
		/* 161 */ YY_NOT_ACCEPT,
		/* 162 */ YY_NOT_ACCEPT,
		/* 163 */ YY_NOT_ACCEPT,
		/* 164 */ YY_NOT_ACCEPT,
		/* 165 */ YY_NOT_ACCEPT,
		/* 166 */ YY_NOT_ACCEPT,
		/* 167 */ YY_NOT_ACCEPT,
		/* 168 */ YY_NOT_ACCEPT,
		/* 169 */ YY_NOT_ACCEPT,
		/* 170 */ YY_NOT_ACCEPT,
		/* 171 */ YY_NOT_ACCEPT,
		/* 172 */ YY_NOT_ACCEPT,
		/* 173 */ YY_NOT_ACCEPT,
		/* 174 */ YY_NOT_ACCEPT,
		/* 175 */ YY_NOT_ACCEPT,
		/* 176 */ YY_NOT_ACCEPT,
		/* 177 */ YY_NOT_ACCEPT,
		/* 178 */ YY_NOT_ACCEPT,
		/* 179 */ YY_NOT_ACCEPT,
		/* 180 */ YY_NOT_ACCEPT,
		/* 181 */ YY_NOT_ACCEPT,
		/* 182 */ YY_NOT_ACCEPT,
		/* 183 */ YY_NOT_ACCEPT,
		/* 184 */ YY_NOT_ACCEPT,
		/* 185 */ YY_NOT_ACCEPT,
		/* 186 */ YY_NOT_ACCEPT,
		/* 187 */ YY_NOT_ACCEPT,
		/* 188 */ YY_NOT_ACCEPT,
		/* 189 */ YY_NOT_ACCEPT,
		/* 190 */ YY_NOT_ACCEPT,
		/* 191 */ YY_NOT_ACCEPT,
		/* 192 */ YY_NOT_ACCEPT,
		/* 193 */ YY_NOT_ACCEPT,
		/* 194 */ YY_NOT_ACCEPT,
		/* 195 */ YY_NOT_ACCEPT,
		/* 196 */ YY_NOT_ACCEPT,
		/* 197 */ YY_NOT_ACCEPT,
		/* 198 */ YY_NOT_ACCEPT,
		/* 199 */ YY_NOT_ACCEPT,
		/* 200 */ YY_NOT_ACCEPT,
		/* 201 */ YY_NOT_ACCEPT,
		/* 202 */ YY_NOT_ACCEPT,
		/* 203 */ YY_NOT_ACCEPT,
		/* 204 */ YY_NOT_ACCEPT,
		/* 205 */ YY_NOT_ACCEPT,
		/* 206 */ YY_NOT_ACCEPT,
		/* 207 */ YY_NOT_ACCEPT,
		/* 208 */ YY_NOT_ACCEPT,
		/* 209 */ YY_NOT_ACCEPT,
		/* 210 */ YY_NOT_ACCEPT,
		/* 211 */ YY_NOT_ACCEPT,
		/* 212 */ YY_NOT_ACCEPT,
		/* 213 */ YY_NOT_ACCEPT,
		/* 214 */ YY_NOT_ACCEPT,
		/* 215 */ YY_NOT_ACCEPT,
		/* 216 */ YY_NOT_ACCEPT,
		/* 217 */ YY_NOT_ACCEPT,
		/* 218 */ YY_NOT_ACCEPT,
		/* 219 */ YY_NOT_ACCEPT,
		/* 220 */ YY_NOT_ACCEPT,
		/* 221 */ YY_NOT_ACCEPT,
		/* 222 */ YY_NOT_ACCEPT,
		/* 223 */ YY_NOT_ACCEPT,
		/* 224 */ YY_NOT_ACCEPT,
		/* 225 */ YY_NOT_ACCEPT,
		/* 226 */ YY_NOT_ACCEPT,
		/* 227 */ YY_NOT_ACCEPT,
		/* 228 */ YY_NOT_ACCEPT,
		/* 229 */ YY_NOT_ACCEPT,
		/* 230 */ YY_NOT_ACCEPT,
		/* 231 */ YY_NOT_ACCEPT,
		/* 232 */ YY_NOT_ACCEPT,
		/* 233 */ YY_NOT_ACCEPT,
		/* 234 */ YY_NOT_ACCEPT,
		/* 235 */ YY_NOT_ACCEPT,
		/* 236 */ YY_NOT_ACCEPT,
		/* 237 */ YY_NO_ANCHOR,
		/* 238 */ YY_NOT_ACCEPT,
		/* 239 */ YY_NOT_ACCEPT,
		/* 240 */ YY_NOT_ACCEPT,
		/* 241 */ YY_NOT_ACCEPT,
		/* 242 */ YY_NOT_ACCEPT,
		/* 243 */ YY_NOT_ACCEPT,
		/* 244 */ YY_NOT_ACCEPT,
		/* 245 */ YY_NOT_ACCEPT,
		/* 246 */ YY_NOT_ACCEPT,
		/* 247 */ YY_NOT_ACCEPT,
		/* 248 */ YY_NOT_ACCEPT,
		/* 249 */ YY_NOT_ACCEPT,
		/* 250 */ YY_NOT_ACCEPT,
		/* 251 */ YY_NOT_ACCEPT,
		/* 252 */ YY_NOT_ACCEPT,
		/* 253 */ YY_NOT_ACCEPT,
		/* 254 */ YY_NOT_ACCEPT,
		/* 255 */ YY_NOT_ACCEPT,
		/* 256 */ YY_NOT_ACCEPT,
		/* 257 */ YY_NOT_ACCEPT,
		/* 258 */ YY_NOT_ACCEPT,
		/* 259 */ YY_NOT_ACCEPT,
		/* 260 */ YY_NOT_ACCEPT,
		/* 261 */ YY_NOT_ACCEPT,
		/* 262 */ YY_NOT_ACCEPT,
		/* 263 */ YY_NOT_ACCEPT,
		/* 264 */ YY_NOT_ACCEPT,
		/* 265 */ YY_NOT_ACCEPT,
		/* 266 */ YY_NOT_ACCEPT,
		/* 267 */ YY_NOT_ACCEPT,
		/* 268 */ YY_NOT_ACCEPT,
		/* 269 */ YY_NOT_ACCEPT,
		/* 270 */ YY_NOT_ACCEPT,
		/* 271 */ YY_NOT_ACCEPT,
		/* 272 */ YY_NOT_ACCEPT,
		/* 273 */ YY_NO_ANCHOR,
		/* 274 */ YY_NOT_ACCEPT,
		/* 275 */ YY_NOT_ACCEPT,
		/* 276 */ YY_NOT_ACCEPT,
		/* 277 */ YY_NOT_ACCEPT,
		/* 278 */ YY_NOT_ACCEPT,
		/* 279 */ YY_NOT_ACCEPT,
		/* 280 */ YY_NOT_ACCEPT,
		/* 281 */ YY_NOT_ACCEPT,
		/* 282 */ YY_NOT_ACCEPT,
		/* 283 */ YY_NOT_ACCEPT,
		/* 284 */ YY_NOT_ACCEPT,
		/* 285 */ YY_NOT_ACCEPT,
		/* 286 */ YY_NOT_ACCEPT,
		/* 287 */ YY_NOT_ACCEPT,
		/* 288 */ YY_NOT_ACCEPT,
		/* 289 */ YY_NOT_ACCEPT,
		/* 290 */ YY_NOT_ACCEPT,
		/* 291 */ YY_NOT_ACCEPT,
		/* 292 */ YY_NOT_ACCEPT,
		/* 293 */ YY_NOT_ACCEPT,
		/* 294 */ YY_NOT_ACCEPT,
		/* 295 */ YY_NOT_ACCEPT,
		/* 296 */ YY_NOT_ACCEPT,
		/* 297 */ YY_NOT_ACCEPT,
		/* 298 */ YY_NOT_ACCEPT,
		/* 299 */ YY_NOT_ACCEPT,
		/* 300 */ YY_NOT_ACCEPT,
		/* 301 */ YY_NOT_ACCEPT,
		/* 302 */ YY_NOT_ACCEPT,
		/* 303 */ YY_NOT_ACCEPT,
		/* 304 */ YY_NOT_ACCEPT,
		/* 305 */ YY_NOT_ACCEPT,
		/* 306 */ YY_NOT_ACCEPT,
		/* 307 */ YY_NOT_ACCEPT,
		/* 308 */ YY_NOT_ACCEPT,
		/* 309 */ YY_NOT_ACCEPT,
		/* 310 */ YY_NOT_ACCEPT,
		/* 311 */ YY_NOT_ACCEPT
	};
	private int yy_cmap[] = unpackFromString(1,65538,
"32:9,47,46,32:2,33,32:18,43,52,50,52,53,52:2,51,24,25,18,16,36,17,49,19,48:" +
"10,52,35,52:2,38,41,52,10,12,9,11,6,30,28,42,21,45,37,13,5,1,8,20,44,7,29,1" +
"5,2,34,37:2,26,37,22,31,23,52,27,52,10,12,9,11,6,30,28,42,21,45,37,13,5,1,8" +
",20,44,7,29,15,2,34,37:2,26,37,54,52,55,52,32:34,14,32:24,4,32:4,40,32:2,39" +
",3,32:30,39,3,32:65308,0:2")[0];

	private int yy_rmap[] = unpackFromString(1,312,
"0,1,2,1,3,1,4,1:4,5,1:4,6,1:6,7,1,8,9,1:5,10,11,1:4,12,1:17,13,1:14,14,1,15" +
",16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40" +
",41,42,43,44,45,46,7,47,48,49,50,51,52,53,54,55,9,56,57,58,59,60,61,62,63,6" +
"4,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,8" +
"9,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110" +
",111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,12" +
"9,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,1" +
"48,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166," +
"167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,185" +
",186,187,188,189,190,191,192,193,194,195,196,197,198,199,200,201,202,203,20" +
"4,205,206,207,208,209,210,211,212,213,214,215,216,217,218,219,220,221,222,2" +
"23,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240,241," +
"242,243,244,245,246,247,248,249,250,251")[0];

	private int yy_nxt[][] = unpackFromString(252,56,
"1,2,72:3,74,76,78,80,82,84,237,86,72:3,3,4,5,6,88,90,7,8,9,10,72,92,72,94,9" +
"6,72:2,11,273,12,13,72:2,98,72,14,100,11,72:2,15,11,16,72,102,104,72:4,-1:5" +
"8,71,73,-1:4,75,-1:85,18,-1:35,103,105,-1:69,11,-1:9,11,-1:3,11,-1:56,16,11" +
"5,-1:7,23:32,-1,23:12,-1,23:9,-1:27,148,-1:76,26,-1:34,260,-1:55,311,-1:55," +
"183,-1:55,213,-1:33,274,-1:54,71,-1:57,77,-1,79,-1,81,-1:10,83,-1:49,21,-1:" +
"41,85,-1:27,87,-1:15,238,-1:11,241,-1:13,275,-1:46,89,-1:60,119,-1:51,17,-1" +
":19,91,-1:54,290,-1:32,93,-1:4,95,-1,97,-1:51,243,-1:50,99,-1:69,297,-1:48," +
"101,-1:74,120,-1:36,239,-1,106,-1:60,302,-1:4,122,-1:36,107,-1:3,108,-1:79," +
"123,-1:27,109:2,-1:2,109:9,-1,109,-1:4,109:2,-1:4,109,-1,109:3,-1:3,109,-1:" +
"2,109,-1:4,109,-1,109:2,-1:2,109,-1:21,276,-1:47,110,-1:14,19,-1:35,124,-1:" +
"3,125,-1:52,111,-1:7,112,-1:10,113,-1:41,126,-1:3,247,-1:84,20,-1:26,22,-1:" +
"54,114,-1:53,277,-1:48,116:49,-1,116:5,-1,127:17,-1:2,127:11,-1,127:24,-1,1" +
"17:2,-1:2,117:9,-1,117:17,-1:2,117:5,-1:2,117:5,-1:2,117:5,118,117:2,-1:7,1" +
"28,-1:69,246,-1:6,129,-1:47,248,-1:36,109:2,-1:2,109:9,-1,109,-1:4,109:2,-1" +
":4,109,24,109:3,-1:3,109,-1:2,109,-1:4,109,-1,109:2,-1:2,109,-1:35,245,-1:2" +
"8,305,-1:67,130,-1:43,25,-1:63,278,-1:19,132,-1:27,116:49,27,116:5,-1:51,28" +
",-1:55,28,-1:2,133,-1:3,135,-1:64,138,-1:9,139,-1:43,140,-1:52,280,-1:70,29" +
",-1:61,141,-1:15,252,-1:20,30,-1:57,142,-1:46,127:17,145,-1,127:11,-1,127:2" +
"4,-1:10,31,-1:52,255,-1:77,147,-1:37,149,-1:59,151,-1:88,152,-1:14,32,-1:61" +
",155,-1:49,33,-1:49,254,-1:75,157,-1:62,253,-1:29,158,-1:73,256,-1:13,283,-" +
"1:30,257,-1:54,162,-1:53,293,-1:68,34,-1:37,35,-1:62,36,-1:52,168,-1:14,299" +
",-1:8,169,170,-1:35,171,-1:52,37,-1:58,38,-1:93,152,-1:6,117,-1:8,39,-1:55," +
"40,-1:55,41,-1:54,172,-1:78,262,-1:40,285,-1:41,294,-1:75,174,-1:44,42,-1:7" +
"2,284,-1:37,178,-1:54,43,-1:76,300,-1:31,264,-1:58,179,-1:53,180,-1:14,295," +
"-1:40,181,-1:14,44,-1:36,182,-1:64,301,-1:54,185,-1:51,186,-1:56,45,-1:55,1" +
"90,-1:61,191,-1:43,46,-1:75,194,-1:35,47,-1:69,288,-1:68,198,-1:28,199,-1:9" +
"8,267,-1:38,201,-1:57,48,-1:55,49,-1:39,50,-1:49,51,-1:55,52,-1:58,203,-1:5" +
"3,204,-1:54,269,-1:55,53,-1:58,54,-1:52,55,-1:55,56,-1:58,57,-1:47,208,-1:6" +
"2,268,-1:53,147,-1:69,210,-1:40,270,-1:54,211,-1:57,58,-1:49,307,-1:65,214," +
"-1:59,215,-1:41,59,-1:60,60,-1:77,217,-1:33,271,-1:54,219,-1:51,220,-1:62,6" +
"1,-1:54,221,-1:56,222,-1:49,272,-1:68,223,-1:46,225,-1:62,62,-1:52,226,-1:4" +
"6,63,-1:60,64,-1:56,229,-1:49,230,-1:83,65,-1:39,66,-1:55,67,-1:50,232,-1:6" +
"2,233,-1:47,234,-1:77,68,-1:36,235,-1:66,236,-1:47,69,-1:50,70,-1:53,240,-1" +
":55,121,-1:64,306,-1:67,244,-1:36,134,-1:54,131,-1:49,250,-1:67,143,-1:44,1" +
"46,-1:62,282,-1:52,251,-1:56,292,-1:59,154,-1:59,156,-1:41,161,-1:75,258,-1" +
":36,261,-1:62,173,-1:52,165,-1:59,175,-1:60,286,-1:41,259,-1:63,192,-1:54,1" +
"84,-1:57,187,-1:51,287,-1:56,197,-1:69,196,-1:35,207,-1:62,205,-1:49,209,-1" +
":74,216,-1:40,212,-1:50,218,-1:69,224,-1:50,227,-1:51,242,-1:55,279,-1:57,2" +
"49,-1:54,126,-1:61,144,-1:48,150,-1:56,153,-1:63,160,-1:41,163,-1:75,164,-1" +
":44,176,-1:54,266,-1:56,188,-1:51,193,-1:56,202,-1:56,206,-1:57,228,-1:53,1" +
"36,-1:54,159,-1:69,166,-1:44,177,-1:55,189,-1:51,265,-1:59,231,-1:53,137,-1" +
":68,167,-1:44,263,-1:55,195,-1:51,200,-1:57,291,-1:54,296,-1:50,289,-1:62,2" +
"98,-1:52,281,-1:64,303,-1:68,304,-1:48,308,-1:61,309,-1:36,310,-1:47");

	public java_cup.runtime.Symbol next_token ()
		throws java.io.IOException {
		int yy_lookahead;
		int yy_anchor = YY_NO_ANCHOR;
		int yy_state = yy_state_dtrans[yy_lexical_state];
		int yy_next_state = YY_NO_STATE;
		int yy_last_accept_state = YY_NO_STATE;
		boolean yy_initial = true;
		int yy_this_accept;

		yy_mark_start();
		yy_this_accept = yy_acpt[yy_state];
		if (YY_NOT_ACCEPT != yy_this_accept) {
			yy_last_accept_state = yy_state;
			yy_mark_end();
		}
		while (true) {
			if (yy_initial && yy_at_bol) yy_lookahead = YY_BOL;
			else yy_lookahead = yy_advance();
			yy_next_state = YY_F;
			yy_next_state = yy_nxt[yy_rmap[yy_state]][yy_cmap[yy_lookahead]];
			if (YY_EOF == yy_lookahead && true == yy_initial) {
				return null;
			}
			if (YY_F != yy_next_state) {
				yy_state = yy_next_state;
				yy_initial = false;
				yy_this_accept = yy_acpt[yy_state];
				if (YY_NOT_ACCEPT != yy_this_accept) {
					yy_last_accept_state = yy_state;
					yy_mark_end();
				}
			}
			else {
				if (YY_NO_STATE == yy_last_accept_state) {
					throw (new Error("Lexical Error: Unmatched Input."));
				}
				else {
					yy_anchor = yy_acpt[yy_last_accept_state];
					if (0 != (YY_END & yy_anchor)) {
						yy_move_end();
					}
					yy_to_mark();
					switch (yy_last_accept_state) {
					case 1:
						
					case -2:
						break;
					case 2:
						{
    System.out.println("Este es un error lexico: "+yytext()+
    ", en la linea: "+yyline+", en la columna: "+yychar);
}
					case -3:
						break;
					case 3:
						{return new Symbol(sym.mas,yyline,yychar, yytext());}
					case -4:
						break;
					case 4:
						{return new Symbol(sym.menos,yyline,yychar, yytext());}
					case -5:
						break;
					case 5:
						{return new Symbol(sym.por,yyline,yychar, yytext());}
					case -6:
						break;
					case 6:
						{return new Symbol(sym.dividido,yyline,yychar, yytext());}
					case -7:
						break;
					case 7:
						{return new Symbol(sym.corcheteAbre,yyline,yychar,yytext());}
					case -8:
						break;
					case 8:
						{return new Symbol(sym.corcheteCierra,yyline,yychar,yytext());}
					case -9:
						break;
					case 9:
						{return new Symbol(sym.parentesisAbre,yyline,yychar,yytext());}
					case -10:
						break;
					case 10:
						{return new Symbol(sym.parentesisCierra,yyline,yychar,yytext());}
					case -11:
						break;
					case 11:
						{}
					case -12:
						break;
					case 12:
						{return new Symbol(sym.puntoycoma,yyline,yychar, yytext());}
					case -13:
						break;
					case 13:
						{return new Symbol(sym.coma,yyline,yychar, yytext());}
					case -14:
						break;
					case 14:
						{return new Symbol(sym.interrogacionCierra,yyline,yychar, yytext());}
					case -15:
						break;
					case 15:
						{yychar=1;}
					case -16:
						break;
					case 16:
						{return new Symbol(sym.entero,yyline,yychar, yytext());}
					case -17:
						break;
					case 17:
						{return new Symbol(sym.or,yyline,yychar,yytext());}
					case -18:
						break;
					case 18:
						{return new Symbol(sym.flecha,yyline,yychar, yytext());}
					case -19:
						break;
					case 19:
						{return new Symbol(sym.si,yyline,yychar, yytext());}
					case -20:
						break;
					case 20:
						{return new Symbol(sym.interrogacionAbre,yyline,yychar, yytext());}
					case -21:
						break;
					case 21:
						{return new Symbol(sym.not,yyline,yychar,yytext());}
					case -22:
						break;
					case 22:
						{return new Symbol(sym.and,yyline,yychar,yytext());}
					case -23:
						break;
					case 23:
						{return new Symbol(sym.comentarioSimple,yyline,yychar, yytext());}
					case -24:
						break;
					case 24:
						{return new Symbol(sym.variable,yyline,yychar, yytext());}
					case -25:
						break;
					case 25:
						{return new Symbol(sym.fin,yyline,yychar,yytext());}
					case -26:
						break;
					case 26:
						{return new Symbol(sym.decimal,yyline,yychar, yytext());}
					case -27:
						break;
					case 27:
						{return new Symbol(sym.cadena,yyline,yychar,yytext());}
					case -28:
						break;
					case 28:
						{return new Symbol(sym.caracter,yyline,yychar,yytext());}
					case -29:
						break;
					case 29:
						{return new Symbol(sym.oSi,yyline,yychar, yytext());}
					case -30:
						break;
					case 30:
						{return new Symbol(sym.como,yyline,yychar, yytext());}
					case -31:
						break;
					case 31:
						{return new Symbol(sym.para,yyline,yychar, yytext());}
					case -32:
						break;
					case 32:
						{return new Symbol(sym.menor,yyline,yychar,yytext());}
					case -33:
						break;
					case 33:
						{return new Symbol(sym.mayor,yyline,yychar,yytext());}
					case -34:
						break;
					case 34:
						{return new Symbol(sym.comentarioMultiple,yyline,yychar, yytext());}
					case -35:
						break;
					case 35:
						{return new Symbol(sym.segun,yyline,yychar, yytext());}
					case -36:
						break;
					case 36:
						{return new Symbol(sym.booleano,yyline,yychar,yytext());}
					case -37:
						break;
					case 37:
						{return new Symbol(sym.hacer,yyline,yychar, yytext());}
					case -38:
						break;
					case 38:
						{return new Symbol(sym.hasta,yyline,yychar, yytext());}
					case -39:
						break;
					case 39:
						{return new Symbol(sym.t_numero,yyline,yychar,yytext());}
					case -40:
						break;
					case 40:
						{return new Symbol(sym.metodo,yyline,yychar, yytext());}
					case -41:
						break;
					case 41:
						{return new Symbol(sym.mod,yyline,yychar,yytext());}
					case -42:
						break;
					case 42:
						{return new Symbol(sym.t_cadena,yyline,yychar,yytext());}
					case -43:
						break;
					case 43:
						{return new Symbol(sym.inicio,yyline,yychar,yytext());}
					case -44:
						break;
					case 44:
						{return new Symbol(sym.finSi,yyline,yychar, yytext());}
					case -45:
						break;
					case 45:
						{return new Symbol(sym.repetir,yyline,yychar, yytext());}
					case -46:
						break;
					case 46:
						{return new Symbol(sym.t_boolean,yyline,yychar,yytext());}
					case -47:
						break;
					case 47:
						{return new Symbol(sym.funcion,yyline,yychar, yytext());}
					case -48:
						break;
					case 48:
						{return new Symbol(sym.mientras,yyline,yychar, yytext());}
					case -49:
						break;
					case 49:
						{return new Symbol(sym.entonces,yyline,yychar, yytext());}
					case -50:
						break;
					case 50:
						{return new Symbol(sym.esIgual,yyline,yychar,yytext());}
					case -51:
						break;
					case 51:
						{return new Symbol(sym.ejecutar,yyline,yychar, yytext());}
					case -52:
						break;
					case 52:
						{return new Symbol(sym.retornar,yyline,yychar, yytext());}
					case -53:
						break;
					case 53:
						{return new Symbol(sym.t_caracter,yyline,yychar,yytext());}
					case -54:
						break;
					case 54:
						{return new Symbol(sym.potencia,yyline,yychar,yytext());}
					case -55:
						break;
					case 55:
						{return new Symbol(sym.ingresar,yyline,yychar, yytext());}
					case -56:
						break;
					case 56:
						{return new Symbol(sym.imprimir,yyline,yychar, yytext());}
					case -57:
						break;
					case 57:
						{return new Symbol(sym.finPara,yyline,yychar, yytext());}
					case -58:
						break;
					case 58:
						{return new Symbol(sym.conValor,yyline,yychar, yytext());}
					case -59:
						break;
					case 59:
						{return new Symbol(sym.finSegun,yyline,yychar, yytext());}
					case -60:
						break;
					case 60:
						{return new Symbol(sym.hastaQue,yyline,yychar, yytext());}
					case -61:
						break;
					case 61:
						{return new Symbol(sym.finMetodo,yyline,yychar, yytext());}
					case -62:
						break;
					case 62:
						{return new Symbol(sym.imprimirNl,yyline,yychar, yytext());}
					case -63:
						break;
					case 63:
						{return new Symbol(sym.finFuncion,yyline,yychar, yytext());}
					case -64:
						break;
					case 64:
						{return new Symbol(sym.esDiferente,yyline,yychar,yytext());}
					case -65:
						break;
					case 65:
						{return new Symbol(sym.finMientras,yyline,yychar, yytext());}
					case -66:
						break;
					case 66:
						{return new Symbol(sym.menorIgual,yyline,yychar,yytext());}
					case -67:
						break;
					case 67:
						{return new Symbol(sym.mayorIgual,yyline,yychar,yytext());}
					case -68:
						break;
					case 68:
						{return new Symbol(sym.conParametros,yyline,yychar, yytext());}
					case -69:
						break;
					case 69:
						{return new Symbol(sym.incremental,yyline,yychar, yytext());}
					case -70:
						break;
					case 70:
						{return new Symbol(sym.deLoContrario,yyline,yychar, yytext());}
					case -71:
						break;
					case 72:
						{
    System.out.println("Este es un error lexico: "+yytext()+
    ", en la linea: "+yyline+", en la columna: "+yychar);
}
					case -72:
						break;
					case 74:
						{
    System.out.println("Este es un error lexico: "+yytext()+
    ", en la linea: "+yyline+", en la columna: "+yychar);
}
					case -73:
						break;
					case 76:
						{
    System.out.println("Este es un error lexico: "+yytext()+
    ", en la linea: "+yyline+", en la columna: "+yychar);
}
					case -74:
						break;
					case 78:
						{
    System.out.println("Este es un error lexico: "+yytext()+
    ", en la linea: "+yyline+", en la columna: "+yychar);
}
					case -75:
						break;
					case 80:
						{
    System.out.println("Este es un error lexico: "+yytext()+
    ", en la linea: "+yyline+", en la columna: "+yychar);
}
					case -76:
						break;
					case 82:
						{
    System.out.println("Este es un error lexico: "+yytext()+
    ", en la linea: "+yyline+", en la columna: "+yychar);
}
					case -77:
						break;
					case 84:
						{
    System.out.println("Este es un error lexico: "+yytext()+
    ", en la linea: "+yyline+", en la columna: "+yychar);
}
					case -78:
						break;
					case 86:
						{
    System.out.println("Este es un error lexico: "+yytext()+
    ", en la linea: "+yyline+", en la columna: "+yychar);
}
					case -79:
						break;
					case 88:
						{
    System.out.println("Este es un error lexico: "+yytext()+
    ", en la linea: "+yyline+", en la columna: "+yychar);
}
					case -80:
						break;
					case 90:
						{
    System.out.println("Este es un error lexico: "+yytext()+
    ", en la linea: "+yyline+", en la columna: "+yychar);
}
					case -81:
						break;
					case 92:
						{
    System.out.println("Este es un error lexico: "+yytext()+
    ", en la linea: "+yyline+", en la columna: "+yychar);
}
					case -82:
						break;
					case 94:
						{
    System.out.println("Este es un error lexico: "+yytext()+
    ", en la linea: "+yyline+", en la columna: "+yychar);
}
					case -83:
						break;
					case 96:
						{
    System.out.println("Este es un error lexico: "+yytext()+
    ", en la linea: "+yyline+", en la columna: "+yychar);
}
					case -84:
						break;
					case 98:
						{
    System.out.println("Este es un error lexico: "+yytext()+
    ", en la linea: "+yyline+", en la columna: "+yychar);
}
					case -85:
						break;
					case 100:
						{
    System.out.println("Este es un error lexico: "+yytext()+
    ", en la linea: "+yyline+", en la columna: "+yychar);
}
					case -86:
						break;
					case 102:
						{
    System.out.println("Este es un error lexico: "+yytext()+
    ", en la linea: "+yyline+", en la columna: "+yychar);
}
					case -87:
						break;
					case 104:
						{
    System.out.println("Este es un error lexico: "+yytext()+
    ", en la linea: "+yyline+", en la columna: "+yychar);
}
					case -88:
						break;
					case 237:
						{
    System.out.println("Este es un error lexico: "+yytext()+
    ", en la linea: "+yyline+", en la columna: "+yychar);
}
					case -89:
						break;
					case 273:
						{
    System.out.println("Este es un error lexico: "+yytext()+
    ", en la linea: "+yyline+", en la columna: "+yychar);
}
					case -90:
						break;
					default:
						yy_error(YY_E_INTERNAL,false);
					case -1:
					}
					yy_initial = true;
					yy_state = yy_state_dtrans[yy_lexical_state];
					yy_next_state = YY_NO_STATE;
					yy_last_accept_state = YY_NO_STATE;
					yy_mark_start();
					yy_this_accept = yy_acpt[yy_state];
					if (YY_NOT_ACCEPT != yy_this_accept) {
						yy_last_accept_state = yy_state;
						yy_mark_end();
					}
				}
			}
		}
	}
}
