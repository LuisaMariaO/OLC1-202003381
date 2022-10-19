import React, { useState, useRef } from "react";
import Header from "../Components/Header";
import Editor from "../Components/Editor";
import Consola from "../Components/Consola";
import Botones from "../Components/Botones";
import CodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript';
import '../App.css'
import Service  from "../Services/Service";

import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-dracula"
import "ace-builds/src-noconflict/ext-language_tools";

function Index(){
    const {response, setResponse} = useState("Hola")
    const { value, setValue } = useState("")
    
    const miEditor = useRef();
    const miConsola = useRef();
   
    
    const changeEditor = (valueA) => {
        alert("hola")
    }

    const postParse = () =>{

        Service.parse(miEditor.current.editor.getValue())
        .then(({consola}) => {
            miConsola.current.editor.setValue(consola)
            miConsola.current.editor.clearSelection()
        })
        
        //alert(this.refs.ace.editor.getValue())
       // alert(editor)
    }
    
    return(
        <>
        
        <Header></Header>
        <div class="container-fluid">
        <div class="row">
        
        <div class="col" >
        <AceEditor
        value=""
        placeholder="//Ingresa tu código aquí! :D"
        ref={miEditor}
        mode="java"
        theme="github"
        name="UNIQUE_ID_OF_DIV"
        width="100%"
        height="450px"
        fontSize={17}
        editorProps={{ $blockScrolling: true}}
        
         />,
        </div>

        <div class="col" >
        <AceEditor
        value=""
        ref={miConsola}
        mode="java"
        theme="dracula"
        name="UNIQUE_ID_OF_DIV"
        width="100%"
        height="450px"
        fontSize={17}
        editorProps={{ $blockScrolling: true }}
        readOnly={true}
        showGutter={false}
         />,
        </div>
        

        
        

        </div>
        </div>
        <br></br>
            &nbsp; &nbsp;
            <button type="button" class="btn btn-success" onClick={postParse}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play" viewBox="0 0 16 16">
            <path d="M10.804 8 5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z"/>
            </svg>
                Ejecutar
            </button>
                &nbsp; &nbsp;
            <button type="button" class="btn btn-secondary">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-stars" viewBox="0 0 16 16">
                <path d="M7.657 6.247c.11-.33.576-.33.686 0l.645 1.937a2.89 2.89 0 0 0 1.829 1.828l1.936.645c.33.11.33.576 0 .686l-1.937.645a2.89 2.89 0 0 0-1.828 1.829l-.645 1.936a.361.361 0 0 1-.686 0l-.645-1.937a2.89 2.89 0 0 0-1.828-1.828l-1.937-.645a.361.361 0 0 1 0-.686l1.937-.645a2.89 2.89 0 0 0 1.828-1.828l.645-1.937zM3.794 1.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387A1.734 1.734 0 0 0 4.593 5.69l-.387 1.162a.217.217 0 0 1-.412 0L3.407 5.69A1.734 1.734 0 0 0 2.31 4.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387A1.734 1.734 0 0 0 3.407 2.31l.387-1.162zM10.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732L9.1 2.137a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L10.863.1z"/>
                </svg>
                    Limpiar
            </button>
        
        </>
    );
}

export default Index