import React from "react";
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';

function Editor(){
    
    return(
        <>
        <div class="col" id="editor">
        <CodeMirror
        value="//Inserta tu código aquí"
        height="450px"
        width="100%"
        extensions={[javascript({ jsx: true })]}
        
        >
        </CodeMirror>
        </div>
        </>
    );
}

export default Editor