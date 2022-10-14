import React from "react";
import Header from "../Components/Header";
import Editor from "../Components/Editor";
import Consola from "../Components/Consola";
import Botones from "../Components/Botones";
import '../App.css'

function Index(){
    return(
        <>
        <Header></Header>
        <div class="container-fluid">
            <div class="row">
        <Editor></Editor>
        <Consola></Consola>
        </div>
        </div>
        <Botones></Botones>
        </>
    );
}

export default Index