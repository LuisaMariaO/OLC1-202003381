import React, { useRef } from "react";
import CodeMirror from '@uiw/react-codemirror';
import {darcula} from '@uiw/codemirror-theme-darcula'

function Consola(){
    
    return(
        <>
        <div class="col">
        <CodeMirror
        value=""
        height="450px"
        width="100%"
        theme={darcula}
        editable={false}
        >
        </CodeMirror>
        </div>
        </>
    );
}

export default Consola