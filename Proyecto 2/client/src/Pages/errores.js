import React from 'react';


class Errores extends React.Component {
   render(){
      return (
        <>
        <div className='dramediv'>
         <iframe src={"../errores.html"} style={"../style.css"} frameBorder="0" className='frame' width="150%" height="150%"></iframe> 
         </div> 
         </>
      );
   }
}
export default Errores;